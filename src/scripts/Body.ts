import { Object3D, Vector3 } from 'three';

export class Body {
    velocity: Vector3;

    geometry: Object3D;

    constructor(geometry: Object3D) {
      this.velocity = new Vector3(0, 0, 0);
      this.geometry = geometry;
    }
}
