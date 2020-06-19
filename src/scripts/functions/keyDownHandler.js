export function keyDownHandler(event, keyboard) {
    if (event.keyCode == 39) {
        keyboard.right = true;
    } else if (event.keyCode == 37) {
        keyboard.left = true;
    } else if (event.keyCode == 40) {
        keyboard.down = true;
    } else if (event.keyCode == 38) {
        keyboard.up = true;
    } else if (event.keyCode == 32) {
        keyboard.space = true;
    }
}
