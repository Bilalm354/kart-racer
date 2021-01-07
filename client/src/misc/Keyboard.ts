export class Keyboard {
    right: boolean;
    left: boolean;
    up: boolean;
    down: boolean;
    space: boolean;
    one: boolean;
    two: boolean;
    three: boolean;
    four: boolean

    constructor() {
      this.right = false;
      this.left = false;
      this.up = false;
      this.down = false;
      this.space = false;
      this.one = false;
      this.two = false;
      this.three = false;
      this.four = false;
    }

    keyDownHandler(event: KeyboardEvent): void {
      switch (event.key) {
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
        case '1':
          this.one = true;
          break;
        case '2':
          this.two = true;
          break;
        case '3':
          this.three = true;
          break;
        case '4':
          this.four = true;
          break;
        default:
      }
    }

    keyUpHandler(event : KeyboardEvent) {
      switch (event.key) {
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
        case '1':
          this.one = false;
          break;
        case '2':
          this.two = false;
          break;
        case '3':
          this.three = false;
          break;
        case '4':
          this.four = false;
          break;
        default:
      }
    }
}

export const keyboard = new Keyboard();
