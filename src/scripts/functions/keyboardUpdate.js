export function keyboardUpdate(keyboard, playerCar) {
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
