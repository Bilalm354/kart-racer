import {
  Scene, Light, Camera, Color, WebGLRenderer,
  PerspectiveCamera, Box3, Object3D,
} from 'three';
import { Car } from './bodies/vehicles/Car';
import { ambientLight, directionalLight } from './misc/lights';
import { Track, TrackCreator } from './tracks/TrackCreator';
import { keyboard } from './misc/Keyboard';
import { handleStart, handleEnd, handleCancel, handleMove } from '~misc/touchHandler';

type CameraView = 'top' | 'behindCar';

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

  constructor() {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 2000,
    );
    this.trackCreator = new TrackCreator();
    this.renderer = new WebGLRenderer();
    this.track = this.trackCreator.createBigTrack();
    this.ambientLight = ambientLight;
    this.directionalLight = directionalLight;
    this.car = new Car();
    this.cameraView = 'behindCar';
    this.collidableBoundingBoxes = [];
  }

  public onWindowResize() {
    this.camera = new PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 2000,
    );
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  public init() {
    this.scene.background = new Color(0xfad6a5);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.renderer.shadowMap.enabled = true;
    directionalLight.position.set(1, 1, 0.5).normalize();
    this.camera.up.set(0, 0, 1);
    this.scene.add(this.ambientLight, this.directionalLight, this.car.object3d );
    this.buildTrack();
    this.addCanvasEventListeners()
  }

  private buildTrack() {
    this.track.walls.map((wall) => {
      this.collidableBoundingBoxes.push(new Box3().setFromObject(wall));
      this.scene.add(wall)
    })
    this.scene.add(this.track.ground[0])
  }

  private removeTrack() {
    this.track.walls.map((wall) => {
      this.scene.remove(this.scene.getObjectById(wall.id)!);
    })
    this.collidableBoundingBoxes = [];
    this.scene.remove(this.track.ground[0]);
  }

  private resolveCollision() {
    this.collidableBoundingBoxes.forEach((collidableBox) => {
      if ((this.car.boundingBox.intersectsBox(collidableBox))) {
        this.car.collision();
      }
    });
  }

  private addCanvasEventListeners() { 
    const canvas = document.querySelector('canvas')!;
    canvas.addEventListener('touchstart', (event) => handleStart(event));
    canvas.addEventListener('touchend', (event) => handleEnd(event));
    canvas.addEventListener('touchcancel', (event) => handleCancel(event));
    canvas.addEventListener('touchmove', (event) => handleMove(event));
  }

  public removeCar() {
    this.scene.remove(this.car.object3d);
  }

  public updateSceneAndCamera() {
    this.car.updateKeyboard(keyboard);
    this.car.update();
    this.car.updateObject3d();
    this.car.updateBoundingBox()
    this.resolveCollision();
    this.setCameraPosition(this.cameraView);
    this.renderer.render(this.scene, this.camera);
  }

  private setCameraPosition(view: CameraView) {
    if (view === 'top') {
      this.camera.position.set(0, 0, 300);
      this.camera.lookAt(0, 0, 0);
      this.camera.up.set(0, 1, 0);
    } else if (view === 'behindCar') {
      this.car.updateCamera(this.camera);
    }
  }

  public setCameraView(view: CameraView) {
    this.cameraView = view;
  }

  public setSmallTrack(): void{
    this.removeTrack();
    this.track = this.trackCreator.createSmallTrack();
    this.buildTrack();
  }

  public setBigTrack(): void {
    this.removeTrack()
    this.track = this.trackCreator.createBigTrack();
    this.buildTrack();
  }
}
