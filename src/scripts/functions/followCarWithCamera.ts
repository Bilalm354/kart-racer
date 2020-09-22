import { Group } from "three";

export function followCarWithCamera(
    camera: {
        position: { x: number; y: number; z: any };
        lookAt: (arg0: any, arg1: any, arg2: any) => void;
        up: { set: (arg0: number, arg1: number, arg2: number) => void };
    },
    car: Group,
    playerCar: { angle: number }
) {
    camera.position.x = car.position.x - 40 * Math.sin(playerCar.angle);
    camera.position.y = car.position.y - 40 * Math.cos(playerCar.angle);
    camera.position.z = car.position.z + 20;
    camera.lookAt(car.position.x, car.position.y, car.position.z);
    camera.up.set(0, 0, 1);
}
