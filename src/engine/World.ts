import {
  Group, Scene, Object3D, Light, Camera, Color, WebGLRenderer,
  PerspectiveCamera, Mesh, BoxHelper,
} from 'three';
import { Car } from '~/bodies/vehicles/Car';
import { ambientLight, directionalLight } from '~/misc/lights';
import { bigTrack, newCube, smallTrack } from '~/tracks/squareTrack';
import { keyboard } from '~/misc/Keyboard';

type CameraView = 'top' | 'behindCar';

export class World {
  track: Group;
  ambientLight: Light;
  directionalLight: Light;
  car: Car;
  otherObjects: Object3D[] = [];
  scene: Scene;
  camera: Camera;
  cameraView: CameraView;
  renderer: WebGLRenderer
  newCube: Mesh;
  bbox: BoxHelper

  constructor() {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 2000,
    );
    this.renderer = new WebGLRenderer();
    this.track = bigTrack;
    this.ambientLight = ambientLight;
    this.directionalLight = directionalLight;
    this.car = new Car();
    this.otherObjects = [];
    this.cameraView = 'behindCar';
    this.newCube = newCube();
    this.bbox = new BoxHelper(this.car.object3d, 'white');
  }

  onWindowResize() {
    this.camera = new PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 2000,
    );
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  addBox(object: Object3D) {
    this.otherObjects.push(object);
  }

  addCar() {
    this.otherObjects.push(new Car().object3d);
    this.updateSceneContents();
  }

  init() {
    this.scene.background = new Color(0xfad6a5);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.renderer.shadowMap.enabled = true;
    this.car.object3d.position.set(0, 0, 3);
    directionalLight.position.set(1, 1, 0.5).normalize();
    this.scene.add(this.track, this.ambientLight, this.directionalLight,
      this.car.object3d, this.newCube, this.bbox);
    this.camera.up.set(0, 0, 1);
    this.newCube.position.set(0, 50, 5);
  }

  uninit() {
    this.scene.remove(this.car.object3d);
  }

  updateSceneContents() {
    this.scene.remove(this.track, this.car.object3d,
      ...this.otherObjects, this.ambientLight, this.directionalLight);
    this.scene.add(this.track, this.car.object3d,
      ...this.otherObjects, this.ambientLight, this.directionalLight);
  }

  updateSceneAndCamera() {
    this.car.updateKeyboard(keyboard);
    this.car.update();
    this.car.updateObject3d();
    this.setCameraPosition(this.cameraView);
    this.checkIfCubeAndCarColliding();
    this.bbox.update();
    this.renderer.render(this.scene, this.camera);
  }

  setCameraPosition(view: CameraView) {
    if (view === 'top') {
      this.camera.position.set(0, 0, 300);
      this.camera.lookAt(0, 0, 0);
      this.camera.up.set(0, 1, 0);
    } else if (view === 'behindCar') {
      this.car.updateCamera(this.camera);
    }
  }

  setCameraView(view: CameraView) {
    this.cameraView = view;
  }

  setSmallTrack(): void {
    this.scene.remove(bigTrack);
    this.scene.add(smallTrack);
  }

  setBigTrack(): void {
    this.scene.remove(smallTrack);
    this.scene.add(bigTrack);
  }

  checkIfCubeAndCarColliding() {

    // if cube and car colliding
    // console.log('colliding')
  }
}
