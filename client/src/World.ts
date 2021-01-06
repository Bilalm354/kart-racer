import {
  Scene, Light, Camera, Color, WebGLRenderer, PerspectiveCamera, Box3, OrthographicCamera,
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

// TODO: add grid to GUI

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

  constructor() {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 2000,
    );
    this.trackCreator = new TrackCreator();
    this.renderer = new WebGLRenderer();
    this.track = this.trackCreator.smallTrack();
    this.ambientLight = ambientLight;
    this.directionalLight = directionalLight;
    this.car = new Car();
    this.cameraView = 'behindCar';
    this.collidableBoundingBoxes = [];
    this.mode = 'play';
  }

  public init(): void {
    this.scene.background = new Color(0xfad6a5);
    this.initRenderer();
    directionalLight.position.set(1, 1, 0.5).normalize();
    this.camera.up.set(0, 0, 1);
    this.scene.add(this.ambientLight, this.directionalLight, this.car.object3d);
    this.buildTrack();
    addTouchEventListenerPreventDefaults();
    this.addToGui();
  }

  public initRenderer(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.domElement.tabIndex = 1; // this is so that the canvas element can be focused and keydown event listeners can work
    this.renderer.domElement.addEventListener('keydown', (event) => keyboard.keyDownHandler(event));
    this.renderer.domElement.addEventListener('keyup', (event) => keyboard.keyUpHandler(event));
    document.body.appendChild(this.renderer.domElement);
    this.renderer.shadowMap.enabled = true;
  }

  public onWindowResize() {
    this.camera = new PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 2000,
    );
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  public addToGui() {
    gui.add(this, 'cameraView', ['top', 'behindCar', 'firstPerson', '2d']).listen();
    gui.add(this, 'mode', ['play', 'create']).listen(); // doesn't work because need to call the change mode function
  }

  private buildTrack() {
    this.track.walls.forEach((wall) => {
      this.collidableBoundingBoxes.push(new Box3().setFromObject(wall));
      this.scene.add(wall);
    });
    this.scene.add(this.track.ground[0]);
  }

  private removeTrack() {
    this.track.walls.forEach((wall) => {
      this.scene.remove(this.scene.getObjectById(wall.id)!);
    });
    this.collidableBoundingBoxes = [];
    this.scene.remove(this.track.ground[0]);
  }

  private resolveCollisionsBetweenCarsAndTrackWalls() {
    this.collidableBoundingBoxes.forEach((collidableBox) => {
      if ((this.car.boundingBox.intersectsBox(collidableBox))) {
        this.car.handleCollision();
      }
    });
  }

  public addCar() {
    this.scene.add(this.car.object3d);
  }

  public removeCar() {
    this.scene.remove(this.car.object3d);
  }

  public updateSceneAndCamera() {
    if (this.mode === 'play') {
      this.scene.add(this.car.object3d);
      this.car.updateFromKeyboard(keyboard);
      this.car.update();
      this.resolveCollisionsBetweenCarsAndTrackWalls();
      this.setCameraPosition(this.cameraView);
    } else if (this.mode === 'create') { // first person walking camera for track creator mode -- like minecraft
      this.scene.remove(this.car.object3d);
      this.setCameraPosition('firstPerson');
      this.movePlayer();
    }
    this.renderer.render(this.scene, this.camera);
  }

  public updateCameraIfViewChanged() {
    if (this.cameraView === '2d') {
      const groundGeometry = this.track.ground[0].geometry as any;
      const { width, height } = groundGeometry.parameters;
      const orthographicCamera = new OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000);
      this.camera = orthographicCamera;
    }
  }

  private setCameraPosition(view: CameraView) {
    const groundGeometry = this.track.ground[0].geometry as any;
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

  public movePlayer() {
    if (keyboard.down) {
      this.camera.position.y -= 10;
    }
    if (keyboard.up) { // should move in the direction I'm facing
      this.camera.position.y += 10;
    }
    if (keyboard.left) {
      this.camera.position.x -= 10;
    }
    if (keyboard.right) {
      this.camera.position.x += 10;
    }
  }

  public setCameraView(view: CameraView) {
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

  public setPlayMode(): void { // this is never used rn
    // TODO: if no car then add car
    this.mode = 'play';
  }

  public setCreateMode(): void {
    this.removeCar();
    this.mode = 'create';
  }
}

export const world = new World();
