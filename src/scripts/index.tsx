import "../styles/index.scss";
import * as THREE from "three";

// geometries
import { car } from "./vehicles/car";
import { track } from "./tracks/squareTrack";

// update functions
import { keyboardUpdate } from "./functions/keyboardUpdate";
import { updateCar } from "./functions/updateCar";
import { updateCar3dObject } from "./functions/updateCar3dObject";
import { followCarWithCamera } from "./functions/followCarWithCamera";
import { keyDownHandler } from "./functions/keyDownHandler";
import { keyUpHandler } from "./functions/keyUpHandler";

import { playerCar } from "./data/playerCar"; // this should be a class maybe
import { keyboard } from "./data/keyboard";

// these could all be in one file but don't need to be
import { camera } from "./three/camera";
import { ambientLight } from "./three/ambientLight";
import { directionalLight } from "./three/directionalLight";

document.addEventListener("keydown", (event) =>
    keyDownHandler(event, keyboard)
);
document.addEventListener("keyup", (event) => keyUpHandler(event, keyboard));

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.antialias = true;
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

camera.position.set(0, 100, 100);

scene.background = new THREE.Color(0xfad6a5);

// const playerCar = new Car
function init() {
    car.position.set(0, 0, 3);
    scene.add(track);
    scene.add(car);
    scene.add(ambientLight);
    directionalLight.position.set(1, 1, 0.5).normalize();
    scene.add(directionalLight);
    camera.up.set(0, 0, 1);
}


function update() {
    // update car
    // update camera
    //
}

function animate() {
    requestAnimationFrame(animate);
    keyboardUpdate(keyboard, playerCar);
    updateCar(playerCar);
    updateCar3dObject(car, playerCar);
    followCarWithCamera(camera, car, playerCar);
    renderer.render(scene, camera);
}

animate();

// TODO: separate into UI folder - can call it something else. 

import * as React from "react";
import ReactDOM from "react-dom";


class Play extends React.Component {
    render() {
        return <button onClick={() => init()}>Play</button>;
    }
}

class Welcome extends React.Component {
    render() {
        return <Play />;
    }
}

ReactDOM.render(<Welcome />, document.getElementById("react"));
