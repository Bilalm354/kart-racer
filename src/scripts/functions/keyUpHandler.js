export function keyUpHandler(event, keyboard) {
    if (event.keyCode == 39) {
        keyboard.right = false;
    } else if (event.keyCode == 37) {
        keyboard.left = false;
    }
    if (event.keyCode == 40) {
        keyboard.down = false;
    } else if (event.keyCode == 38) {
        keyboard.up = false;
    }
}
