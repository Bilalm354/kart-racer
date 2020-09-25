import * as THREE from 'three';

const bodyGeometry = new THREE.BoxGeometry(8, 12, 4);
const bodyMaterial = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
  wireframe: false,
});
const carBody = new THREE.Mesh(bodyGeometry, bodyMaterial);

const wheelGeometry = new THREE.CylinderGeometry(1, 1);
const wheelMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

const frontLeftWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
const frontRightWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
const backLeftWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
const backRightWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);

frontLeftWheel.position.x = -4;
frontLeftWheel.position.y = 6;
frontLeftWheel.position.z = -2;
frontLeftWheel.rotation.z = Math.PI / 2;

frontRightWheel.position.x = 4;
frontRightWheel.position.y = 6;
frontRightWheel.position.z = -2;
frontRightWheel.rotation.z = Math.PI / 2;

backLeftWheel.position.x = -4;
backLeftWheel.position.y = -6;
backLeftWheel.position.z = -2;
backLeftWheel.rotation.z = Math.PI / 2;

backRightWheel.position.x = 4;
backRightWheel.position.y = -6;
backRightWheel.position.z = -2;
backRightWheel.rotation.z = Math.PI / 2;

const car = new THREE.Group();
car.add(carBody);
car.add(frontLeftWheel);
car.add(frontRightWheel);
car.add(backLeftWheel);
car.add(backRightWheel);

export { car };
