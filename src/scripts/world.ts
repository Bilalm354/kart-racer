// this will store data about where everything is in the 3d world.
// Then funciton will update date in this

import { Vector3 } from 'three';

// and another function will render it to three js -
interface Body {
    position: Vector3,
    velocity: Vector3,
}

export default class World {
    bodies: Body[];

    constructor() {
      this.bodies = [];
    }

    public update() {}

    public addBody() {}
}
