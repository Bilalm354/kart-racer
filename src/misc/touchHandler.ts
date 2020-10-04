import { keyboard } from './Keyboard';

export function handleStart(e: TouchEvent) {
  if (e.touches) {
    keyboard.up = true;
  }
}

export function handleEnd(e: TouchEvent) {
  if (e.touches) {
    keyboard.up = false;
  }
}

export function handleCancel(e: TouchEvent) {
  if (e.touches) {
    keyboard.up = false;
  }
}

export function handleMove(e:TouchEvent) {
  console.log(e);
  console.log('handleMove');
}
