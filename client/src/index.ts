import '~/styles/index';
import { createElement } from 'react';
import ReactDOM from 'react-dom';
import { Menu } from '~/ui/Menu';
import { world } from '~/World';

function animate() {
  ReactDOM.render(createElement(Menu), document.getElementById('react'));
  world.update();
  requestAnimationFrame(animate);
}

function main() {
  world.init();
  animate();
}

main();

requestAnimationFrame(animate);

console.log('\x1b[36m%s\x1b[0m', 'nerd');
