import "../styles/index.scss";
import * as THREE from "three";
import { cube } from "./shapes/cube";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(cube);

camera.position.z = 5;

var controls = new OrbitControls(camera, renderer.domElement);

var animate = function() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
};

animate();
