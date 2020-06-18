import * as THREE from "three";

// https://threejsfundamentals.org/threejs/lessons/threejs-voxel-geometry.html
// https://github.com/mrdoob/three.js/blob/dev/examples/webgl_interactive_voxelpainter.html

const loader = new THREE.TextureLoader();
const geometry = new THREE.BoxGeometry(1000, 1000, 10);
const material = new THREE.MeshStandardMaterial({
    map: loader.load("src/scripts/textures/roadTexture.jpg"),
    wireframe: false,
});
material.map.wrapS = THREE.RepeatWrapping;
material.map.wrapT = THREE.RepeatWrapping;
material.map.repeat.set(100, 100);
const ground = new THREE.Mesh(geometry, material);
// Create and add walls on top of track.

const wallGeometry = new THREE.BoxGeometry(100, 1000, 100);
const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    wireframe: false,
});
const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
leftWall.geometry.translate(-500, 0, 100);
// rightWall.geometry.translate(500, 0, 100);
// try cloning the geometry for each instance

// use group

// use set position instead of geometry.translate

const track = new THREE.Group();
track.add(ground, leftWall, rightWall);
export { track };
