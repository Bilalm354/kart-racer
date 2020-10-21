import THREE, {
  Scene, Light, Camera, Color, WebGLRenderer, PerspectiveCamera, Box3, Vector3, GridHelper, Raycaster, Vector2, Mesh,
} from 'three';
import { render } from 'react-dom';
import { Car } from './bodies/Car';
import { ambientLight, directionalLight } from './misc/lights';
import {
  bigTrack, smallTrack, track, createCube, Track,
} from './bodies/tracks';

type CameraView = 'top' | 'behindCar';

function addTouchEventListenerPreventDefaults(): void {
  const canvas = document.querySelector('canvas')!;
  canvas.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
  canvas.addEventListener('touchend', (e) => e.preventDefault(), { passive: false });
  canvas.addEventListener('touchcancel', (e) => e.preventDefault(), { passive: false });
  canvas.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
}

function onDocumentMouseMove(event: MouseEvent) {
  event.preventDefault();

  mouse.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(objects);

  if (intersects.length > 0) {
    const intersect = intersects[0];

    rollOverMesh.position.copy(intersect.point).add(intersect.face.normal);
    rollOverMesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
  }

  render();
}

function onDocumentMouseDown(event: MouseEvent) {
  event.preventDefault();

  mouse.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(objects);

  if (intersects.length > 0) {
    const intersect = intersects[0];

    // delete cube

    if (isShiftDown) {
      if (intersect.object !== plane) {
        scene.remove(intersect.object);

        objects.splice(objects.indexOf(intersect.object), 1);
      }

      // create cube
    } else {
      const voxel = new Mesh(cubeGeo, cubeMaterial);
      voxel.position.copy(intersect.point).add(intersect.face.normal);
      voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
      scene.add(voxel);

      objects.push(voxel);
    }

    render();
  }
}

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

  constructor() {
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 2000,
    );
    this.renderer = new WebGLRenderer();
    this.track = track;
    this.ambientLight = ambientLight;
    this.directionalLight = directionalLight;
    this.car = new Car();
    this.cameraView = 'behindCar';
    this.collidableBoundingBoxes = [];
    this.raycaster = new Raycaster();
    this.mouse = new Vector2();
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
    this.scene.add(this.ambientLight, this.directionalLight, this.car.object3d);
    this.buildTrack();
    addTouchEventListenerPreventDefaults();
  }

  private buildTrack() {
    this.track.forEach((boxPosition: Vector3) => {
      const { x, y, z } = boxPosition;
      const box = createCube();
      box.position.set(x, y, z);
      this.collidableBoundingBoxes.push(new Box3().setFromObject(box));
      this.scene.add(box);
    });

    // grid
    const gridHelper = new GridHelper(1000, 100);
    gridHelper.rotateX(-Math.PI / 2);
    this.scene.add(gridHelper);
  }

  // private removeTrack() {
  //   // this.track.forEach((boxPosition) => {
  //   //   this.scene.remove(this.scene.getObjectByName(!);
  //   // });
  //   this.collidableBoundingBoxes = [];
  //   this.scene.remove(this.track.ground[0]);
  // }

  private resolveCollisionsBetweenCarsAndTrackWalls() {
    this.collidableBoundingBoxes.forEach((collidableBox) => {
      if ((this.car.boundingBox.intersectsBox(collidableBox))) {
        this.car.handleCollision();
        // add cars and their handle collisions here
      }
    });
  }

  public removeCar() {
    this.scene.remove(this.car.object3d);
  }

  public updateSceneAndCamera() {
    this.car.update();
    this.resolveCollisionsBetweenCarsAndTrackWalls();
    this.setCameraPosition(this.cameraView);
    this.renderer.render(this.scene, this.camera);
  }

  private setCameraPosition(view: CameraView) {
    if (view === 'top') {
      this.camera.position.set(0, 0, 300);
      this.camera.lookAt(0, 0, 0);
      this.camera.up.set(0, 1, 0);
    } else if (view === 'behindCar') {
      this.car.updateBehindCarCameraPosition(this.camera);
    }
  }

  public setCameraView(view: CameraView) {
    this.cameraView = view;
  }

  public setSmallTrack(): void {
    this.removeTrack();
    this.track = smallTrack();
    this.buildTrack();
  }

  public setBigTrack(): void {
    this.removeTrack();
    this.track = bigTrack();
    this.buildTrack();
  }

  // The ground should be created automatically where it needs to be. For now it should be
  // the furtherest points sized plane.

  // public createGround(lengthOfSidesInCubes: number): Mesh {
  //   const geometry = new PlaneGeometry(
  //     lengthOfSidesInCubes * cubeLength,
  //     lengthOfSidesInCubes * cubeLength,
  //   );
  //   const material = new MeshStandardMaterial({
  //     color: 'grey',
  //     wireframe: false,
  //   });
  //   return new Mesh(geometry, material);
  // }
}
