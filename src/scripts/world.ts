// this will store data about where everything is in the 3d world.
// Then funciton will update date in this

import { Object3D, Vector3 } from 'three';

class Body {
  velocity: Vector3;

  geometry: Object3D;

  constructor() {
    this.velocity;
    this.geometry;
  }
}

export default class World {
  bodies: Body[];

  constructor() {
    this.bodies = [];
  }

  public update() { }

  public addBody() { }
}
