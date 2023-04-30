import { Task } from './Task.js';
import { Project, projects } from './Project.js';
import { Collection } from './Collection.js';

const myCollection = new Collection();
const p1 = new Project('f');
const p2 = new Project('d');
const p3 = new Project('y');
const p4 = new Project('a');
const p5 = new Project('h');

p1.pushProject(myCollection);
p2.pushProject(myCollection);
p3.pushProject(myCollection);
p4.pushProject(myCollection);
p5.pushProject(myCollection);

myCollection.sortAscending();
console.log(myCollection.projects);

