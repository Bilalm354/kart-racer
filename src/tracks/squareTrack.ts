import {
  BoxGeometry, Group, Mesh, MeshStandardMaterial, PlaneGeometry,
} from 'three';

const smallTrack = new Group();
const bigTrack = new Group();
const cubeLength = 10;

// class trackCreator { }

function createGround(lengthOfSidesInCubes: number) {
  const geometry = new PlaneGeometry(
    lengthOfSidesInCubes * cubeLength,
    lengthOfSidesInCubes * cubeLength,
  );
  const material = new MeshStandardMaterial({
    color: 'grey',
    wireframe: false,
  });
  const ground = new Mesh(geometry, material);
  return ground;
}

export function newCube(): Mesh {
  const geometry = new BoxGeometry(cubeLength, cubeLength, cubeLength);
  const material = new MeshStandardMaterial({ color: 0xff0000 });
  const box = new Mesh(geometry, material);
  return box;
}

type Direction = 'x' | 'y';

function createWall(
  xStart:number,
  yStart: number,
  wallLengthInCubes: number,
  direction: Direction,
) {
  const wall = new Group();
  for (let i = 0; i < wallLengthInCubes; i++) {
    const cube = newCube();
    if (direction === 'x') {
      cube.position.set(
        xStart + i * cubeLength,
        yStart,
        cubeLength / 2, // to raise the box vertically so it sits on top of the plane
      );
    }
    if (direction === 'y') {
      cube.position.set(
        xStart,
        yStart + i * cubeLength,
        cubeLength / 2, // to raise the box vertically so it sits on top of the plane
      );
    }
    wall.add(cube);
  }
  return wall;
}

function createSquareOfWalls(wallLengthInCubes: number) {
  const square = new Group();
  square.add(createWall(
    -(wallLengthInCubes * cubeLength - cubeLength) / 2,
    -(wallLengthInCubes * cubeLength - cubeLength) / 2,
    wallLengthInCubes,
    'x',
  ));
  square.add(createWall(
    -(wallLengthInCubes * cubeLength - cubeLength) / 2,
    (wallLengthInCubes * cubeLength - cubeLength) / 2,
    wallLengthInCubes,
    'x',
  ));
  square.add(createWall(
    -(wallLengthInCubes * cubeLength - cubeLength) / 2,
    -(wallLengthInCubes * cubeLength - cubeLength) / 2,
    wallLengthInCubes,
    'y',
  ));
  square.add(createWall(
    (wallLengthInCubes * cubeLength - cubeLength) / 2,
    -(wallLengthInCubes * cubeLength - cubeLength) / 2,
    wallLengthInCubes,
    'y',
  ));
  return square;
}

smallTrack.add(createGround(40));
smallTrack.add(createSquareOfWalls(20));
smallTrack.add(createSquareOfWalls(40));

bigTrack.add(createGround(160));
bigTrack.add(createSquareOfWalls(80));
bigTrack.add(createSquareOfWalls(160));

export { smallTrack, bigTrack };
