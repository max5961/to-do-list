import { Settings } from "../../data/Settings";
import { collection } from "../../index.js";

class NewProject {
    constructor(){}

    static handleNewProjectClick(){

        if (Settings.newProject === true){
            buildNewProjectModal();
        }
    
        // new project form will not be generated until set to true again
        Settings.newProject = false;
    }

    static buildNewProjectModal(){
        const toDoContent = document.querySelector('.main-content');

        toDoContent.appendChild(
            new Element({
                'tagname':'div',
                'class':'new-project-modal-container',
                'children':[
                    new Element({
                        'tagname':'form',
                        'class':'new-project-modal',
                        'event-listeners':{'submit':preventDefault},
                        'children':[
            
                            // container for Project name input/label
                            new Element({
                                'tagname':'div',
                                'class':'input-container',
                                'children':[
                                    new Element({
                                        'tagname':'label',
                                        'class':'project-title',
                                        'for':'name',
                                        'text-content':'Project Name',
                                    }).build(),
                                    new Element({
                                        'tagname':'input',
                                        'type':'text',
                                        'id':'name',
                                        'name':'name',
                                        'required':'true',
                                    }).build(),
                                ]
                            }).build(),
            
                            // container for Project desc input/label
                            new Element({
                                'tagname':'div',
                                'class':'input-container',
                                'children':[
                                    new Element({
                                        'tagname':'label',
                                        'class':'project-desc',
                                        'for':'desc',
                                        'text-content':'Description',
                                    }).build(),
                                    new Element({
                                        'tagname':'textarea',
                                        'id':'desc',
                                        'name':'desc',
                                    }).build(),
                                ]
                            }).build(),
                            new Element({
                                'tagname':'div',
                                'class':'form-buttons-container',
                                'children':[

                                    // cancel button
                                    new Element({
                                        'tagname':'button',
                                        'type':'button',
                                        'class':'cancel-new-project',
                                        'text-content':'cancel',
                                        'event-listeners':{'click':cancelNewProject}
                                    }).build(),

                                    // submit button
                                    new Element({
                                        'tagname':'button',
                                        'type':'submit',
                                        'class':'submit-new-project',
                                        'text-content':'Add',
                                        'event-listeners':{'click':submitProject}
                                    }).build(),
                                ]
                            }).build(),
                        ]
                    }).build()
                ]
            }).build()
        )
    }

    static removeNewProjectModal(){
        const modal = document.querySelector('.new-project-modal-container');
        modal.remove();
    }

    // event listeners for buildNewProjectModal()
    static preventDefault(e){
        e.preventDefault();
    }

    static cancelNewProject(){
        this.removeNewProjectModal();
        Settings.newProject = true;
    }

    static handleSubmitClick(){
        const projectName = document.querySelector('input#name').value;
        const projectDesc = document.querySelector('textarea#desc').value;

        if (projectName != '') {
            collection.addProject(projectName, projectDesc);

            this.removeNewProjectModal();

            // all the New Project button to generate a new form
            Settings.newProject = true;

            if(Settings.allProjects) {
                Menu.removeProjectsDropDown();
                Menu.buildProjectsDropDown();
            }

        }
    }
}