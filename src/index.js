import { Task } from './Classes/Task.js';
import { Project } from './Classes/Project.js';
import { Collection } from './Classes/Collection.js';

const collection = new Collection();

collection.addProject('Project1');
collection.addProject('Project2');
collection.addProject('Project3');


console.log(collection);

collection.addProject('Project4');

const p5 = new Project('Project5');
p5.id = collection;
p5._id = 'testid';
p5.pushProject(collection);

console.log(collection);

for(const project of collection.projects){
    if(project._id === 'testid'){
        project.addTask('task1');
        for(const task of project.tasks){
            task.setTitle('task1 bro');
            task.setPriority('very high');
        }
    }
}

console.log(collection);