import {
  BoxGeometry, Mesh, MeshStandardMaterial, Vector3,
} from 'three';

export type Track = Vector3[];

const CUBE_LENGTH = 10;

export function createCube(): Mesh {
  const geometry = new BoxGeometry(CUBE_LENGTH, CUBE_LENGTH, CUBE_LENGTH);
  const material = new MeshStandardMaterial({ color: 0xff0000 });
  return new Mesh(geometry, material);
}

function getCoordinatesForWall(wallLengthInCubes: number): Vector3[] {
  const wall: Vector3[] = [];
  for (let i = 0; i <= wallLengthInCubes; i++) {
    wall.push(new Vector3(i * CUBE_LENGTH, 0, 5));
  }
  return wall;
}

export const track: Track = getCoordinatesForWall(20);
