export function addTouchEventListenerPreventDefaults(renderer: HTMLCanvasElement) {
  renderer.addEventListener('touchstart', (event) => event.preventDefault(), { passive: false });
  renderer.addEventListener('touchend', (event) => event.preventDefault(), { passive: false });
  renderer.addEventListener('touchcancel', (event) => event.preventDefault(), { passive: false });
  renderer.addEventListener('touchmove', (event) => event.preventDefault(), { passive: false });
}
