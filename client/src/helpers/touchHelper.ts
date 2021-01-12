// TODO: add these to the touch pad controls

export function addTouchEventListenerPreventDefaults(element: HTMLElement) {
  element.addEventListener('touchstart', (event) => event.preventDefault(), { passive: false });
  element.addEventListener('touchend', (event) => event.preventDefault(), { passive: false });
  element.addEventListener('touchcancel', (event) => event.preventDefault(), { passive: false });
  element.addEventListener('touchmove', (event) => event.preventDefault(), { passive: false });
}
