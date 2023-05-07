import { Element } from "../Classes/Element.js";
import { Collection } from "../Classes/Collection.js";
import { collection } from '../index.js';
import { UserSettings } from "../Classes/UserSettings.js";



// mobile drop down --> for hamburger icon in .mobile-menu
export function handleMobileDropDown(){
    const mobileMenu = document.querySelector('.mobile-menu');

    // if mobile-menu has only 1 child node, create the drop down menu
    if(!mobileMenu.childNodes[1]){

        createMobileDropDown();

    } 

    // if mobile-menu has more than 1 child node, remove the drop down menu
    else if (mobileMenu.childNodes[1]){

        while(mobileMenu.childNodes[1]){
            mobileMenu.removeChild(mobileMenu.childNodes[1])
        }
    }
}

function createMobileDropDown(){
    const dropDown =
        new Element({
            'tagname':'div',
            'class':'mobile-drop-down-container',
            'children':[
                new Element({
                    'tagname':'button',
                    'class':'all-projects-mobile',
                    'text-content':'All projects',
                }).build(),
                new Element({
                    'tagname':'button',
                    'class':'all-tasks-mobile',
                    'text-content':'All tasks',
                }).build(),
                new Element({
                    'tagname':'button',
                    'class':'scheduled-mobile',
                    'text-content':'Scheduled',
                }).build(),
                new Element({
                    'tagname':'button',
                    'class':'scheduled-today-mobile',
                    'text-content':'Scheduled today',
                }).build(),
            ]
        }).build();

    const mobileMenu = document.querySelector('.mobile-menu');
    
    mobileMenu.appendChild(dropDown);
}

// 'New Project' button
export function newProject(){

    if (UserSettings.newProject === true){
        buildNewProjectModal();
    }

    // Set to false so that a new project form will not be generated until the current is submitted or canceled
    UserSettings.newProject = false;
}

function removeToDoContent(){
    
    const toDoContent = document.querySelector('.main-content');

    while (toDoContent.firstChild) {
        toDoContent.removeChild(toDoContent.firstChild);
    }
    
}

function buildNewProjectModal(){

    const toDoContent = document.querySelector('.main-content');

    toDoContent.appendChild(
        new Element({
            'tagname':'form',
            'class':'new-project-form',
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
    )
}

function preventDefault(e){
    e.preventDefault();
}

// on cancel button click
function cancelNewProject(){
    removeModal();
    UserSettings.newProject = true;
}

// on submit button click
function submitProject(){
    
    const projectName = document.querySelector('input#name').value;
    const projectDesc = document.querySelector('textarea#desc').value;

    if (projectName != '') {
        collection.addProject(projectName, projectDesc);

        // removes the form from the main-content div
        removeModal();

        // allow the New Project button to generate a new form
        UserSettings.newProject = true;

        // add the Project to the Menu Projects if drop down true
        if(UserSettings.allProjects){
            removeProjectsDropDown();
            buildProjectsDropDown();
        }
    }
}


function removeModal(){
    const modal = document.querySelector('.new-project-form');
    modal.remove();
}

// Menu --> 'All Projects' button
export function handleAllProjectsClick(){

    const projects = collection.getAllProjects();

    // reverse UserSettings.allProjects value
    if(projects.length > 0){
        UserSettings.allProjects = !UserSettings.allProjects;
    }

    UserSettings.allProjects ? buildProjectsDropDown() : removeProjectsDropDown();
    
}

function buildProjectsDropDown(){
    // find projects button and append a new ul element
    const projectsButton = document.querySelector('.projects');
    projectsButton.insertAdjacentElement('afterend',
        new Element(
            {
                'tagname':'ul',
                'class':'projects-drop-down',
            }
        ).build()
    );
    
    // create a list of all Projects in the collection
    const projects = collection.getAllProjects();

    // add each Project as a list item
    addProjectsToDropDown(projects);

    function addProjectsToDropDown(projects){

        const unorderedList = document.querySelector('ul.projects-drop-down');

        for(const project of projects){
            unorderedList.appendChild(
                new Element({
                    'tagname':'li',
                    'children':[
                        new Element({
                            'tagname':'button',
                            'text-content':`${project.title}`,
                            'projectID':`${project._id}`,
                            'event-listeners':{'click':handleProjectClick}
                        }).build(),
                    ]
                }).build()
            )
        }
    } 
}

function removeProjectsDropDown(){

    const projectsDropDown = document.querySelector('ul.projects-drop-down');

    if(projectsDropDown){
        projectsDropDown.remove();
    }
}

// Menu --> 'Click on individual project'
function handleProjectClick(e){
    removeToDoContent();
    buildProjectDisplay(e);
}

function buildProjectDisplay(e){

    const projectID = e.target.getAttribute('projectID');
    const project = collection.findProject(projectID);
    const toDoContent = document.querySelector('.main-content');

    toDoContent.appendChild(
        new Element({
            'tagname':'div',
            'class':'project-display',
            'projectID':`${projectID}`,
            'children':[
                new Element({
                    'tagname':'h1',
                    'class':'project-display-title',
                    'text-content':`${project.title}`,
                }).build(),
                new Element({
                    'tagname':'div',
                    'class':'project-description-container',
                    'children':[
                        new Element({
                            'tagname':'div',
                            'class':'project-description-title',
                            'text-content':'Description',
                        }).build(),
                        new Element({
                            'tagname':'div',
                            'class':'project-description-content',
                            'text-content':`${project.desc}`
                        }).build()
                    ]
                }).build(),
                new Element({
                    'tagname':'div',
                    'class':'project-tasks-content',
                    'children':[
                        new Element({
                            'tagname':'h1',
                            'text-content':'Tasks',
                        }).build(),
                        new Element({
                            'tagname':'button',
                            'class':'add-task',
                            'text-content':'+',
                            'event-listeners':{'click':buildNewTaskForm},
                        }).build(),
                    ]
                }).build(),
            ]
        }).build()
    );
}

// Project display --> add task button, create form
function buildNewTaskForm(){

    const taskContent = document.querySelector('.project-tasks-content');

    taskContent.appendChild(
        new Element({
            'tagname':'form',
            'class':'new-task-form',
            'children':[
                new Element({
                    'tagname':'input',
                    'placeholder':'Task name',
                    'class':'task-name-input',
                }).build(),
                new Element({
                    'tagname':'input',
                    'placeholder':'Description',
                    'class':'task-desc-input',
                }).build(),
                new Element({
                    'tagname':'div',
                    'class':'priority-container',
                    'children':[
                        new Element({
                            'tagname':'label',
                            'text-content':'Priority',
                        }).build(),
                        new Element({
                            'tagname':'select',
                            'children':[
                                new Element({
                                    'tagname':'option',
                                    'text-content':'Low',
                                }).build(),
                                new Element({
                                    'tagname':'option',
                                    'text-content':'Medium',
                                }).build(),
                                new Element({
                                    'tagname':'option',
                                    'text-content':'High',
                                }).build(),
                            ]
                        }).build(),
                    ]
                }).build(),
                new Element({
                    'tagname':'div',
                    'class':'date-container',
                    'children':[
                        new Element({
                            'tagname':'label',
                            'text-content':'Due date',
                        }).build(),
                        new Element({
                            'tagname':'input',
                            'type':'date',
                        }).build(),
                    ]
                }).build(),
            ]
        }).build()
    );
}

