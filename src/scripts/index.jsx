import "../styles/index.scss";
import * as React from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import Physijs from "physijs-webpack";
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

// parsing error
class Welcome extends React.Component {
    render() {
        return <button>Left</button>;
    }
}

ReactDOM.render(<Welcome />, document.body);
// end of error

const scene = new Physijs.Scene();
scene.setGravity(new THREE.Vector3(0, 0, -100));
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.antialias = true;
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);
//
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

document.addEventListener("keydown", event => keyDownHandler(event, keyboard));
document.addEventListener("keyup", event => keyUpHandler(event, keyboard));

// TODO: touch controls
// create buttons left, up, right, down
// create event listeners which set keyboard settings to true.
// try using pointerdown
//
