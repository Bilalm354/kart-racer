import * as THREE from "three";
import Physijs from "physijs-webpack";

const loader = new THREE.TextureLoader();
const geometry = new THREE.PlaneGeometry(1000, 1000);
const material = new THREE.MeshStandardMaterial({
    map: loader.load("public/background-1.png"),
    wireframe: false
});
material.map.wrapS = THREE.RepeatWrapping;
material.map.wrapT = THREE.RepeatWrapping;
material.map.repeat.set(4, 4);
export const track = new Physijs.BoxMesh(geometry, material, 0);
