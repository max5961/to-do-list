import css from './styles/index.css';
import { Collection } from './data/Collection.js';
import { buildUI } from './build/default-build.js';

// export to Classes that act on the collection object
export const collection = new Collection();

buildUI();

const header = document.querySelector('.header');
const test = document.createElement('div');
test.style.color = 'red';
header.appendChild(test);






