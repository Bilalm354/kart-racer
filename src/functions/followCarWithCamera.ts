import { Camera, Group } from 'three';

export function followCarWithCamera(
  camera: Camera,
  car: Group,
  playerCar: { angle: number },
) {
  const x = car.position.x - 40 * Math.sin(playerCar.angle);
  const y = car.position.y - 40 * Math.cos(playerCar.angle);
  const z = car.position.z + 20;
  camera.position.set(x, y, z);
  camera.lookAt(car.position.x, car.position.y, car.position.z);
  camera.up.set(0, 0, 1);
}
