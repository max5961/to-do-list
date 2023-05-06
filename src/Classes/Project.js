import { Task } from './Task.js';

export class Project{
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
        desc = undefined,
        scheduled = undefined,
        priority = undefined,
    ){
        this.tasks.push(new Task(title, desc, scheduled, priority));
        this.setTaskIDs();
    }

    setTaskIDs(){
        // the set id method in the task class uses the parent project class as a parameter.  This is the reasoning for 'task.id = this'.  May want to reconsider using a setter and use a method setTaskId() for the Task class which might be less confusing.
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

    // should only be needed for testing because the Project and Collection classes both have methods to add and subsequently push children to their storage
    pushProject(collection){
        collection.projects.push(this);
    }
}

