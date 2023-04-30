export class Task {
    constructor(title, desc, dueDate, priority){
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }

    setTitle(value){
        this.title = value;
    }

    setDesc(value){
        this.desc = value;
    }

    setDueDate(value){
        this.dueDate = value;
    }

    setPriority(value){
        this.priority = value;
    }

    setCompleted(){
        this.completed = !this.completed
    }
}