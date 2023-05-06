import { Project } from './Project.js';

export class Collection {
    constructor(){
        this.projects = [];
    }

    addProject(title,desc){
        this.projects.push(new Project(title,desc))
        this.setProjectIDs();
    }

    setProjectIDs(){
        //project.id = this refers to the Project set id method that uses a Collection object as a parameter
        this.projects.forEach(Project => Project.id = this);
    }

    findProject(id){
        for(let index = 0; index < this.projects.length; index++){
            if(this.projects[index]._id === id){
                return index
            }
        }
    }

    removeProject(id){
        let index = this.findProject(id);
        this.projects.splice(index, 1);
    }

    addTaskToProject(id){
        const index = this.findProject(id);

        this.projects[index].addTask();
    }

    getAllTasks(){
        return this.projects.map(Project => Project.tasks).flat();
    }
    
    getAllProjects(){
        return this.projects;
    }

    getScheduledTasks(){

        let allTasks = [];

        for(let i = 0; i < this.projects.length; i++){
            allTasks.push(this.projects[i].tasks);
        }
        
        return allTasks.filter(task => task.scheduled != undefined);
    }

    //below are rough drafts
    getScheduledTodayTasks(){
        const allTasks = this.getScheduledTasks();

        const currDate = new Date();
        
        return allTasks.filter(task => task.scheduled === currDate);
    }

    sortScheduledTasks(tasks, typeOfSort = undefined){
        if(typeOfSort === undefined){
            return tasks.scheduled.sort();
        }
        else if(typeOfSort === 'priority'){
            return this.sortByPriority(tasks);
        }
        else if(typeOfSort === 'dateAsc'){
            return this.sortByDateAsc(tasks);
        }
    }

    // sort projects by name in ascending order
    sortAscending(){
        this.projects.sort((a,b) => {
            const A = a.title.toUpperCase();
            const B = b.title.toUpperCase();

            if(A < B){
                return -1;
            }

            if(A > B){
                return 1;
            }

            return 0;
        })
    }

    // sort projects by name in descending order
    sortDescending(){
        this.projects.sort((a,b) => {
            const A = a.title.toUpperCase();
            const B = b.title.toUpperCase();

            if(B < A){
                return -1;
            }

            if(B > A){
                return 1;
            }

            return 0;
        })
    }
}