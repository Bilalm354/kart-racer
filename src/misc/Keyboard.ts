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

    // TODO: see if there's  a type for keys.

    keyDownHandler(key: string) {
      if (key === 'ArrowRight') {
        this.right = true;
      }
      if (key === 'ArrowLeft') {
        this.left = true;
      }
      if (key === 'ArrowDown') {
        this.down = true;
      }
      if (key === 'ArrowUp') {
        this.up = true;
      }
      if (key === ' ') {
        this.space = true;
      }
    }

    keyUpHandler(event: KeyboardEvent) {
      if (event.key === 'ArrowRight') {
        this.right = false;
      }
      if (event.key === 'ArrowLeft') {
        this.left = false;
      }
      if (event.key === 'ArrowDown') {
        this.down = false;
      }
      if (event.key === 'ArrowUp') {
        this.up = false;
      }
      if (event.key === ' ') {
        this.space = false;
      }
    }
}

export const keyboard = new Keyboard();
