import * as THREE from "three";

const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material, 100);

export { cube };
