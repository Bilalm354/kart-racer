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

    keyDownHandler(key: string): void {
      switch (key) {
        case 'ArrowRight':
          this.right = true;
          break;
        case 'ArrowLeft':
          this.left = true;
          break;
        case 'ArrowDown':
          this.down = true;
          break;
        case 'ArrowUp':
          this.up = true;
          break;
        case ' ':
          this.space = true;
          break;
        default:
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
