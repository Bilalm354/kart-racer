import { Camera } from 'three';
import { Body } from '~/Body';
import { carGeometry } from '~/bodies/vehicles/carGeometry';

export class Car extends Body {
  angle: number;
  power: number;
  reverse: number;
  angularVelocity: number;
  isThrottling: boolean;
  isReversing: boolean;
  isTurningLeft: boolean;
  isTurningRight: boolean;
  turbo: boolean;
  xVelocity: number;
  yVelocity: number;
  zVelocity: number;
  x: number;
  y: number;
  z: number;

  constructor() {
    super(carGeometry);
    this.x = 0;
    this.y = 0;
    this.z = 0;
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
    this.turbo = false;
  }

  updateGeometry() {
    this.geometry.position.x = this.x;
    this.geometry.position.y = this.y;
    this.geometry.rotation.z = -this.angle;
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
