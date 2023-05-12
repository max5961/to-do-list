import { Settings } from "../data/Settings.js";
import { ElementBuilder } from "./ElementBuilder.js";
import { InsertDefault } from "./default-build.js";
import { collection } from '../index.js';

export class Event {

    static preventDefault(e){
        e.preventDefault();
    }

    static createMobileDropDown(){
        Settings.mobileMenu = !Settings.mobileMenu

        Settings.mobileMenu ? InsertDefault.appendMenuContent() : InsertDefault.removeMenuContent();
    }

    static newProjectClick(){

        if (Settings.newProject === true) {
            ElementBuilder.buildNewProjectModal();
        }

        // new project form will not be generated until set to true again
        Settings.newProject = false;
    }

    static cancelProjectClick(){
        ElementBuilder.removeNewProjectModal();
        Settings.newProject = true;
    }

    static submitProjectClick(){

        if (document.querySelector('input#name').value != '') {

            collection.addProject(
                document.querySelector('input#name').value,
                document.querySelector('textarea#desc').value
            )

            ElementBuilder.removeNewProjectModal();

            // add the Project to the Menu drop down if drop down true
            Event.menuProjectsLoad();

            // allow the New Project button to generate a new form
            Settings.newProject = true;

            
        }
    }

    static menuProjectClick(e){
        if (collection.getAllProjects().length > 0) {
            Settings.allProjects = !Settings.allProjects;
        }

        Event.menuProjectsLoad();

    }

    static menuProjectsLoad(){
        if (Settings.allProjects && collection.getAllProjects().length > 0) {
            ElementBuilder.removeProjectsDropDown();
            ElementBuilder.buildProjectsDropDown();
            ElementBuilder.addProjectsToDropDown();
        } else {
            ElementBuilder.removeProjectsDropDown();
        }
    }

    static menuIndividualProjectClick(e){
        ElementBuilder.removeContent();

        const project = collection.findProject(Settings.currentProject);

        document.querySelector('.main-content').appendChild(
            ElementBuilder.buildProjectDisplay(project)
            );
        
        if (project.tasks.length > 0) {
            ElementBuilder.buildAllProjectTasks(project);
        }
    }

    static newTaskClick(){
        Settings.newTask = !Settings.newTask;

        ElementBuilder.changeNewTaskButton();

        !Settings.newTask ? ElementBuilder.buildNewTaskForm() : ElementBuilder.removeNewTaskForm();
    }

    static submitTaskClick(){
        if (document.querySelector('.task-name-input').value != '') {

            Settings.newTask = true;

            ElementBuilder.changeNewTaskButton();

            // put this shit in a separate module
            ElementBuilder.addTaskToProjectData();

            ElementBuilder.removeNewTaskForm();

            ElementBuilder.removeProjectTasks();

            ElementBuilder.buildAllProjectTasks(collection.findProject(Settings.currentProject));
        }
    }
}