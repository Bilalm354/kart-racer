import {
  Box3,
  BoxGeometry, Group, Mesh, MeshStandardMaterial, PlaneGeometry,
} from 'three';

type Direction = 'x' | 'y';

interface CollidableObject {
  mesh: Mesh,
  boundingBox: Box3
}

export class TrackCreator {
 private cubeLength: number;
 constructor() {
   this.cubeLength = 10;
 }

 newCube(): Mesh {
   const geometry = new BoxGeometry(this.cubeLength, this.cubeLength, this.cubeLength);
   const material = new MeshStandardMaterial({ color: 0xff0000 });
   const box = new Mesh(geometry, material);
   return box;
 }

 createGround(lengthOfSidesInCubes: number) {
   const geometry = new PlaneGeometry(
     lengthOfSidesInCubes * this.cubeLength,
     lengthOfSidesInCubes * this.cubeLength,
   );
   const material = new MeshStandardMaterial({
     color: 'grey',
     wireframe: false,
   });
   const ground = new Mesh(geometry, material);
   // TODO: Add to collidable
   return ground;
 }

 createWall(xStart:number, yStart: number, wallLengthInCubes: number, direction: Direction) {
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
   const square = new Group();
   square.add(this.createWall(
     -(wallLengthInCubes * this.cubeLength - this.cubeLength) / 2,
     -(wallLengthInCubes * this.cubeLength - this.cubeLength) / 2,
     wallLengthInCubes,
     'x',
   ));
   square.add(this.createWall(
     -(wallLengthInCubes * this.cubeLength - this.cubeLength) / 2,
     (wallLengthInCubes * this.cubeLength - this.cubeLength) / 2,
     wallLengthInCubes,
     'x',
   ));
   square.add(this.createWall(
     -(wallLengthInCubes * this.cubeLength - this.cubeLength) / 2,
     -(wallLengthInCubes * this.cubeLength - this.cubeLength) / 2,
     wallLengthInCubes,
     'y',
   ));
   square.add(this.createWall(
     (wallLengthInCubes * this.cubeLength - this.cubeLength) / 2,
     -(wallLengthInCubes * this.cubeLength - this.cubeLength) / 2,
     wallLengthInCubes,
     'y',
   ));
   return square;
 }

 createSmallTrack(): Group {
   const smallTrack = new Group();
   smallTrack.add(this.createGround(40));
   smallTrack.add(this.createSquareOfWalls(20));
   smallTrack.add(this.createSquareOfWalls(40));
   return smallTrack;
 }

 createBigTrack(): Group {
   const bigTrack = new Group();
   bigTrack.add(this.createGround(160));
   bigTrack.add(this.createSquareOfWalls(80));
   bigTrack.add(this.createSquareOfWalls(160));
   return bigTrack;
 }

  //  createTrackFromPlan() {

//  }
}

// I want the track to be constructed from cubes in the final stage
// so that bounding boxes can be constructed.
