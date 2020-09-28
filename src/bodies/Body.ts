import { Object3D, Vector3 } from 'three';

export class Body {
    public velocity: Vector3;
    public object3d: Object3D;

    // TODO: change geometry name to something more appropriate.
    constructor(object3d: Object3D) {
      this.velocity = new Vector3(0, 0, 0);
      this.object3d = object3d;
    }
}
