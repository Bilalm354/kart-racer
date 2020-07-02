import * as THREE from "three";

const track = new THREE.Group();
const cubeLength = 10;

function createGround(lengthOfSidesInCubes) {
    const loader = new THREE.TextureLoader();
    const geometry = new THREE.PlaneGeometry(
        lengthOfSidesInCubes * cubeLength,
        lengthOfSidesInCubes * cubeLength
    );
    const material = new THREE.MeshStandardMaterial({
        map: loader.load("public/roadTexture.jpg"),
        wireframe: false,
    });
    material.map.wrapS = THREE.RepeatWrapping;
    material.map.wrapT = THREE.RepeatWrapping;
    material.map.repeat.set(100, 100);
    const ground = new THREE.Mesh(geometry, material);
    track.add(ground);
    return;
}

function newCube() {
    const cube = new THREE.Group();
    const geometry = new THREE.BoxGeometry(cubeLength, cubeLength, cubeLength); // the 10s here seem random.
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const box = new THREE.Mesh(geometry, material, 100);
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

function createWall(xStart, yStart, wallLengthInCubes, direction) {
    for (let i = 0; i < wallLengthInCubes; i++) {
        const cube = newCube();
        if (direction == "x") {
            cube.position.set(
                xStart + i * cubeLength,
                yStart,
                cubeLength / 2, // to raise the box vertically so it sits on top of the plane
                i
            );
        }
        if (direction == "y") {
            cube.position.set(
                xStart,
                yStart + i * cubeLength,
                cubeLength / 2, // to raise the box vertically so it sits on top of the plane
                i
            );
        }
        track.add(cube);
    }
}

function createSquareOfWalls(wallLengthInCubes) {
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
