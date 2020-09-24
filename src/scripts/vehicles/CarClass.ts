import { Vector3 } from 'three';

export class Car {
    public position: Vector3

    public velocity: Vector3

    constructor(position: Vector3) {
      this.position = position;
      this.velocity = new Vector3(0, 0, 0);
    }

    update(position: Vector3, velocity: Vector3) {
      this.position = position;
      this.velocity = velocity;
    }
}
