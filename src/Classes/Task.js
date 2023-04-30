export class Task {
    constructor(title, desc, scheduled, priority){
        this.title = title;
        this.desc = desc;
        this.scheduled = scheduled;
        this.priority = priority;
        this.completed = false;
        this._id = null;
    }

    set id(Project){

        function getRandomID(){
            return `${Project._id}task${Math.floor(Math.random() * 9999 + 1000)}`;
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

    setTitle(value){
        this.title = value;
    }

    setDesc(value){
        this.desc = value;
    }

    setScheduled(value){
        this.scheduled = value;
    }

    setPriority(value){
        this.priority = value;
    }

    setCompleted(){
        this.completed = !this.completed;
    }
}