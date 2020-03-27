import * as THREE from "three";
import Physijs from "physijs-webpack";

const geometry = new THREE.BoxGeometry(8, 12, 4);
const material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
export const car = new Physijs.BoxMesh(geometry, material, 10);
