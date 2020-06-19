import "../styles/index.scss";
import * as THREE from "three";
import Stats from "stats.js";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { car } from "./objects/car";
import { track } from "./objects/squareTrack";

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

camera.position.set(0, 100, 100);

scene.background = new THREE.Color(0xfad6a5);

// track.position.set(-200, -200, -10);
car.position.set(0, 0, 3);

scene.add(track);
scene.add(car);
scene.add(ambientLight);
directionalLight.position.set(1, 1, 0.5).normalize();
scene.add(directionalLight);

camera.up.set(0, 0, 1);

// uncomment when switch to orbit controls
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.update();

const size = 400;
const divisions = 40;

const gridHelper = new THREE.GridHelper(size, divisions);
gridHelper.rotateX(Math.PI / 2);
scene.add(gridHelper);

function animate() {
    stats.begin();
    stats.end();
    // controls.update();
    requestAnimationFrame(animate);
    // * uncomment these and comment out orbiit control related things to play the game. *
    keyboardUpdate(keyboard, playerCar);
    updateCar(playerCar);
    updateCar3dObject(car, playerCar);
    followCarWithCamera(camera, car, playerCar);
    renderer.render(scene, camera);
}

animate();

document.addEventListener("keydown", (event) =>
    keyDownHandler(event, keyboard)
);
document.addEventListener("keyup", (event) => keyUpHandler(event, keyboard));
