import * as THREE from "three";

var loader = new THREE.TextureLoader();
var geometry = new THREE.PlaneGeometry(800, 8000);
var material = new THREE.MeshStandardMaterial({
    map: loader.load("public/background-1.png")
});
material.map.wrapS = THREE.RepeatWrapping;
material.map.wrapT = THREE.RepeatWrapping;
material.map.repeat.set(5, 10);
export var track = new THREE.Mesh(geometry, material);
