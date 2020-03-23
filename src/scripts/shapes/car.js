import * as THREE from "three";

var geometry = new THREE.BoxGeometry(10, 16, 6);
var material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
export var car = new THREE.Mesh(geometry, material);
