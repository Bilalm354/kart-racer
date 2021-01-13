import {
  BoxGeometry, Group, Mesh, MeshStandardMaterial, PlaneGeometry, Vector3,
} from 'three';

// TODO: use box positions instead of walls
// TODO: make check point system
// TODO: make lap system -- check everytime player car goes through lap checkpoint
// TODO: create lap checkpoint visual on ground

type Direction = 'x' | 'y';

export interface Track {
  ground: Mesh,
  walls: Group[],
  boxPositions: Vector3[]
}

export class TrackCreator {
  public cubeLength: number;
  private track: Track;
  constructor() {
    this.cubeLength = 10;
    this.track = { ground: new Mesh(), walls: [], boxPositions: [] };
  }

  public newCube(): Mesh {
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
    this.track.ground = new Mesh(geometry, material);
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
    return wall;
  }

  createSquareOfWalls(wallLengthInCubes: number) {
    this.track?.walls.push(this.createWall(
      -(wallLengthInCubes * this.cubeLength - this.cubeLength) / 2,
      -(wallLengthInCubes * this.cubeLength - this.cubeLength) / 2,
      wallLengthInCubes,
      'x',
    ), this.createWall(
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
    ));
  }

  smallTrack(): Track {
    this.track = { ground: new Mesh(), walls: [], boxPositions: [] };
    this.createGround(40);
    this.createSquareOfWalls(20);
    this.createSquareOfWalls(40);
    return this.track;
  }

  bigTrack(): Track {
    this.track = { ground: new Mesh(), walls: [], boxPositions: [] };
    this.createGround(160);
    this.createSquareOfWalls(80);
    this.createSquareOfWalls(160);
    return this.track;
  }

  // createTrack(positions: Vector3[], startingPosition: Vector3, laps:number, scene: Scene) {
  //   positions.forEach((position => {
  //     const cube = this.newCube()
  //     cube.position.set(position.x, position.y, position.z)
  //     scene.add(cube)
  //   })
  // }
}
