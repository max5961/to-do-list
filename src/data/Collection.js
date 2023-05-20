import { Project } from './Project.js';
import { Storage } from './Storage.js';
import { collection } from '../index.js';
import { add, format } from 'date-fns';

export class Collection {
    constructor(){
        this.projects = [];
    }

    addProject(title,desc){
        this.projects.push(new Project(title,desc))
        this.setProjectIDs();
        Storage.pushToLocalStorage(collection);
    }

    setProjectIDs(){
        //project.id = this refers to the Project set id method that uses a Collection object as a parameter
        this.projects.forEach(Project => Project.id = this);
    }

    getProject(id){
        for(let index = 0; index < this.projects.length; index++){
            if(this.projects[index]._id == id){
                return this.projects[index];
            }
        }
    }

    findProject(id){
        for(let index = 0; index < this.projects.length; index++){
            if(this.projects[index]._id == id){
                return index;
            }
        }
    }

    findTask(id){
        const tasks = this.getAllTasks();
        for (const task of tasks) {
            if (task._id === id) {
                return task;
            }
        }
    }

    removeTask(id){
        
        const task = this.findTask(id);
        const project = this.getProject(id.slice(0,5));

        for (let i = 0; i < project.tasks.length; i++) {
            if(project.tasks[i] === task) {
                project.tasks.splice(i,1);
                return;
            }
        }

    }

    checkProjectForUniqueName(name){
        const filteredProjects = this.projects.filter(project => project.title == name);
        if (filteredProjects.length > 0) {
            return false;
        } else {
            return true;
        }
    }

    removeProject(id){
        let index = this.findProject(id);
        this.projects.splice(index, 1);
    }

    // unused
    addTaskToProject(id){
        const index = this.findProject(id);

        this.projects[index].addTask();
        
    }

    replaceTaskInProject(projectID, editedTask){
        const index = this.findProject(projectID);

        this.projects[index].tasks.map(replaceTask)

        function replaceTask(task){
            if (task === editedTask) {
                return editedTask;
            }
        }
    }

    getAllTasks(){
        return this.projects.map(Project => Project.tasks).flat();
    }
    
    getAllProjects(){
        return this.projects;
    }

    getAllScheduledTasks(){
        return this.getAllTasks().filter(task => task.scheduled != '');
    }

    getAllScheduledTodayTasks(){
        const allScheduledTasks = this.getAllScheduledTasks();

        const currDate = format(new Date(), 'yyyy-MM-dd');
        
        return allScheduledTasks.filter(task => task.scheduled == currDate);
    }

    sortTasksDisplay(tasks, typeOfSort = undefined){
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
    static sortAscending(array){
        return array.sort((a,b) => {
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
    static sortDescending(array){
        return array.sort((a,b) => {
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