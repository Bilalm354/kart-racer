import * as THREE from "three";

const track = new THREE.Group();

// https://threejsfundamentals.org/threejs/lessons/threejs-voxel-geometry.html
// https://github.com/mrdoob/three.js/blob/dev/examples/webgl_interactive_voxelpainter.html

// TODO: create a const for length of edge of map and make everything work off of that, so that changing just that one variable will result in a different sized square map.

const loader = new THREE.TextureLoader();
const geometry = new THREE.PlaneGeometry(410, 410);
const material = new THREE.MeshStandardMaterial({
    map: loader.load("src/scripts/textures/roadTexture.jpg"),
    wireframe: false,
});
material.map.wrapS = THREE.RepeatWrapping;
material.map.wrapT = THREE.RepeatWrapping;
material.map.repeat.set(100, 100);
const ground = new THREE.Mesh(geometry, material);
track.add(ground);

function newCube() {
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(geometry, material, 100);
    return cube;
}

function createWall(xStart, yStart, length, direction) {
    for (let i = 0; i < length; i++) {
        const cube = newCube();
        if (direction == "x") {
            cube.position.set(xStart, yStart + i * 10, 5, i); // 5 to raise the box vertically so it sits on top of the plane
        }
        if (direction == "y") {
            cube.position.set(xStart + i * 10, yStart, 5, i); // 5 to raise the box vertically so it sits on top of the plane
        }
        track.add(cube);
    }
}

function createSquareOfWalls(length) {
    // 5 is the length of a cube/2 (10/2)
    createWall(-length * 5, -length * 5, length, "x");
    createWall(length * 5, -length * 5, length, "x");
    createWall(-length * 5, length * 5, length, "y");
    createWall(-length * 5, -length * 5, length, "y");
    // TODO: add a cube to the empty spot.
}

createSquareOfWalls(20); // inner square
createSquareOfWalls(40); // outer square

export { track };
