import "../styles/index.scss";
import * as THREE from "three";
import { car } from "./shapes/car";
import { obstacle } from "./shapes/obstacle";
import { track } from "./shapes/track";
import Physijs from "physijs-webpack";
import { keyboardUpdate } from "./functions/keyboardUpdate";
import { updateCar } from "./functions/updateCar";
import { updateCar3dObject } from "./functions/updateCar3dObject";
import { playerCar } from "./data/playerCar";
import { keyboard } from "./data/keyboard";
import { camera } from "./three/camera";
import { ambientLight } from "./three/ambientLight";

const scene = new Physijs.Scene();
scene.setGravity(new THREE.Vector3(0, 0, -100));
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.antialias = true;
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

car.position.set(0, -10, 20);
obstacle.position.set(0, 100, 5);
camera.position.z = 25;

scene.add(car);
scene.add(obstacle);
scene.add(track);
scene.add(ambientLight);

function animate() {
    scene.simulate();
    requestAnimationFrame(animate);
    keyboardUpdate(keyboard, playerCar);
    updateCar(playerCar);
    updateCar3dObject(camera, car, playerCar);
    renderer.render(scene, camera);
}

animate();

function keyDownHandler(event) {
    if (event.keyCode == 39) {
        keyboard.right = true;
    } else if (event.keyCode == 37) {
        keyboard.left = true;
    }
    if (event.keyCode == 40) {
        keyboard.down = true;
    } else if (event.keyCode == 38) {
        keyboard.up = true;
    }
}

function keyUpHandler(event) {
    if (event.keyCode == 39) {
        keyboard.right = false;
    } else if (event.keyCode == 37) {
        keyboard.left = false;
    }
    if (event.keyCode == 40) {
        keyboard.down = false;
    } else if (event.keyCode == 38) {
        keyboard.up = false;
    }
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
