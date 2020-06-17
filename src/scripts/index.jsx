import "../styles/index.scss";
import * as THREE from "three";
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

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.antialias = true;
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

car.position.set(0, 0, 0);
obstacle.position.set(0, 100, 0);
track.position.set(0, 0, -10); // 10 is the thickness of the box for the ground boxGeometry
camera.position.z = car.position.z + 20;

scene.background = new THREE.Color(0xbfd1e5);

scene.add(car);
scene.add(obstacle);
scene.add(track);
scene.add(ambientLight);

function animate() {
    stats.begin();
    stats.end();
    requestAnimationFrame(animate);
    keyboardUpdate(keyboard, playerCar);
    updateCar(playerCar);
    updateCar3dObject(camera, car, playerCar);
    renderer.render(scene, camera);
}

animate();

document.addEventListener("keydown", (event) =>
    keyDownHandler(event, keyboard)
);
document.addEventListener("keyup", (event) => keyUpHandler(event, keyboard));
