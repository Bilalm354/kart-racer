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

    keyUpHandler(key: string) {
      switch (key) {
        case 'ArrowRight':
          this.right = false;
          break;
        case 'ArrowLeft':
          this.left = false;
          break;
        case 'ArrowDown':
          this.down = false;
          break;
        case 'ArrowUp':
          this.up = false;
          break;
        case ' ':
          this.space = false;
          break;
        default:
      }
    }
}

export const keyboard = new Keyboard();
