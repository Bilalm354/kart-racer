// eslint-disable-next-line no-use-before-define
import React from 'react';
import { Col } from 'react-bootstrap';
import { keyboard } from '~/misc/Keyboard';

function onTouchStartHandler(event: TouchEvent<HTMLDivElement>, control: string): void {
  event.preventDefault(); // doesn't do anything, fix it.
  switch (control) {
    case 'go':
      keyboard.up = true;
      break;
    case 'stop':
      keyboard.down = true;
      break;
    case 'turbo':
      keyboard.space = true;
      break;
    case 'left':
      keyboard.left = true;
      break;
    case 'right':
      keyboard.right = true;
      break;
    default:
  }
}

function onTouchEndHandler(event: TouchEvent<HTMLDivElement>, control: string): void {
  event.preventDefault(); // doesn't do anything, fix it.
  switch (control) {
    case 'go':
      keyboard.up = false;
      break;
    case 'stop':
      keyboard.down = false;
      break;
    case 'turbo':
      keyboard.space = false;
      break;
    case 'left':
      keyboard.left = false;
      break;
    case 'right':
      keyboard.right = false;
      break;
    default:
  }
}

export const Touchpad = () => (
  <>
    <Col>
      <div
        className="controls unselectable"
        id="go"
        onTouchStart={(event) => onTouchStartHandler(event, 'go')}
        onTouchEnd={(event) => onTouchEndHandler(event, 'go')}
        onTouchCancel={(event) => onTouchEndHandler(event, 'go')}
        onTouchMove={(event) => onTouchStartHandler(event, 'go')}
      >
        Go
      </div>
    </Col>
    <Col>
      <div
        className="controls unselectable"
        id="stop"
        onTouchStart={(event) => onTouchStartHandler(event, 'stop')}
        onTouchEnd={(event) => onTouchEndHandler(event, 'stop')}
        onTouchCancel={(event) => onTouchEndHandler(event, 'stop')}
        onTouchMove={(event) => onTouchStartHandler(event, 'stop')}

      >
        Stop

      </div>
    </Col>
    <Col>
      <div
        className="controls unselectable"
        id="turbo"
        onTouchStart={(event) => onTouchStartHandler(event, 'turbo')}
        onTouchEnd={(event) => onTouchEndHandler(event, 'turbo')}
        onTouchCancel={(event) => onTouchEndHandler(event, 'turbo')}
        onTouchMove={(event) => onTouchStartHandler(event, 'turbo')}

      >
        Turbo
      </div>
    </Col>
    <Col>
      <div
        className="controls unselectable"
        id="left"
        onTouchStart={(event) => onTouchStartHandler(event, 'left')}
        onTouchEnd={(event) => onTouchEndHandler(event, 'left')}
        onTouchCancel={(event) => onTouchEndHandler(event, 'left')}
        onTouchMove={(event) => onTouchStartHandler(event, 'left')}

      >
        Left
      </div>
    </Col>
    <Col>
      <div
        className="controls unselectable"
        id="right"
        onTouchStart={(event) => onTouchStartHandler(event, 'right')}
        onTouchEnd={(event) => onTouchEndHandler(event, 'right')}
        onTouchCancel={(event) => onTouchEndHandler(event, 'right')}
        onTouchMove={(event) => onTouchStartHandler(event, 'right')}

      >
        Right
      </div>
    </Col>
  </>
);
