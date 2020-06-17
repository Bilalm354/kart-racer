import "../styles/index.scss";
import * as THREE from "three";
import Physijs from "physijs-webpack";
import Stats from "stats.js";
import { car } from "./shapes/car";
import { obstacle } from "./shapes/obstacle";
import { track } from "./shapes/track";
import { keyboardUpdate } from "./functions/keyboardUpdate";
import { updateCar } from "./functions/updateCar";
import { updateCar3dObject } from "./functions/updateCar3dObject";
import { keyDownHandler } from "./functions/keyDownHandler";
import { playerCar } from "./data/playerCar";
import { keyboard } from "./data/keyboard";
import { camera } from "./three/camera";
import { ambientLight } from "./three/ambientLight";
import { keyUpHandler } from "./functions/keyUpHandler";

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

const scene = new Physijs.Scene();
scene.setGravity(new THREE.Vector3(0, 0, -100));
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.antialias = true;
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

car.position.set(0, -10, 520);
obstacle.position.set(0, 100, 505);
track.position.set(0, -10, 500);
camera.position.z = car.position.z + 20;

scene.add(car);
scene.add(obstacle);
scene.add(track);
scene.add(ambientLight);

function animate() {
    stats.begin();
    scene.simulate();
    stats.end();
    requestAnimationFrame(animate);
    keyboardUpdate(keyboard, playerCar);
    updateCar(playerCar);
    updateCar3dObject(camera, car, playerCar);
    renderer.render(scene, camera);
}

// function showSpeed() {
//     return playerCar.xVelocity;
// }

animate();

document.addEventListener("keydown", (event) =>
    keyDownHandler(event, keyboard)
);
document.addEventListener("keyup", (event) => keyUpHandler(event, keyboard));
