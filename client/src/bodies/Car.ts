import {
  Box3, Camera, Group, Vector3,
} from 'three';
import { world } from '~/World';
import { createCarObject3d } from '~/bodies/createCarObject3d';

const FRAMES_PER_SECOND = 120;
const ACCELERATION_DUE_TO_GRAVITY = 9.8;
const ACCELERATION_DUE_TO_GRAVITY_PER_FRAME = ACCELERATION_DUE_TO_GRAVITY / FRAMES_PER_SECOND;

export class Car {
  public angle: number;
  public power: number;
  public reverse: number;
  public angularVelocity: number;
  public isThrottling: boolean;
  public isReversing: boolean;
  public isTurningLeft: boolean;
  public isTurningRight: boolean;
  public isTurbo: boolean;
  public velocity: Vector3;
  public x: number;
  public y: number;
  public z: number;
  public health: number;
  public turbo: number;
  public object3d: Group;
  public color: string
  public boundingBox: Box3;

  constructor() {
    this.x = -150;
    this.y = 0;
    this.z = 300; // makes car sit on top of track
    this.velocity = new Vector3(0, 0, 0); //
    this.angle = 0;
    this.power = 0;
    this.reverse = 0;
    this.angle = 0;
    this.angularVelocity = 0;
    this.isThrottling = false;
    this.isReversing = false;
    this.isTurningLeft = false;
    this.isTurningRight = false;
    this.isTurbo = false;
    this.health = 100;
    this.turbo = 100;
    this.color = 'blue';
    this.object3d = createCarObject3d(this.color);
    this.boundingBox = new Box3().setFromObject(this.object3d);
  }

  public updateBoundingBox() {
    this.boundingBox.setFromObject(this.object3d);
  }

  public applyGravity() {
    if (this.z > 3) {
      this.velocity.z -= ACCELERATION_DUE_TO_GRAVITY_PER_FRAME;
    } else {
      this.velocity.z = 0;
      this.z = 3;
    }
  }

  public handleCollision(): void {
    this.health = Math.max(0, this.health - this.power * 200);
    this.velocity = this.velocity.multiplyScalar(-1);
    this.power *= 0.5;
  }

  public getHorizontalSpeed(): number {
    // FIXME: is slow and appears to lag behind
    const horizontalVelocity = this.velocity.clone().setY(0);
    return Math.round(horizontalVelocity.length() * 10);
  }

  setColor(color: string): void {
    world.scene.remove(this.object3d);
    this.color = color;
    this.object3d = createCarObject3d(color);
    world.scene.add(this.object3d);
  }

  update(): void {
    let maxPower = 0.175;
    const maxReverse = 0.0375;
    const powerFactor = 0.001;
    const reverseFactor = 0.0005;
    const drag = 0.95;
    const angularDrag = 0.95;
    const turnSpeed = 0.002;

    if (this.isThrottling) {
      this.power += powerFactor;
    }

    if (this.isTurbo) {
      maxPower = 3;
      this.power += 5 * powerFactor;
      this.turbo = Math.max(0, this.turbo - 1);
    }

    if (!this.isThrottling && !this.isTurbo) {
      maxPower = 0.175;
      this.power -= powerFactor;
    }

    this.reverse = this.isReversing ? this.reverse + reverseFactor : this.reverse - reverseFactor;
    this.power = Math.max(0, Math.min(maxPower, this.power));
    this.reverse = Math.max(0, Math.min(maxReverse, this.reverse));
    const direction = this.power >= this.reverse ? 1 : -1;

    if (this.isTurningLeft) {
      this.angularVelocity -= direction * turnSpeed;
    }

    if (this.isTurningRight) {
      this.angularVelocity += direction * turnSpeed;
    }

    this.velocity.x += Math.sin(this.angle) * (this.power - this.reverse);
    this.velocity.y += Math.cos(this.angle) * (this.power - this.reverse);

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.z += this.velocity.z;
    this.velocity.x *= drag;
    this.velocity.y *= drag;
    this.applyGravity();
    this.angle += this.angularVelocity;
    this.angularVelocity *= angularDrag;
    this.health = Math.min(this.health + 0.1, 100);
    this.turbo = Math.min(this.turbo + 0.3, 100);
    this.updateObject3d();
    this.boundingBox.setFromObject(this.object3d);
  }

  // TODO: one player uses WASD and the other uses arrows
  // TODO: allow assigning keyboard controls yourself
  // TODO: add a button for handbrake/ drifting

  updateFromKeyboard(keyboard: any): void { // TODO: rename
    this.isThrottling = keyboard.up || keyboard.w;
    this.isReversing = keyboard.down || keyboard.s;
    this.isTurningRight = keyboard.right || keyboard.d;
    this.isTurningLeft = keyboard.left || keyboard.a;
    this.isTurbo = keyboard.space && this.turbo > 1;
  }

  updateObject3d(): void {
    this.object3d.position.x = this.x;
    this.object3d.position.y = this.y;
    this.object3d.position.z = this.z;
    this.object3d.rotation.y = -this.angle + Math.PI;
  }

  updateCamera(camera: Camera): void {
    const distanceBehindCamera = 40;
    const x = this.x - distanceBehindCamera * Math.sin(this.angle);
    const y = this.y - distanceBehindCamera * Math.cos(this.angle);
    const z = this.z + 20;
    camera.position.set(x, y, z);
    camera.lookAt(this.x, this.y, this.z);
    camera.up.set(0, 0, 1);
  }
}
