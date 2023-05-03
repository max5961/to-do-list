import { Task } from './Task.js';

export class Project{
    constructor(title, desc = undefined){
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
        desc = undefined,
        scheduled = undefined,
        priority = undefined,
    ){
        this.tasks.push(new Task(title, desc, scheduled, priority));
        this.setTaskIDs();
    }

    setTaskIDs(){
        this.tasks.forEach(task => task.id = this);
    }

    findTask(id){
        for(let index = 0; index < this.tasks.length; index++){
            if(this.tasks[index]._id === id){
                return index;
            }
        }
    }

    removeTask(id){

        const index = this.findTask(id);

        this.tasks.splice(index, 1);
    }

    // should only be needed for testing
    pushProject(collection){
        collection.projects.push(this);
    }
}

