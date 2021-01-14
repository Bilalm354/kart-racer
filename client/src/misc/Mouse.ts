import { Vector2 } from 'three';
import { world } from '~/World';

class Mouse {
    public position: Vector2;
    public isDown: boolean;

    constructor() {
      this.position = new Vector2();
      this.isDown = false;
    }

    public onMouseDown(): void {
      this.isDown = true;
      world.createOrDeleteOnMouseDown(); // BUG: does this even when clicking on menu buttons so should add an if to stop that somewhere
    }

    public onMouseUp(): void {
      this.isDown = false;
    }

    public onMouseMove(event: MouseEvent) {
      this.position.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.position.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    public addMouseEventListeners(): void {
      document.addEventListener('mousemove', (event) => this.onMouseMove(event), false);
      document.addEventListener('mousedown', () => this.onMouseDown(), false);
      document.addEventListener('mouseup', () => this.onMouseUp(), false);
    }
}

export const mouse = new Mouse();
