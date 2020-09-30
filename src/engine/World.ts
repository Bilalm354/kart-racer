import {
  Group, Scene, Object3D, Light, Camera, Color, WebGLRenderer,
  PerspectiveCamera, Mesh, Box3,
} from 'three';
import { Car } from '../bodies/vehicles/CarClass';
import { ambientLight, directionalLight } from '../misc/lights';
import { bigTrack, newCube, smallTrack } from '../tracks/squareTrack';
import { keyboard } from '../misc/Keyboard';

type CameraView = 'top' | 'behindCar';

// TODO: Separate this file as it is getting too big.
// TODO: Separate collision related things to Collision

export class World {
  private track: Group;
  private ambientLight: Light;
  private directionalLight: Light;
  private car: Car;
  private otherObjects: Object3D[] = [];
  private scene: Scene;
  private camera: Camera;
  private cameraView: CameraView;
  private renderer: WebGLRenderer
  private newCube: Mesh;
  private carBoundingBox: Box3;
  private newCubeBoundingBox: Box3;
  private collidableBoundingBoxes: Box3[];

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
    this.carBoundingBox = new Box3().setFromObject(this.car.object3d);
    this.newCubeBoundingBox = new Box3().setFromObject(this.newCube);
    this.collidableBoundingBoxes = [this.newCubeBoundingBox];
  }

  private resolveCollision(box: Box3) {
    console.log(`resolve collision between ${this.car} and ${box}`);
  }

  private collisionCheck(collidableBoxes: Box3[]) {
    collidableBoxes.forEach((collidableBox) => {
      if ((this.carBoundingBox.intersectsBox(collidableBox))) {
        console.log('colliding');
        this.resolveCollision(collidableBox);
      }
    });
  }

  public onWindowResize() {
    this.camera = new PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 2000,
    );
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  public addBox(object: Object3D) {
    this.otherObjects.push(object);
  }

  public addCar() {
    this.otherObjects.push(new Car().object3d);
    this.updateSceneContents();
  }

  public init() {
    this.scene.background = new Color(0xfad6a5);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.renderer.shadowMap.enabled = true;
    this.car.object3d.position.set(0, 0, 3);
    directionalLight.position.set(1, 1, 0.5).normalize();
    this.scene.add(this.track, this.ambientLight, this.directionalLight,
      this.car.object3d, this.newCube);
    this.camera.up.set(0, 0, 1);
    this.newCube.position.set(0, 50, 5);
  }

  public uninit() {
    this.scene.remove(this.car.object3d);
  }

  public updateSceneContents() {
    this.scene.remove(this.track, this.car.object3d,
      ...this.otherObjects, this.ambientLight, this.directionalLight);
    this.scene.add(this.track, this.car.object3d,
      ...this.otherObjects, this.ambientLight, this.directionalLight);
  }

  public updateBoundingBoxes() {
    this.carBoundingBox = new Box3().setFromObject(this.car.object3d);
    this.newCubeBoundingBox = new Box3().setFromObject(this.newCube);
    this.collidableBoundingBoxes = [this.newCubeBoundingBox];
  }

  public updateSceneAndCamera() {
    this.setCameraPosition(this.cameraView);
    this.car.updateKeyboard(keyboard);
    this.car.update();
    this.car.updateObject3d();
    this.updateBoundingBoxes();
    this.collisionCheck(this.collidableBoundingBoxes);
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

  public setSmallTrack(): void {
    this.scene.remove(bigTrack);
    this.scene.add(smallTrack);
  }

  public setBigTrack(): void {
    this.scene.remove(smallTrack);
    this.scene.add(bigTrack);
  }
}
