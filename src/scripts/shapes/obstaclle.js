import * as THREE from "three";
import Physijs from "physijs-webpack";

const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
export const obstacle = new Physijs.BoxMesh(geometry, material, 100);
