import "../styles/index.scss";
import * as THREE from "three";
import React from "react";
import ReactDOM from "react-dom";
import { car } from "./vehicles/car";
import { track } from "./tracks/squareTrack";
import { keyboardUpdate } from "./functions/keyboardUpdate";
import { updateCar } from "./functions/updateCar";
import { updateCar3dObject } from "./functions/updateCar3dObject";
import { followCarWithCamera } from "./functions/followCarWithCamera";
import { keyDownHandler } from "./functions/keyDownHandler";
import { keyUpHandler } from "./functions/keyUpHandler";
import { playerCar } from "./data/playerCar";
import { keyboard } from "./data/keyboard";
import { camera } from "./three/camera";
import { ambientLight } from "./three/ambientLight";
import { directionalLight } from "./three/directionalLight";
import Options from "./react/Play";

document.addEventListener("keydown", (event) =>
    keyDownHandler(event, keyboard)
);
document.addEventListener("keyup", (event) => keyUpHandler(event, keyboard));

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

camera.position.set(0, 100, 100);

scene.background = new THREE.Color(0xfad6a5);

function init() {
    car.position.set(0, 0, 3);
    scene.add(track);
    scene.add(car);
    scene.add(ambientLight);
    directionalLight.position.set(1, 1, 0.5).normalize();
    scene.add(directionalLight);
    camera.up.set(0, 0, 1);
}
init();

function animate() {
    requestAnimationFrame(animate);
    keyboardUpdate(keyboard, playerCar);
    updateCar(playerCar);
    updateCar3dObject(car, playerCar);
    followCarWithCamera(camera, car, playerCar);
    renderer.render(scene, camera);
}
animate();

const Menu = () => <Options />;
ReactDOM.render(<Menu />, document.getElementById("react"));
