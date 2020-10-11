import {
  Scene, Object3D, Light, Camera, Color, WebGLRenderer,
  PerspectiveCamera, Mesh, Box3, Vector3,
} from 'three';
import { Car } from './bodies/vehicles/CarClass';
import { ambientLight, directionalLight } from './misc/lights';
import { Track, TrackCreator } from './tracks/TrackCreator';
import { keyboard } from './misc/Keyboard';

type CameraView = 'top' | 'behindCar';

export class World {
  public car: Car;
  public scene: Scene;

  private track: Track;
  private ambientLight: Light;
  private directionalLight: Light;
  private otherObjects: Object3D[] = [];
  private camera: Camera;
  private cameraView: CameraView;
  private renderer: WebGLRenderer
  private newCube: Mesh;
  private newCubeBoundingBox: Box3;
  private collidableBoundingBoxes: Box3[];
  private trackCreator: TrackCreator;
  private carPositionBeforeColliding: Vector3 | undefined;

  constructor() {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 2000,
    );
    this.trackCreator = new TrackCreator();
    this.renderer = new WebGLRenderer();
    this.track = this.trackCreator.createSmallTrack();
    this.ambientLight = ambientLight;
    this.directionalLight = directionalLight;
    this.car = new Car();
    this.otherObjects = [];
    this.cameraView = 'behindCar';
    this.newCube = this.trackCreator.newCube();
    this.newCubeBoundingBox = new Box3().setFromObject(this.newCube);
    this.collidableBoundingBoxes = [this.newCubeBoundingBox];
  }

  private trackBuilder() {
    this.track.walls.map((wall) => {
      this.collidableBoundingBoxes.push(new Box3().setFromObject(wall));
      this.scene.add(wall)
    })
    // this.collidableBoundingBoxes.push(new Box3().setFromObject(this.track.ground[0]))  -- this causes the car to constantly collide and get damaged but the floor 
    this.scene.add(this.track.ground[0])
  }

  private resolveCollision() {
    this.collidableBoundingBoxes.forEach((collidableBox) => {
      if ((this.car.boundingBox.intersectsBox(collidableBox))) {
        this.car.collision();
        [this.car.x, this.car.y, this.car.z] = [this.carPositionBeforeColliding!.x, this.carPositionBeforeColliding!.y, this.carPositionBeforeColliding!.z]
      }
      else {
        this.carPositionBeforeColliding = new Vector3(this.car.x, this.car.y, this.car.z)
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
    this.carPositionBeforeColliding = new Vector3(this.car.x, this.car.y, this.car.z)
    this.scene.background = new Color(0xfad6a5);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.renderer.shadowMap.enabled = true;
    directionalLight.position.set(1, 1, 0.5).normalize();
    this.camera.up.set(0, 0, 1);
    this.newCube.position.set(0, 50, 5);
    this.scene.add(this.ambientLight, this.directionalLight, this.car.object3d, this.newCube);
    this.trackBuilder();
  }

  public uninit() {
    this.scene.remove(this.car.object3d);
  }

  public updateSceneContents() {
    this.scene.remove(this.car.object3d,
      ...this.otherObjects, this.ambientLight, this.directionalLight);
    this.scene.add(this.car.object3d,
      ...this.otherObjects, this.ambientLight, this.directionalLight);
  }

  public updateSceneAndCamera() {
    this.car.update();
    this.resolveCollision();
    this.car.updateObject3d();
    this.car.updateBoundingBox()
    this.car.updateKeyboard(keyboard);
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

  // TODO: reimplement setSmallTrack() and setBigTrack()
  // loop through each thing and remove from scene then 
  // this.track = create ...
  // call trackBuilder()

  // public setSmallTrack(): void {
  //   this.scene.remove(this.track);
  //   this.track = this.trackCreator.createSmallTrack();
  //   this.scene.add(this.track);
  // }

  // public setBigTrack(): void {
  //   this.scene.remove(this.track);
  //   this.track = this.trackCreator.createBigTrack();
  //   this.scene.add(this.track);
  // }
}
