import * as THREE from 'three';

// no longer used SADGE

export function createCarObject3d(color: string): THREE.Group {
  const bodyGeometry = new THREE.BoxGeometry(8, 12, 4);
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color,
    wireframe: false,
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);

  const wheelGeometry = new THREE.CylinderGeometry(1, 1);
  const wheelMaterial = new THREE.MeshBasicMaterial({ color: 'black' });

  const frontLeftWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
  frontLeftWheel.position.set(-4, 6, -2);

  const frontRightWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
  frontRightWheel.position.set(4, 6, -2);

  const backLeftWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
  backLeftWheel.position.set(-4, -6, -2);

  const backRightWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
  backRightWheel.position.set(4, -6, -2);

  [frontLeftWheel, frontRightWheel, backLeftWheel, backRightWheel].forEach((wheel) => { wheel.rotateZ(Math.PI / 2); });

  const car = new THREE.Group().add(body, frontLeftWheel, frontRightWheel, backLeftWheel, backRightWheel);

  return car.rotateX(Math.PI);
}
