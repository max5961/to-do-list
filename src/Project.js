import { Task } from './Task.js';

export class Project{
    constructor(title){
        this.title = title;
        this.tasks = [];
    }

    setTitle(value){
        this.title = value;
    }

    addTask(
        title = undefined,
        desc = undefined,
        dueDate = undefined,
        priority = undefined,
    ){
        this.tasks.push(new Task(title, desc, dueDate, priority));
    }

    deleteTask(index){
        this.tasks.splice(index, 1);
    }

    pushProject(collection){
        collection.projects.push(this);
    }
}

