import { Task } from './Classes/Task.js';
import { Project } from './Classes/Project.js';
import { Collection } from './Classes/Collection.js';

const collection = new Collection();

const p1 = new Project('projct1');
const p2 = new Project('project2');

p1.addTask('p1task1');
p1.addTask('p1task2');
p2.addTask('p2task1');
p2.addTask('p2task2');
p1.setTaskIDs();

p1.pushProject(collection);
p2.pushProject(collection);

collection.setProjectIDs();

console.log(collection);

collection.addProject('project3');
console.log(collection);

