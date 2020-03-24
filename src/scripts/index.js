import "../styles/index.scss";
import * as THREE from "three";
import { car } from "./shapes/car";
import { track } from "./shapes/track";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

var keyboard = { right: false, left: false, up: false, down: false };
var light, ambientLight;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Physics

const maxPower = 0.175;
const maxReverse = 0.0375;
const powerFactor = 0.001;
const reverseFactor = 0.0005;

const drag = 0.95;
const angularDrag = 0.95;
const turnSpeed = 0.002;

const playerCar = {
    x: 0,
    y: 0,
    xVelocity: 0,
    yVelocity: 0,
    power: 0,
    reverse: 0,
    angle: 0,
    angularVelocity: 0,
    isThrottling: false,
    isReversing: false,
    isTurningLeft: false,
    isTurningRight: false
};

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.antialias = true;
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);
car.position.set(0, -10, 2);
scene.add(car);
scene.add(track);

ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

// light = new THREE.PointLight(0xffffff, 0.8, 18);
// light.position.set(-3, -5, 3);
// light.castShadow = true;
// light.shadow.camera.near = 0.1;
// light.shadow.camera.far = 25;
// scene.add(light);

camera.position.z = 20;

// var _controls = new OrbitControls(camera, renderer.domElement);
// console.log(controls);

// var loader = new THREE.GLTFLoader();

// // Load a glTF resource
// loader.load(
//     // resource URL
//     "models/gltf/duck/duck.gltf",
//     // called when the resource is loaded
//     function(gltf) {
//         scene.add(gltf.scene);

//         gltf.animations; // Array<THREE.AnimationClip>
//         gltf.scene; // THREE.Group
//         gltf.scenes; // Array<THREE.Group>
//         gltf.cameras; // Array<THREE.Camera>
//         gltf.asset; // Object
//     },
//     // called while loading is progressing
//     function(xhr) {
//         console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
//     },
//     // called when loading has errors
//     function(error) {
//         console.log("An error happened");
//     }
// );

var animate = function() {
    requestAnimationFrame(animate);
    keyboardUpdate();
    updateCar(playerCar);
    updateCar2();
    // controls.update();
    renderer.render(scene, camera);
};

animate();

function keyboardUpdate() {
    if (keyboard.up) {
        playerCar.isThrottling = true;
    } else {
        playerCar.isThrottling = false;
    }
    if (keyboard.down) {
        playerCar.isReversing = true;
    } else {
        playerCar.isReversing = false;
    }
    if (keyboard.right) {
        playerCar.isTurningRight = true;
    } else {
        playerCar.isTurningRight = false;
    }
    if (keyboard.left) {
        playerCar.isTurningLeft = true;
    } else {
        playerCar.isTurningLeft = false;
    }
}

function updateCar(car) {
    if (car.isThrottling) {
        car.power += powerFactor * car.isThrottling;
    } else {
        car.power -= powerFactor;
    }
    if (car.isReversing) {
        car.reverse += reverseFactor;
    } else {
        car.reverse -= reverseFactor;
    }

    car.power = Math.max(0, Math.min(maxPower, car.power));
    car.reverse = Math.max(0, Math.min(maxReverse, car.reverse));

    const direction = car.power > car.reverse ? 1 : -1;

    if (car.isTurningLeft) {
        car.angularVelocity -= direction * turnSpeed * car.isTurningLeft;
    }
    if (car.isTurningRight) {
        car.angularVelocity += direction * turnSpeed * car.isTurningRight;
    }

    car.xVelocity += Math.sin(car.angle) * (car.power - car.reverse);
    car.yVelocity += Math.cos(car.angle) * (car.power - car.reverse);

    car.x += car.xVelocity;
    car.y += car.yVelocity;
    car.xVelocity *= drag;
    car.yVelocity *= drag;
    car.angle += car.angularVelocity;
    car.angularVelocity *= angularDrag;
}

function updateCar2() {
    car.position.x = playerCar.x;
    car.position.y = playerCar.y;
    car.rotation.z = -playerCar.angle;
    // camera should always be behind car. So should be
    camera.position.x = car.position.x - 40 * Math.sin(playerCar.angle);
    camera.position.y = car.position.y - 40 * Math.cos(playerCar.angle);
    camera.lookAt(car.position.x, car.position.y, car.position.z);
    camera.up.set(0, 0, 1);
}

// keyboard controls
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
