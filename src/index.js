import { Task } from './Task.js';
import { Project } from './Project.js';

const myProject = new Project('myProject');
myProject.addTask('test');
myProject.addTask('test2');
console.log(myProject);
myProject.deleteTask('1');
console.log(myProject);