import {
  Scene, Light, Camera, Color, WebGLRenderer, PerspectiveCamera, Box3, OrthographicCamera,
  GridHelper, Material, Raycaster, Clock, Intersection, Vector3,
} from 'three';
import * as dat from 'dat.gui';
import Stats from 'stats.js';
import { Car } from '~/bodies/Car';
import { ambientLight, directionalLight } from '~/misc/lights';
import { Track, TrackCreator } from '~/tracks/TrackCreator';
import { keyboard } from '~/misc/Keyboard';
import { addTouchEventListenerPreventDefaults } from '~/helpers/touchHelper';
import { mouse } from '~/misc/Mouse';

type CameraView = 'top' | 'behindCar' | 'firstPerson' | '2d';
type Mode = 'play' | 'create';

function preventRightClickAndLongPress(): void {
  window.oncontextmenu = (event: { preventDefault: () => void; stopPropagation: () => void; }) => {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };
}
// TODO: spawn turbos and/ or items around the map like in snake/ mariokart
// TODO: save tracks and load tracks
// TODO: create keyboard shortcut for switching to create mode
// TODO: shoot projectiles from car on mouse click
// TODO: remove the idea of walls from Tracks and replace with cubes
// BUG: when you first load the page and go to create mode the first click doesn't add a block
// TODO: add the ability to add multiple cubes while holding down mouse
// TODO: add socket.io for multiplayer
// TODO: add a 3d triangle that can be used to go up inclines.
// TODO: 3d collision
// TODO: SAT collision detection and resolution

export class World {
  public car: Car;
  public scene: Scene;
  public clock: Clock;
  public positionForNewCube?: Vector3;
  public isStatsVisible: boolean;
  public stats: Stats;
  public isMobile: boolean;

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
  private raycaster: Raycaster;
  private gui: dat.GUI;

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
    this.isStatsVisible = false;
    this.stats = new Stats();
    this.isMobile = false;
    this.raycaster = new Raycaster();
    this.gui = new dat.GUI();
  }

  public init(): void {
    this.initRenderer();
    preventRightClickAndLongPress();
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
    this.stats.showPanel(0);
    document.body.appendChild(this.stats.dom);
    window.addEventListener('resize', () => this.onWindowResize());
    this.updateIsMobile();
  }

  public updateIsMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.isMobile = true;
    }
  }

  public initRenderer(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.domElement.tabIndex = 1;
    this.addKeyboardEventListeners();
    addTouchEventListenerPreventDefaults(this.renderer.domElement);
    mouse.addMouseEventListeners(this.renderer.domElement);
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
    this.gui.add(this, 'cameraView', ['top', 'behindCar', 'firstPerson', '2d']).listen();
    this.gui.add(this, 'isGridVisible').listen();
    this.gui.add(this, 'isCollisionActive').listen();
    this.gui.add(this, 'isStatsVisible').listen();
    this.gui.add(this, 'mode', ['play', 'create']).listen();
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
    if (!this.isCollisionActive) {
      return;
    }
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

  public update(): void {
    this.stats.begin();
    this.car.updateFromKeyboard(keyboard);
    this.car.update();
    this.resolveCollisionsBetweenCarsAndTrackWalls();
    this.setCameraPosition(this.cameraView);
    this.grid.visible = this.isGridVisible;
    this.stats.dom.hidden = !this.isStatsVisible;
    this.handleCreateMode();
    this.renderer.render(this.scene, this.camera);
    this.stats.end();
  }

  public handleCreateMode() {
    const intersect = this.findIntersect();
    this.addNewCubePlaceHolderToScene(intersect);
  }

  public addNewCubePlaceHolderToScene(intersect: Intersection) {
    if (this.mode === 'create' && intersect && intersect.face) {
      const oldPlaceHolder = this.scene.getObjectByName('placeHolder');

      if (oldPlaceHolder) {
        this.scene.remove(oldPlaceHolder);
      }

      const newCube = this.trackCreator.newCube();
      newCube.position.copy(intersect.point)
        .add(intersect.face.normal)
        .divideScalar(this.trackCreator.cubeLength).floor()
        .multiplyScalar(this.trackCreator.cubeLength)
        .addScalar(this.trackCreator.cubeLength / 2);
      this.positionForNewCube = new Vector3().copy(newCube.position); // FIXME: these last 5 lines can probably be better

      newCube.name = 'placeHolder';

      this.scene.add(newCube);
      newCube.material = newCube.material as Material;
      newCube.material.opacity = 0.5;
      newCube.material.transparent = true;
    }
  }

  public createOrDeleteOnMouseDown(): void { // TODO: add this same functionality optimised for touchscreens
    if (!this.positionForNewCube) {
      return;
    }

    if (keyboard.shift) {
      this.deleteHoveredCube();
    } else {
      this.createNewCube();
    }
  }

  public deleteHoveredCube(): void { // BUG: works weird now.
    const intersect = this.findIntersect();
    if (intersect.object !== this.track.ground) {
      console.log(intersect.object.position);
      this.scene.remove(intersect.object);

      this.track.boxPositions.forEach((position, index) => {
        if (position.equals(intersect.object.position)) {
          this.track.boxPositions.splice(index);
        }
      });

      // TODO: crumble things above deleted boxes that are not deeply tagged to ground
    }
  }

  public createNewCube() : void {
    this.track.boxPositions.push(this.positionForNewCube!);
    this.trackCreator.addBoxesToScene(this.scene);
    // TODO: add collision boxes to it too
  }

  public findIntersect(): Intersection {
    this.raycaster.setFromCamera(mouse.position, this.camera);
    // TODO: add option to create cubes a fixed distance infront of car instead of using the mouse.
    // TODO: add a crosshair and a translucent box where it would go
    // BUG: can't build ontop of the already existing walls in my track
    // TODO: add newCube to collision boxes
    // * to do this might have to save them somewhere.
    // * instead of spawning new cubes just add them to an array and add everything from that array to collision boxes and also spawn them
    const intersectedObjects = this.raycaster.intersectObjects(this.scene.children);

    while (intersectedObjects[0]?.object.name === 'placeHolder') {
      intersectedObjects.shift();
    }

    return intersectedObjects[0];
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

  public setSmallTrack(): void { // weird
    this.removeTrack();
    this.track = this.trackCreator.smallTrack();
    this.buildTrack();
  }

  public setBigTrack(): void { // weird
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
