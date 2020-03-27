import * as THREE from "three";
import Physijs from "physijs-webpack";

const bodyGeometry = new THREE.BoxGeometry(8, 12, 4);
const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000ff,
    wireframe: false
});
const car = new Physijs.BoxMesh(bodyGeometry, bodyMaterial, 10);

const wheelGeometry = new THREE.SphereGeometry(1);
const wheelMaterial = new THREE.MeshBasicMaterial({ color: 0x888888 });

const frontLeftWheel = new Physijs.BoxMesh(wheelGeometry, wheelMaterial);
const frontRightWheel = new Physijs.BoxMesh(wheelGeometry, wheelMaterial);
const backLeftWheel = new Physijs.BoxMesh(wheelGeometry, wheelMaterial);
const backRightWheel = new Physijs.BoxMesh(wheelGeometry, wheelMaterial);

frontLeftWheel.position.x = -4;
frontLeftWheel.position.y = 6;
frontLeftWheel.position.z = -2;

frontRightWheel.position.x = 4;
frontRightWheel.position.y = 6;
frontRightWheel.position.z = -2;

backLeftWheel.position.x = -4;
backLeftWheel.position.y = -6;
backLeftWheel.position.z = -2;

backRightWheel.position.x = 4;
backRightWheel.position.y = -6;
backRightWheel.position.z = -2;

car.add(frontLeftWheel);
car.add(frontRightWheel);
car.add(backLeftWheel);
car.add(backRightWheel);

export { car };
