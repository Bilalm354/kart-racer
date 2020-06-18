import "../styles/index.scss";
import * as THREE from "three";
import Stats from "stats.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { car } from "./shapes/car";
import { obstacle } from "./shapes/obstacle";
import { track } from "./shapes/track";

import { keyboardUpdate } from "./functions/keyboardUpdate";
import { updateCar } from "./functions/updateCar";
import { updateCar3dObject } from "./functions/updateCar3dObject";
import { followCarWithCamera } from "./functions/followCarWithCamera";
import { keyDownHandler } from "./functions/keyDownHandler";
import { keyUpHandler } from "./functions/keyUpHandler";

import { playerCar } from "./data/playerCar"; // player car contains
import { keyboard } from "./data/keyboard";

import { camera } from "./three/camera";
import { ambientLight } from "./three/ambientLight";
import { directionalLight } from "./three/directionalLight";

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.antialias = true;
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

car.position.set(0, 0, 0);
obstacle.position.set(0, 100, 0);
track.position.set(0, 0, -10); // Third parameter = 10 is the thickness of the box for the ground boxGeometry
camera.position.set(0, 0, 100);

scene.background = new THREE.Color(0xbfd1e5);

scene.background = new THREE.Color(0xbfd1e5);

scene.add(car);
scene.add(obstacle);
scene.add(track);
scene.add(ambientLight);
directionalLight.position.set(1, 1, 0.5).normalize();
scene.add(directionalLight);

// uncomment when switch to orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
camera.up.set(0, 0, 1);
controls.update();

function animate() {
    stats.begin();
    stats.end();
    controls.update();
    requestAnimationFrame(animate);
    // * uncomment these and comment out orbiit control related things to play the game. *
    // keyboardUpdate(keyboard, playerCar);
    // updateCar(playerCar);
    // updateCar3dObject(car, playerCar);
    // followCarWithCamera(camera, car, playerCar);
    renderer.render(scene, camera);
}

animate();

document.addEventListener("keydown", (event) =>
    keyDownHandler(event, keyboard)
);
document.addEventListener("keyup", (event) => keyUpHandler(event, keyboard));
