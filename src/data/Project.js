import { Task } from './Task.js';
import { Storage } from './Storage.js';
import { collection } from '../index.js';
import { add, format } from 'date-fns';

export class Project {
    constructor(title, desc){
        this.title = title;
        this.desc = desc;
        this.tasks = [];
        this._id = null;
    }

    set id(collection){

        function getRandomID(){
            return `p${Math.floor(Math.random() * 9999 + 1000)}`;
        }

        if(this._id !== null) {
            return
        }

        else {

            let id = getRandomID()

            const takenIds = collection.projects.map(Project => Project._id);

            while(takenIds.includes(id)){
                id = getRandomID();
            }
    
            this._id = id;
        }
       
    }

    get id(){
        return this._id;
    }


    addTask(
        title = undefined,
        scheduled = undefined,
        priority = undefined,
    ){  
        this.tasks.push(new Task(title, scheduled, priority));
        this.setTaskIDs();
    }

    checkForUniqueTaskName(name){
        const copiedNames = this.tasks.filter(task => task.title == name);
        if (copiedNames.length > 0) {
            return false;
        } else {
            return true;
        }
    }

    setTaskIDs(){
        // the set id method in the task class uses the parent project class as a parameter.  This is the reasoning for 'task.id = this'.  May want to reconsider using a setter and use a method setTaskId() for the Task class which might be less confusing.
        this.tasks.forEach(task => task.id = this);
    }

    getTask(id){
        for(let index = 0; index < this.tasks.length; index++){
            if(this.tasks[index]._id === id){
                return this.tasks[index];
            }
        }
    }

    removeTask(id){

        const index = this.findTask(id);

        this.tasks.splice(index, 1);
    }

    // should only be needed for testing because the Project and Collection classes both have methods to add and subsequently push children to their storage
    pushProject(collection){
        collection.projects.push(this);
    }
}

