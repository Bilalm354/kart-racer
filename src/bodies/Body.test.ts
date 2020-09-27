/* eslint-disable no-undef */
import { Object3D, Vector3 } from 'three';
import { Body } from '~/bodies/Body';

test('starting velocity of a new body should be 0', () => {
  const body = new Body(new Object3D());
  expect(body.velocity).toStrictEqual(new Vector3(0, 0, 0));
});
