// import { keyboard } from './Keyboard';

export function handleGoStart(e: TouchEvent) {
  if (e.touches) {
    e.preventDefault();
    // keyboard.up = true;
  }
}

export function handleGoEnd(e: TouchEvent) {
  if (e.touches) {
    e.preventDefault();
    // keyboard.up = false;
  }
}

export function handleCancel(e: TouchEvent) {
    e.preventDefault();
}

export function handleMove(e:TouchEvent) {
  e.preventDefault();
}
