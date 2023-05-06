import css from './styles/index.css';
import { Task } from './Classes/Task.js';
import { Project } from './Classes/Project.js';
import { Collection } from './Classes/Collection.js';
import { buildUI } from './build/build.js';
import { UserSettings } from './Classes/UserSettings';

export const collection = new Collection();

buildUI();

const test = document.querySelector('.header-delete');
test.addEventListener('click', () => {
    console.log(collection);
    console.log(UserSettings.newProject)
});







