/* eslint-disable no-param-reassign */
import { Camera, Group } from 'three';

export function followCarWithCamera(
  camera: Camera,
  car: Group,
  playerCar: { angle: number },
) {
  camera.position.x = car.position.x - 40 * Math.sin(playerCar.angle);
  camera.position.y = car.position.y - 40 * Math.cos(playerCar.angle);
  camera.position.z = car.position.z + 20;
  camera.lookAt(car.position.x, car.position.y, car.position.z);
  camera.up.set(0, 0, 1);
}
