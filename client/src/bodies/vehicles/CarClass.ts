import { Camera, Group } from 'three';
import { world } from '~index';
import { createCarObject3d } from './createCarObject3d';

export class Car {
  angle: number;
  power: number;
  reverse: number;
  angularVelocity: number;
  isThrottling: boolean;
  isReversing: boolean;
  isTurningLeft: boolean;
  isTurningRight: boolean;
  isTurbo: boolean;
  xVelocity: number;
  yVelocity: number;
  zVelocity: number;
  x: number;
  y: number;
  z: number;
  health: number;
  turbo: number;
  object3d: Group;
  color: string

  constructor() {
    this.x = -150; // Makes car spawn outside of 
    this.y = 0;
    this.z = 3; // makes car sit on top of track
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.zVelocity = 0;
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
  }

  collision():void {
    this.health = Math.max(0, this.health - this.power*200);
    this.xVelocity = 0
    this.zVelocity = 0
    this.zVelocity = 0
    this.angularVelocity = 0
    this.power = 0;
    this.isThrottling = false;
  }

  setColor(color: string):void {
    this.color = color;
    world.uninit();
    this.object3d = createCarObject3d(color);
    world.init();
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

    if (this.isReversing) {
      this.reverse += reverseFactor;
    } else {
      this.reverse -= reverseFactor;
    }

    this.power = Math.max(0, Math.min(maxPower, this.power));
    this.reverse = Math.max(0, Math.min(maxReverse, this.reverse));

    const direction = this.power >= this.reverse ? 1 : -1;

    if (this.isTurningLeft) {
      this.angularVelocity -= direction * turnSpeed;
    }
    if (this.isTurningRight) {
      this.angularVelocity += direction * turnSpeed;
    }

    this.xVelocity += Math.sin(this.angle) * (this.power - this.reverse);
    this.yVelocity += Math.cos(this.angle) * (this.power - this.reverse);

    this.x += this.xVelocity;
    this.y += this.yVelocity;
    this.xVelocity *= drag;
    this.yVelocity *= drag;
    this.angle += this.angularVelocity;
    this.angularVelocity *= angularDrag;
    this.health = Math.min(this.health + 0.1, 100);
    this.turbo = Math.min(this.turbo + 0.1, 100);
  }

  updateKeyboard(keyboard: any) {
    if (keyboard.up) {
      this.isThrottling = true;
    } else {
      this.isThrottling = false;
    }
    if (keyboard.down) {
      this.isReversing = true;
    } else {
      this.isReversing = false;
    }
    if (keyboard.right) {
      this.isTurningRight = true;
    } else {
      this.isTurningRight = false;
    }
    if (keyboard.left) {
      this.isTurningLeft = true;
    } else {
      this.isTurningLeft = false;
    }
    if (keyboard.space && this.turbo > 1) {
      this.isTurbo = true;
    } else {
      this.isTurbo = false;
    }
  }

  updateObject3d() {
    this.object3d.position.x = this.x;
    this.object3d.position.y = this.y;
    this.object3d.position.z = this.z;
    this.object3d.rotation.z = -this.angle;
  }

  updateCamera(camera: Camera) {
    const x = this.x - 40 * Math.sin(this.angle);
    const y = this.y - 40 * Math.cos(this.angle);
    const z = this.z + 20;
    camera.position.set(x, y, z);
    camera.lookAt(this.x, this.y, this.z);
    camera.up.set(0, 0, 1);
  }
}
