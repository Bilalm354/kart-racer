import {
  BoxGeometry, Mesh, MeshStandardMaterial, Vector3,
} from 'three';

// type Direction = 'x' | 'y';

export type Track = Vector3[];

export const track = [new Vector3(0, 0, 5), new Vector3(10, 0, 5)];

track.length = 20;

const cubeLength = 10;

export function createCube(): Mesh {
  const geometry = new BoxGeometry(cubeLength, cubeLength, cubeLength);
  const material = new MeshStandardMaterial({ color: 0xff0000 });
  return new Mesh(geometry, material);
}

// export function smallTrack(): Track {
//   const track: Track = [];
//   track.push(...createSquareOfWalls(20));
//   track.push(...createSquareOfWalls(40));
//   return track;
// }

// export function bigTrack(): Track {
//   const track: Track = { ground: [], walls: [] };
//   track.ground.push(createGround(160));
//   track.walls.push(...createSquareOfWalls(80));
//   track.walls.push(...createSquareOfWalls(160));
//   return track;
// }
