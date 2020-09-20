export function updateCar3dObject(car, playerCar) {
    car.position.x = playerCar.x;
    car.position.y = playerCar.y;
    car.rotation.z = -playerCar.angle;
}
