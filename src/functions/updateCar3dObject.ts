import { Group } from "three";

export function updateCar3dObject(
    car: Group,
    playerCar: { x: any; y: any; angle: number }
) {
    car.position.x = playerCar.x;
    car.position.y = playerCar.y;
    car.rotation.z = -playerCar.angle;
}
