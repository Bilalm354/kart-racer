import * as THREE from "three";

const track = new THREE.Group();
const cubeLength = 10;

function createGround(lengthOfSidesInCubes: number) {
    const geometry = new THREE.PlaneGeometry(
        lengthOfSidesInCubes * cubeLength,
        lengthOfSidesInCubes * cubeLength
    );
    const material = new THREE.MeshStandardMaterial({
        color: 'grey',
        wireframe: false,
    });
    console.log(material);
    const ground = new THREE.Mesh(geometry, material);
    track.add(ground);
    return;
}

function newCube() {
    const cube = new THREE.Group();
    const geometry = new THREE.BoxGeometry(cubeLength, cubeLength, cubeLength); // the 10s here seem random.
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    // const box = new THREE.Mesh(geometry, material, 100);
    const box = new THREE.Mesh(geometry, material);
    cube.add(box);
    /* 
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: 0xffffff })
    );
    cube.add(line); 
    */
    return cube;
}

type direction = 'x' | 'y';

function createWall(xStart: number, yStart: number, wallLengthInCubes: number, direction: direction) {
    for (let i = 0; i < wallLengthInCubes; i++) {
        const cube = newCube();
        if (direction == "x") {
            cube.position.set(
                xStart + i * cubeLength,
                yStart,
                cubeLength / 2, // to raise the box vertically so it sits on top of the plane
            );
        }
        if (direction == "y") {
            cube.position.set(
                xStart,
                yStart + i * cubeLength,
                cubeLength / 2, // to raise the box vertically so it sits on top of the plane
            );
        }
        track.add(cube);
    }
}

function createSquareOfWalls(wallLengthInCubes: number) {
    createWall(
        -(wallLengthInCubes * cubeLength - cubeLength) / 2,
        -(wallLengthInCubes * cubeLength - cubeLength) / 2,
        wallLengthInCubes,
        "x"
    );
    createWall(
        -(wallLengthInCubes * cubeLength - cubeLength) / 2,
        (wallLengthInCubes * cubeLength - cubeLength) / 2,
        wallLengthInCubes,
        "x"
    );
    createWall(
        -(wallLengthInCubes * cubeLength - cubeLength) / 2,
        -(wallLengthInCubes * cubeLength - cubeLength) / 2,
        wallLengthInCubes,
        "y"
    );
    createWall(
        (wallLengthInCubes * cubeLength - cubeLength) / 2,
        -(wallLengthInCubes * cubeLength - cubeLength) / 2,
        wallLengthInCubes,
        "y"
    );
}

createGround(40);
createSquareOfWalls(20); // inner square
createSquareOfWalls(40); // outer square

export { track };
