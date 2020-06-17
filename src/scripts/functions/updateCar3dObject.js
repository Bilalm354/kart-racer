export function updateCar3dObject(camera, car, playerCar) {
    car.position.x = playerCar.x;
    car.position.y = playerCar.y;
    car.rotation.z = -playerCar.angle;
    camera.position.x = car.position.x - 40 * Math.sin(playerCar.angle);
    camera.position.y = car.position.y - 40 * Math.cos(playerCar.angle);
    camera.position.z = car.position.z + 20;
    camera.lookAt(car.position.x, car.position.y, car.position.z);
    camera.up.set(0, 0, 1);
}
