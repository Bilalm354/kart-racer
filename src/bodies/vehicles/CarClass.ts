// unused
import { Camera, Vector3 } from 'three';
import { Body } from '~/Body';
import { carGeometry } from '~/bodies/vehicles/carGeometry';

export class Car extends Body {
  public position: Vector3

  public angle: number;

  constructor(position: Vector3) {
    super(carGeometry);
    this.position = position;
    this.angle = 0;
  }

  updatePosition(position: Vector3) {
    this.position = position;
  }

  updateVelocity(velocity: Vector3) {
    this.velocity = velocity;
  }

  updateCamera(camera: Camera, playerCar: any) {
    const x = this.position.x - 40 * Math.sin(playerCar.angle);
    const y = this.position.y - 40 * Math.cos(playerCar.angle);
    const z = this.position.z + 20;
    camera.position.set(x, y, z);
    camera.lookAt(this.geometry.position.x, this.geometry.position.y, this.geometry.position.z);
    camera.up.set(0, 0, 1);
  }
}
