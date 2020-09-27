import { Object3D, Vector3 } from 'three';

export class Body {
    public velocity: Vector3;
    public geometry: Object3D;

    // TODO: change geometry name to something more appropriate.
    constructor(geometry: Object3D) {
      this.velocity = new Vector3(0, 0, 0);
      this.geometry = geometry;
    }
}
