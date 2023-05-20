import { Storage } from './Storage.js';
import { collection } from '../index.js';

export class Task {
    constructor(title, scheduled, priority){
        this.title = title;
        this.scheduled = scheduled;
        this.priority = priority;
        this.desc = '';
        this.completed = false;
        this._id = null;
    }

    set id(Project){

        function getRandomID(){
            return `${Project._id}-t${Math.floor(Math.random() * 9999 + 1000)}`;
        }
        
        if(this._id != null){
            return;
        }

        else {
            let id = getRandomID();
            const takenIDs = Project.tasks.map(task => task._id);

            while(takenIDs.includes(id)){
                id = getRandomID();
            }

            this._id = id;
        }
    }

    get id(){
        return this._id;
    }
}