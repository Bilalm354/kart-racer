import {
  // Box3,
  BoxGeometry, Group, Mesh, MeshStandardMaterial, PlaneGeometry,
} from 'three';

type Direction = 'x' | 'y';

export interface Track {
  ground: Mesh[],
  walls: Group[],
}

// TODO: make walls arrays of cubes instead of Three Groups

export class TrackCreator {
  private cubeLength: number;
  private track: Track;
  constructor() {
    this.cubeLength = 10;
    this.track = {ground: [], walls: []}
  }

  newCube(): Mesh {
    const geometry = new BoxGeometry(this.cubeLength, this.cubeLength, this.cubeLength);
    const material = new MeshStandardMaterial({ color: 0xff0000 });
    const box = new Mesh(geometry, material);
    return box;
  }

  createGround(lengthOfSidesInCubes: number): void {
    const geometry = new PlaneGeometry(
      lengthOfSidesInCubes * this.cubeLength,
      lengthOfSidesInCubes * this.cubeLength,
    );
    const material = new MeshStandardMaterial({
      color: 'grey',
      wireframe: false,
    });
    this.track.ground.push(new Mesh(geometry, material))
  }

  createWall(xStart: number, yStart: number, wallLengthInCubes: number, direction: Direction) {
    const wall = new Group();

    for (let i = 0; i < wallLengthInCubes; i++) {
      const cube = this.newCube();

      if (direction === 'x') {
        cube.position.set(
          xStart + i * this.cubeLength,
          yStart,
          this.cubeLength / 2, // to raise the box vertically so it sits on top of the plane
        );
      }

      if (direction === 'y') {
        cube.position.set(
          xStart,
          yStart + i * this.cubeLength,
          this.cubeLength / 2, // to raise the box vertically so it sits on top of the plane
        );
      }
      wall.add(cube);
    }
    // TODO: add wall to collidable
    return wall;
  }

  createSquareOfWalls(wallLengthInCubes: number) {
    this.track?.walls.push(this.createWall(
      -(wallLengthInCubes * this.cubeLength - this.cubeLength) / 2,
      -(wallLengthInCubes * this.cubeLength - this.cubeLength) / 2,
      wallLengthInCubes,
      'x',
    ),this.createWall(
      -(wallLengthInCubes * this.cubeLength - this.cubeLength) / 2,
      (wallLengthInCubes * this.cubeLength - this.cubeLength) / 2,
      wallLengthInCubes,
      'x',
    ), this.createWall(
      -(wallLengthInCubes * this.cubeLength - this.cubeLength) / 2,
      -(wallLengthInCubes * this.cubeLength - this.cubeLength) / 2,
      wallLengthInCubes,
      'y',
    ), this.createWall(
      (wallLengthInCubes * this.cubeLength - this.cubeLength) / 2,
      -(wallLengthInCubes * this.cubeLength - this.cubeLength) / 2,
      wallLengthInCubes,
      'y',
    )
    )
  }

  createSmallTrack(): Track {
    this.createGround(40)
    this.createSquareOfWalls(20)
    this.createSquareOfWalls(40)
    return this.track
  }

  createBigTrack(): Track {
    this.createGround(160);
    this.createSquareOfWalls(80);
    this.createSquareOfWalls(160);
    return this.track
  }

  //  createTrackFromPlan() {

  //  }
}

// I want the track to be constructed from cubes in the final stage
// so that bounding boxes can be constructed.
