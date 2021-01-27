// eslint-disable-next-line no-use-before-define
import React from 'react';
import { Col } from 'react-bootstrap';
import { keyboard } from '~/misc/Keyboard';

export const Touchpad = () => (
  <>
    <Col><div className="controls" id="go" onTouchStart={() => { keyboard.up = true; }} onTouchEnd={() => { keyboard.up = false; }}>Go</div></Col>
    <Col><div className="controls" id="stop" onTouchStart={() => { keyboard.down = true; }} onTouchEnd={() => { keyboard.down = false; }}>Stop</div></Col>
    <Col><div className="controls" id="turbo" onTouchStart={() => { keyboard.space = true; }} onTouchEnd={() => { keyboard.space = false; }}>Turbo</div></Col>
    <Col><div className="controls" id="left" onTouchStart={() => { keyboard.left = true; }} onTouchEnd={() => { keyboard.left = false; }}>Left</div></Col>
    <Col><div className="controls" id="right" onTouchStart={() => { keyboard.right = true; }} onTouchEnd={() => { keyboard.right = false; }}>Right</div></Col>
  </>
);
