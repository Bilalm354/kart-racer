import { keyboard } from './Keyboard';

export function handleStart(e: TouchEvent) {
  if (e.touches) {
    e.preventDefault();
    keyboard.up = true;
  }
}

export function handleEnd(e: TouchEvent) {
  if (e.touches) {
    e.preventDefault();
    keyboard.up = false;
  }
}

export function handleCancel(e: TouchEvent) {
  if (e.touches) {
    e.preventDefault();
    keyboard.up = false;
  }
}

export function handleMove(e:TouchEvent) {
  e.preventDefault();
  console.log(e);
  console.log('handleMove');
}
