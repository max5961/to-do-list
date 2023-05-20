import { collection } from '../index.js';
import { Settings } from '../data/Settings.js';
import { Storage } from '../data/Storage.js';
import { 
    ElementBuilder,
    ElementManager,
    ElementRemover,
    EditUI,
    TasksDisplay,
    Delete, } from './ElementManager.js';

export class Event {

    static preventDefault(e){
        e.preventDefault();
    }

    static stopPropagation(e){
        e.stopPropagation();
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

        Storage.pushToLocalStorage(collection);
    }

    static handleSubmitEdit(){
        const projectIndex = collection.findProject(Settings.currentProject);
        collection.projects[projectIndex].title = document.querySelector('input.project-display-title').value;
        collection.projects[projectIndex].desc = document.querySelector('textarea.project-description').value;

        ElementRemover.removeContentFromMainContent();
        ElementManager.insertProjectToMainContent(collection.getProject(Settings.currentProject));
        ElementManager.insertTasksToProjectDisplay();

        Settings.showProjectsDropDown = true;
        MenuUI.handleProjectsDropDown();

        Storage.pushToLocalStorage(collection);

    }

    static handleCancelEdit(){
        ElementRemover.removeContentFromMainContent();
        ElementManager.insertProjectToMainContent(collection.getProject(Settings.currentProject));
        ElementManager.insertTasksToProjectDisplay();
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
        ElementManager.insertTasksToProjectDisplay();
        Settings.currentView = undefined;
    }

    static scheduledProjectsClick(){

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
            Storage.pushToLocalStorage(collection);
        } else if (nameInput === '') {
            return
        } else {
            window.alert('There is already a task with that name!')
        }
    }

    static createEditTaskForm(){
        Settings.currentEditTask = Settings.currentTask;
        ElementRemover.removeProjectTasks();
        if (Settings.currentView === undefined) {
            EditUI.insertAllTasks(collection.getProject(Settings.currentProject).tasks);
        } else if (Settings.currentView === 'scheduled') {
            EditUI.insertAllTasks(collection.getAllScheduledTasks());
        } else if (Settings.currentView === 'scheduled-today') {
            EditUI.insertAllTasks(collection.getAllScheduledTodayTasks());
        } else if (Settings.currentView === 'all') {
            EditUI.insertAllTasks(collection.getAllTasks());
        }
    }

    static minimizeEditTaskForm(){
        Settings.currentEditTask = undefined
        ElementRemover.removeProjectTasks();
        ElementManager.insertTasksToProjectDisplay();
    }

    static handleEditDate(e){
        EditUI.updateDateValue(e);
    }

    static handleEditPriority(){
        EditUI.updatePriority();
    }

    static handleSubmitEditedTaskClick(){
        
        const projectID = Settings.currentProject;
        const editedTask = EditUI.getEditedTask();

        if (document.querySelector('.task-name-edit').value != '') {
            collection.replaceTaskInProject(projectID, editedTask)
            Storage.pushToLocalStorage(collection);
            ElementRemover.removeProjectTasks();

            if (Settings.currentView === 'scheduled') {
                TasksDisplay.displayTasksDisplay('scheduled',collection.getAllScheduledTasks());
            } else if (Settings.currentView === 'scheduled-today') {
                TasksDisplay.displayTasksDisplay('scheduled-today',collection.getAllScheduledTodayTasks())
            } else {
                ElementManager.insertTasksToProjectDisplay();
            }
        }
    }

    static handleEditProjectClick(){
        const project = collection.getProject(Settings.currentProject);
        EditUI.changeProjectDisplayToEdit(project);
    }
}

export class TasksDisplayEvent extends Event {

    static handleScheduledClick(){
        TasksDisplay.displayTasksDisplay('scheduled',collection.getAllScheduledTasks());
    }

    static handleScheduledTodayClick(){
        TasksDisplay.displayTasksDisplay('scheduled-today',collection.getAllScheduledTodayTasks());
    }

    static handleAllTasksClick(){
        TasksDisplay.displayTasksDisplay('all',collection.getAllTasks());
    }
}

export class DeleteEvent extends Event {

    static deleteTask(){
        Delete.deleteTask();
        Storage.pushToLocalStorage(collection);
        ElementRemover.removeProjectTasks();

        if (Settings.currentView === undefined) {
            ElementManager.insertTasksToProjectDisplay();
        } else if (Settings.currentView === 'scheduled') {
            TasksDisplay.displayTasksDisplay(Settings.currentView,collection.getAllScheduledTasks());
        } else if (Settings.currentView === 'scheduled-today') {
            TasksDisplay.displayTasksDisplay(Settings.currentView, collection.getAllScheduledTodayTasks());
        } else if (Settings.currentView === 'all') {
            TasksDisplay.displayTasksDisplay(Settings.currentView, collection.getAllTasks());
        }
    }

    static deleteProject(){
        Delete.deleteProject();
        Storage.pushToLocalStorage(collection);
        ElementRemover.removeContentFromMainContent();
        Settings.showProjectsDropDown = true;
        MenuUI.handleProjectsDropDown();
    }
}