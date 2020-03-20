import * as THREE from "three";

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
export var cube = new THREE.Mesh(geometry, material);
