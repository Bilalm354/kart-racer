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
import { Options } from "./react/Play";
import { Object3D, Vector3 } from "three";

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

// maybe world should be a class. with an array of threeJs objects

// function updateWorld() {

// }

interface Object {
    id: number,
    object3d: Object3D,
    location: Vector3
} /// lets go baby 

const objects: Object3D[] = [track, car, ambientLight, directionalLight] // could make it an array of objects with a id, 3d location and 3dobject.

function init() {
    car.position.set(0, 0, 3);
    directionalLight.position.set(1, 1, 0.5).normalize();
    scene.add(...objects);
    camera.up.set(0, 0, 1);
}
init();

function updateSceneAndCamera() {
    // create an AudioListener and add it to the camera
    const listener = new THREE.AudioListener();
    camera.add( listener );

    // create a global audio source
    const sound = new THREE.Audio( listener );

    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load( 'sounds/ambient.ogg', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( true );
        sound.setVolume( 0.5 );
        sound.play();
    });

    // listener = playAudio();
    keyboardUpdate(keyboard, playerCar); // keyboard.update()
    updateCar(playerCar); // car.update()
    updateCar3dObject(car, playerCar); // world.update()
    followCarWithCamera(camera, car, playerCar); // world.update() / camera.update()
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);
    updateSceneAndCamera();
}
animate();

const Menu = () => <Options />;
ReactDOM.render(<Menu />, document.getElementById("react"));
