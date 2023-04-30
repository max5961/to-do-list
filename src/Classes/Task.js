export class Task {
    constructor(title, desc, scheduled, priority){
        this.title = title;
        this.desc = desc;
        this.scheduled = scheduled;
        this.priority = priority;
        this.completed = false;
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