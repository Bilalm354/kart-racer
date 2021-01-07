import {
  Scene, Light, Camera, Color, WebGLRenderer, PerspectiveCamera, Box3, OrthographicCamera, GridHelper, Material, Vector2, Raycaster, Vector3,
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

function onMouseMove(event: MouseEvent) {
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

// function onMouseDown(event) {
//   event.preventDefault();

//   mouse.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);

//   raycaster.setFromCamera(mouse, camera);

//   const intersects = raycaster.intersectObjects(objects);

//   if (intersects.length > 0) {
//     const intersect = intersects[0];

//     // delete cube

//     if (isShiftDown) {
//       if (intersect.object !== plane) {
//         scene.remove(intersect.object);

//         objects.splice(objects.indexOf(intersect.object), 1);
//       }

//       // create cube
//     } else {
//       const voxel = new THREE.Mesh(cubeGeo, cubeMaterial);
//       voxel.position.copy(intersect.point).add(intersect.face.normal);
//       voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
//       scene.add(voxel);

//       objects.push(voxel);
//     }

//     render();
//   }
// }

let INTERSECTED: any;

// const clock = new THREE.Clock();
// const updateDelta = clock.getDelta();

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

  constructor() {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 2000,
    );
    this.trackCreator = new TrackCreator();
    this.renderer = new WebGLRenderer();
    // this.renderer = new WebGLRenderer({ antialias: true }); // looks better but laggy
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
    // document.addEventListener('mousedown', onMouseDown, false);
  }

  public initRenderer(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // allows the canvas element to be focused so keydown event listeners can work
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
    gui.add(this, 'mode', ['play', 'create']).listen(); // doesn't work because need to call the change mode function
  }

  private buildTrack(): void {
    this.track.walls.forEach((wall) => {
      this.collidableBoundingBoxes.push(new Box3().setFromObject(wall));
      this.scene.add(wall);
    });
    this.scene.add(this.track.ground[0]);
  }

  private removeTrack(): void {
    this.track.walls.forEach((wall) => {
      this.scene.remove(this.scene.getObjectById(wall.id)!);
    });
    this.collidableBoundingBoxes = [];
    this.scene.remove(this.track.ground[0]);
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
    if (this.mode === 'play') {
      this.scene.add(this.car.object3d);
      this.car.updateFromKeyboard(keyboard);
      this.car.update();
      if (this.isCollisionActive) {
        this.resolveCollisionsBetweenCarsAndTrackWalls();
      }
      this.setCameraPosition(this.cameraView);
    } else if (this.mode === 'create') {
      this.isCollisionActive = false;
      this.scene.remove(this.car.object3d);
      this.setCameraPosition('firstPerson');
      this.movePlayer();
    }
    this.grid.visible = this.isGridVisible;

    const point = this.findIntersectionPoint();

    if (point && keyboard.space) {
      console.log(point);
      const newCube = this.trackCreator.newCube();
      newCube.position.copy(point);
      this.scene.add(newCube);
    }

    this.renderer.render(this.scene, this.camera);
  }

  public findIntersectionPoint(): Vector3 | undefined {
    raycaster.setFromCamera(mouse, this.camera);

    const intersects = raycaster.intersectObjects(this.scene.children);

    if (intersects.length > 0) {
      if (INTERSECTED !== intersects[0].object) {
        INTERSECTED = intersects[0].object;
      }
    } else {
      INTERSECTED = null;
    }

    return intersects[0]?.point;
  }

  public updateCameraIfViewChanged(): void {
    if (this.cameraView === '2d') {
      const groundGeometry = this.track.ground[0].geometry as any;
      const { width, height } = groundGeometry.parameters;
      const orthographicCamera = new OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000);
      this.camera = orthographicCamera;
    }
  }

  private setCameraPosition(view: CameraView): void {
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

  public movePlayer(): void {
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
