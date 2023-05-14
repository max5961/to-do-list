import { collection } from '../index.js';
import { Settings } from '../data/Settings.js';
import { 
    ElementBuilder,
    ElementManager,
    ElementRemover,
    EditUI, } from './ElementManager.js';

export class Event {

    static preventDefault(e){
        e.preventDefault();
    }
}

export class ProjectUI extends Event {

    static newProjectClick(){
        if (Settings.newProjectAllowed) {
            ElementManager.insertProjectUIModal();
            Settings.newProjectAllowed = false;
        }
    }
     
    static cancelProjectClick(){
        ElementRemover.removeProjectUIModal();
        Settings.newProjectAllowed = true;
    }

    static checkForUniqueProjectName(nameInput){
        return collection.checkProjectForUniqueName(nameInput);
    }

    static submitProjectClick(){
        const nameInput = document.querySelector('input#name').value;

        if (nameInput != '' && ProjectUI.checkForUniqueProjectName(nameInput)) {

            ElementManager.addProjectToCollection();

            ElementRemover.removeProjectUIModal();

            if(document.querySelector('ul.projects-drop-down')){
                ElementRemover.removeProjectsDropDown();
            }
            ElementManager.showProjectsDropDown();

            ElementRemover.removeContentFromMainContent();

            ElementManager.insertProjectToMainContent(
                collection.getAllProjects()[collection.getAllProjects().length - 1]
            );

            Settings.newProjectAllowed = true;

        } else if (nameInput === '') {
            return
        } else {
            window.alert('There is already a project with that name!');
        }
    }

}

export class MenuUI extends Event {

    static handleProjectsDropDown(){

        // submitting a new project automatically shows the project drop down
        // one extra step is needed in case the project drop down is already showing
        if (Settings.showProjectsDropDown && document.querySelector('ul.projects-drop-down')) {
            ElementRemover.removeProjectsDropDown();
            ElementManager.showProjectsDropDown();
            Settings.showProjectsDropDown = false;

        } else if (Settings.showProjectsDropDown) {
            ElementManager.showProjectsDropDown();
            Settings.showProjectsDropDown = false;

        } else {
            ElementRemover.removeProjectsDropDown();
            Settings.showProjectsDropDown = true;
        }
    }

    static individualProjectClick(){
        ElementManager.insertProjectToMainContent(collection.getProject(Settings.currentProject));
    }
}

export class TaskUI extends Event {

    static newTaskClick(){
        if (Settings.newTaskAllowed) {
            ElementManager.insertNewTaskForm();
            ElementManager.toggleNewTaskButton()
            Settings.newTaskAllowed = false;
        } else {
            ElementRemover.removeNewTaskForm();
            ElementManager.toggleNewTaskButton();
            Settings.newTaskAllowed = true;
        }
    }

    static submitNewTask(){
        const nameInput = document.querySelector('.task-name-input').value;
        if (nameInput != '' && ElementManager.checkForUniqueTaskName(nameInput)) {
            ElementManager.addTaskToProject();
            ElementRemover.removeNewTaskForm();
            ElementRemover.removeProjectTasks();
            ElementManager.toggleNewTaskButton();
            ElementManager.insertTasksToProjectDisplay();
            Settings.newTaskAllowed = true;
            Settings.editingTask = false;
        } else if (nameInput === '') {
            return
        } else {
            window.alert('There is already a task with that name!')
        }
    }

    static handleEditTaskClick(){
        Settings.editingTask = !Settings.editingTask;

        if (Settings.editingTask) {
            ElementRemover.removeProjectTasks();
            EditUI.insertAllTasks();
        } else {
            ElementRemover.removeProjectTasks();
            ElementManager.insertTasksToProjectDisplay();
        }

    }
}