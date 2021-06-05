import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three';

export function createNewCube(length: number): Mesh {
  const geometry = new BoxGeometry(length, length, length);
  const material = new MeshStandardMaterial({ color: 0xff0000 });

  return new Mesh(geometry, material);
}
