/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
// this will store data about where everything is in the 3d world.
// Then funciton will update date in this

import { Body } from '~/Body';

export default class World {
  bodies: Body[];

  constructor() {
    this.bodies = [];
  }

  public update() { }

  public addBody() { }
}
