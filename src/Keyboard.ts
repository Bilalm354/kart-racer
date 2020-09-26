export class Keyboard {
    right: boolean;
    left: boolean;
    up: boolean;
    down: boolean;
    space: boolean

    constructor() {
      this.right = false;
      this.left = false;
      this.up = false;
      this.down = false;
      this.space = false;
    }

    keyDownHandler(event: KeyboardEvent) {
      if (event.keyCode === 39) {
        this.right = true;
      } else if (event.keyCode === 37) {
        this.left = true;
      } else if (event.keyCode === 40) {
        this.down = true;
      } else if (event.keyCode === 38) {
        this.up = true;
      } else if (event.keyCode === 32) {
        this.space = true;
      }
    }

    keyUpHandler(event: KeyboardEvent) {
      if (event.keyCode === 39) {
        this.right = false;
      } else if (event.keyCode === 37) {
        this.left = false;
      }
      if (event.keyCode === 40) {
        this.down = false;
      } else if (event.keyCode === 38) {
        this.up = false;
      } else if (event.keyCode === 32) {
        this.space = false;
      }
    }
}
