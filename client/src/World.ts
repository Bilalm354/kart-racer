import {
  Scene, Light, Camera, Color, WebGLRenderer, PerspectiveCamera, Box3, OrthographicCamera,
  GridHelper, Material, Vector2, Raycaster, Clock, Intersection, Vector3,
} from 'three';
import * as dat from 'dat.gui';
import { Car } from '~/bodies/Car';
import { ambientLight, directionalLight } from '~/misc/lights';
import { Track, TrackCreator } from '~/tracks/TrackCreator';
import { keyboard } from '~/misc/Keyboard';
import { addTouchEventListenerPreventDefaults } from '~/helpers/canvasHelper';

const gui = new dat.GUI();

type CameraView = 'top' | 'behindCar' | 'firstPerson' | '2d';
type Mode = 'play' | 'create';

const raycaster = new Raycaster();
const mouse = new Vector2();
const MINIMUM_TIME_BETWEEN_CUBE_SPAWNS = 0.01;

function onMouseMove(event: MouseEvent) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

// TODO: save tracks and load tracks
// TODO: create keyboard shortcut for switching to create mode
// TODO: shoot projectiles from car on mouse click
// TODO: add edges or wireframes so boxes look nicer
// TODO: remove the idea of walls from Tracks and replace with cubes

export class World {
  public car: Car;
  public scene: Scene;

  private track: Track;
  private ambientLight: Light;
  private directionalLight: Light;
  private camera: Camera;
  private cameraView: CameraView;
  private renderer: WebGLRenderer
  private collidableBoundingBoxes: Box3[];
  private trackCreator: TrackCreator;
  private mode: Mode;
  private isGridVisible: boolean;
  private isCollisionActive: boolean;
  private grid: GridHelper;
  public clock: Clock;
  public timeSinceLastNewCube: Clock;
  public isMouseDown: boolean;
  public positionForNewCube?: Vector3;

  constructor() {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 2000,
    );
    this.trackCreator = new TrackCreator();
    this.renderer = new WebGLRenderer();
    this.clock = new Clock();
    this.track = this.trackCreator.smallTrack();
    this.ambientLight = ambientLight;
    this.directionalLight = directionalLight;
    this.car = new Car();
    this.cameraView = 'behindCar';
    this.collidableBoundingBoxes = [];
    this.mode = 'play';
    this.isGridVisible = false;
    this.isCollisionActive = true;
    this.grid = new GridHelper(400, 40, 0x000000, 0x000000);
    this.timeSinceLastNewCube = new Clock();
    this.isMouseDown = false;
  }

  public init(): void {
    this.initRenderer();
    directionalLight.position.set(1, 1, 0.5).normalize();
    this.camera.up.set(0, 0, 1);
    this.scene.background = new Color(0xfad6a5);
    this.scene.add(this.ambientLight, this.directionalLight, this.car.object3d);
    this.buildTrack();
    this.addToGui();
    this.grid.rotateX(-Math.PI / 2);
    this.grid.material = this.grid.material as Material;
    this.grid.material.opacity = 0.5;
    this.grid.material.depthWrite = false;
    this.grid.material.transparent = true;
    this.grid.name = 'grid';
    this.scene.add(this.grid);
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('mousedown', () => this.onMouseDown(), false);
    document.addEventListener('mouseup', () => { this.isMouseDown = false; }, false);
  }

  public initRenderer(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.domElement.tabIndex = 1;
    this.addKeyboardEventListeners();
    addTouchEventListenerPreventDefaults(this.renderer.domElement);
    this.renderer.shadowMap.enabled = true;
    document.body.appendChild(this.renderer.domElement);
  }

  public addKeyboardEventListeners(): void {
    this.renderer.domElement.addEventListener('keydown', (event) => keyboard.keyDownHandler(event));
    this.renderer.domElement.addEventListener('keyup', (event) => keyboard.keyUpHandler(event));
  }

  public onWindowResize(): void {
    this.camera = new PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 2000,
    );
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  public addToGui(): void {
    gui.add(this, 'cameraView', ['top', 'behindCar', 'firstPerson', '2d']).listen();
    gui.add(this, 'isGridVisible').listen();
    gui.add(this, 'isCollisionActive').listen();
    gui.add(this, 'mode', ['play', 'create']).listen();
  }

  private buildTrack(): void {
    this.track.walls.forEach((wall) => {
      this.collidableBoundingBoxes.push(new Box3().setFromObject(wall));
      this.scene.add(wall);
    });
    if (this.track.ground) {
      this.scene.add(this.track.ground);
    }
  }

  private removeTrack(): void {
    this.track.walls.forEach((wall) => {
      this.scene.remove(this.scene.getObjectById(wall.id)!);
    });
    this.collidableBoundingBoxes = [];
    if (this.track.ground) {
      this.scene.remove(this.track.ground);
    }
  }

  private resolveCollisionsBetweenCarsAndTrackWalls(): void {
    this.collidableBoundingBoxes.forEach((collidableBox) => {
      if ((this.car.boundingBox.intersectsBox(collidableBox))) {
        this.car.handleCollision();
      }
    });
  }

  public addCar(): void {
    this.scene.add(this.car.object3d);
  }

  public removeCar(): void {
    this.scene.remove(this.car.object3d);
  }

  public updateSceneAndCamera(): void {
    if (this.mode === 'create') {
      this.isCollisionActive = false;
    }

    this.car.updateFromKeyboard(keyboard);
    this.car.update();

    if (this.isCollisionActive) {
      this.resolveCollisionsBetweenCarsAndTrackWalls();
    }

    this.setCameraPosition(this.cameraView);
    this.grid.visible = this.isGridVisible;
    const intersect = this.findIntersect();

    // TODO: save the current loaction of the potential box and check if you're in the same box on the next one and if you aren't
    // then delete it and add it to the new spot

    // BUG: I am stopping it from drawing a placeholder ontop of a place holder but that gets werid when you try to move forward one block
    // since the current placcehodler is in the way of the next available spot. so need the placeholders to not be detected by the raycast

    if (intersect
      && intersect.face
      && this.mode === 'create'
      && intersect.object.name !== 'placeHolder') {
      const newCube = this.trackCreator.newCube();
      newCube.position.copy(intersect.point).add(intersect.face.normal);
      newCube.position.divideScalar(this.trackCreator.cubeLength).floor()
        .multiplyScalar(this.trackCreator.cubeLength).addScalar(this.trackCreator.cubeLength / 2);
      this.positionForNewCube = new Vector3().copy(newCube.position);

      newCube.name = 'placeHolder';

      const oldPlaceHolder = this.scene.getObjectByName('placeHolder');

      if (oldPlaceHolder) {
        this.scene.remove(oldPlaceHolder);
      }

      this.scene.add(newCube);
      newCube.material = newCube.material as Material;
      newCube.material.opacity = 0.5;
      newCube.material.transparent = true;
      // TODO: add delete cube in creator mode
    }

    this.renderer.render(this.scene, this.camera);
  }

  public onMouseDown(): void {
    // TODO: add this same functionality for touchscreens somehow
    if (!this.positionForNewCube) {
      return;
    }

    this.isMouseDown = true;
    const newCube = this.trackCreator.newCube();
    newCube.position.copy(this.positionForNewCube);

    // add cube
    if (this.timeSinceLastNewCube.getElapsedTime() > MINIMUM_TIME_BETWEEN_CUBE_SPAWNS) {
      this.scene.add(newCube);
      this.timeSinceLastNewCube.start();
    }
  }

  public findIntersect(): Intersection {
    raycaster.setFromCamera(mouse, this.camera);

    // TODO: add option to create cubes a fixed distance infront of car instead of using the mouse.
    // TODO: add a crosshair and a translucent box where it would go
    // BUG: can't build ontop of the already existing walls in my track
    // TODO: add newCube to collision boxes
    // * to do this might have to save them somewhere.
    // * instead of spawning new cubes just add them to an array and add everything from that array to collision boxes and also spawn them

    return raycaster.intersectObjects(this.scene.children)[0];
  }

  public updateCameraIfViewChanged(): void {
    if (this.cameraView === '2d') {
      const groundGeometry = this.track.ground.geometry as any;
      const { width, height } = groundGeometry.parameters;
      const orthographicCamera = new OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000);
      this.camera = orthographicCamera;
    }
  }

  private setCameraPosition(view: CameraView): void {
    const groundGeometry = this.track.ground.geometry as any;
    const { width } = groundGeometry.parameters;

    if (view === 'top') {
      this.camera.position.set(0, 0, width);
      this.camera.lookAt(0, 0, 0);
      this.camera.up.set(0, 1, 0);
    } else if (view === 'behindCar') {
      this.car.updateCamera(this.camera);
    } else if (view === 'firstPerson') {
      this.camera.position.set(0, 0, 30);
      this.camera.lookAt(300, 0, 1);
    } else if (view === '2d') {
      this.camera.position.set(0, 0, 300);
      this.camera.lookAt(0, 0, 0);
      this.camera.up.set(0, 1, 0);
    }
  }

  public setCameraView(view: CameraView): void {
    this.cameraView = view;
    this.updateCameraIfViewChanged();
  }

  public setSmallTrack(): void {
    this.removeTrack();
    this.track = this.trackCreator.smallTrack();
    this.buildTrack();
  }

  public setBigTrack(): void {
    this.removeTrack();
    this.track = this.trackCreator.bigTrack();
    this.buildTrack();
  }

  public setMode(mode: Mode): void {
    this.isCollisionActive = mode === 'play';
    this.mode = mode;
  }
}

export const world = new World();
