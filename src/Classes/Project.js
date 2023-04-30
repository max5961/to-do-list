import { Task } from './Task.js';

export class Project{
    constructor(title){
        this.title = title;
        this.tasks = [];
        this._id = null;
    }

    set id(collection){

        function getRandomID(){
            return `project${Math.floor(Math.random() * 9999 + 1000)}`;
        }

        if(this._id !== null) {
            return
        }

        else {

            let id = getRandomID()

            const takenIds = collection.projects.map(project => project.id);

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
        desc = undefined,
        scheduled = undefined,
        priority = undefined,
    ){
        this.tasks.push(new Task(title, desc, scheduled, priority));
    }

    deleteTask(index){
        this.tasks.splice(index, 1);
    }

    pushProject(collection){
        collection.projects.push(this);
    }
}

