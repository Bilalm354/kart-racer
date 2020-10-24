import {
  BoxGeometry, Mesh, MeshStandardMaterial, Vector3,
} from 'three';

// type Direction = 'x' | 'y';

export type Track = Vector3[];

const cubeLength = 10;

export function createCube(): Mesh {
  const geometry = new BoxGeometry(cubeLength, cubeLength, cubeLength);
  const material = new MeshStandardMaterial({ color: 0xff0000 });
  return new Mesh(geometry, material);
}

export const track: Track = [new Vector3(0, 0, 5), new Vector3(10, 0, 5)];

export function createSmallTrack(): Track {
  const smallTrack: Track = [];
  smallTrack.push(...createSquareOfWalls(20));
  smallTrack.push(...createSquareOfWalls(40));
  return smallTrack;
}

export function createBigTrack(): Track {
  const bigTrack: Track = [];
  bigTrack.push(...createSquareOfWalls(80));
  bigTrack.push(...createSquareOfWalls(160));
  return bigTrack;
}
