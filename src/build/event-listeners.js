import { collection } from '../index.js';
import { Settings } from '../data/Settings.js';
import { 
    ElementManager,
    ElementRemover, } from './ElementManager.js';

export class Event {

    static preventDefault(e){
        e.preventDefault();
    }
}

export class NewProject extends Event {

    static newProjectClick(){
        if (Settings.newProjectAllowed) {
            ElementManager.insertNewProjectModal();
            Settings.newProjectAllowed = false;
        }
    }
     
    static cancelProjectClick(){
        ElementRemover.removeNewProjectModal();
        Settings.newProjectAllowed = true;
    }

    static checkForUniqueProjectName(nameInput){
        return collection.checkProjectForUniqueName(nameInput);
    }

    static submitProjectClick(){
        const nameInput = document.querySelector('input#name').value;

        if (nameInput != '' && NewProject.checkForUniqueProjectName(nameInput)) {

            ElementManager.addProjectToCollection();

            ElementRemover.removeNewProjectModal();

            if(document.querySelector('ul.projects-drop-down')){
                ElementRemover.removeProjectsDropDown();
            }
            ElementManager.showProjectsDropDown();

            ElementRemover.removeContentFromMainContent();

            ElementManager.insertProjectToMainContent(
                collection.getAllProjects()[collection.getAllProjects().length - 1]
            );

            Settings.newProjectAllowed = true;

        } else {
            
            window.alert('There is already a project with that name');
        }
    }

}

export class MenuContent extends Event {

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