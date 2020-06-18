import * as THREE from "three";

// https://threejsfundamentals.org/threejs/lessons/threejs-voxel-geometry.html
// https://github.com/mrdoob/three.js/blob/dev/examples/webgl_interactive_voxelpainter.html

const loader = new THREE.TextureLoader();
const geometry = new THREE.PlaneGeometry(400, 400);
const material = new THREE.MeshStandardMaterial({
    map: loader.load("src/scripts/textures/roadTexture.jpg"),
    wireframe: false,
});
material.map.wrapS = THREE.RepeatWrapping;
material.map.wrapT = THREE.RepeatWrapping;
material.map.repeat.set(100, 100);
const ground = new THREE.Mesh(geometry, material);

const track = new THREE.Group();
track.add(ground);

/* Left Wall */
for (let i = 0; i < 40; i++) {
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(geometry, material, 100);
    cube.position.set(-200, -200 + i * 10, 5);
    track.add(cube);
}

/* Right Wall */
for (let i = 0; i < 40; i++) {
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(geometry, material, 100);
    cube.position.set(200, -200 + i * 10, 5);
    track.add(cube);
}

/* Front Wall */
for (let i = 0; i < 40; i++) {
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(geometry, material, 100);
    cube.position.set(-200 + i * 10, 200, 5);
    track.add(cube);
}

/* Back Wall */
for (let i = 0; i < 40; i++) {
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(geometry, material, 100);
    cube.position.set(-200 + i * 10, -200, 5);
    track.add(cube);
}

/* Inner Left Wall */
for (let i = 0; i < 20; i++) {
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(geometry, material, 100);
    cube.position.set(-100, -100 + i * 10, 5);
    track.add(cube);
}

/* Inner Right Wall */
for (let i = 0; i < 20; i++) {
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(geometry, material, 100);
    cube.position.set(100, -100 + i * 10, 5);
    track.add(cube);
}

/* Inner Front Wall */
for (let i = 0; i < 20; i++) {
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(geometry, material, 100);
    cube.position.set(-100 + i * 10, 100, 5);
    track.add(cube);
}

/* Inner Back Wall */
for (let i = 0; i < 20; i++) {
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(geometry, material, 100);
    cube.position.set(-100 + i * 10, -100, 5);
    track.add(cube);
}

export { track };
