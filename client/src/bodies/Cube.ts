import {
  Box3, Mesh, Vector3,
} from 'three';
import { createNewCube } from '~/bodies/BodyCreator';

const CUBE_LENGTH = 10;

export class Cube {
  public object3d: Mesh;
  public boundingBox: Box3;

  constructor(position: Vector3) {
    this.object3d = createNewCube(CUBE_LENGTH);
    this.object3d.position.copy(position);
    this.boundingBox = new Box3().setFromObject(this.object3d);
  }
}
