import { Element } from "../Classes/Element.js";
import { Collection } from "../Classes/Collection.js";
import { collection } from '../index.js';
import { Settings } from "../Classes/Settings.js";



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

    if (Settings.newProject === true){
        buildNewProjectModal();
    }

    // new project form will not be generated until set to true again
    Settings.newProject = false;
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

function preventDefault(e){
    e.preventDefault();
}

// on cancel button click
function cancelNewProject(){
    removeModal();
    Settings.newProject = true;
}

// on submit button click
function submitProject(){
    
    const projectName = document.querySelector('input#name').value;
    const projectDesc = document.querySelector('textarea#desc').value;

    if (projectName != '') {
        collection.addProject(projectName, projectDesc);

        removeModal();

        // allow the New Project button to generate a new form
        Settings.newProject = true;

        // add the Project to the Menu Projects if drop down true
        if(Settings.allProjects){
            removeProjectsDropDown();
            buildProjectsDropDown();
        }
    }
}

function removeModal(){
    const modal = document.querySelector('.new-project-modal-container');
    modal.remove();
}

// Menu --> 'All Projects' button
export function handleAllProjectsClick(){

    const projects = collection.getAllProjects();

    // reverse Settings.allProjects value
    if(projects.length > 0){

        Settings.allProjects = !Settings.allProjects;

        Settings.allProjects ? buildProjectsDropDown() : removeProjectsDropDown();

    }   
    
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
    buildProjectTasks();
}

function buildProjectDisplay(e){

    const projectID = e.target.getAttribute('projectID');
    const project = collection.findProject(projectID);
    const toDoContent = document.querySelector('.main-content');

    toDoContent.appendChild(
        new Element({
            'tagname':'div',
            'class':'project-display',
            'content-projectID':`${projectID}`,
            'children':[
                new Element({
                    'tagname':'h1',
                    'class':'project-display-title',
                    'text-content':`${project.title}`,
                }).build(),
                new Element({
                    'tagname':'div',
                    'class':'project-description',
                    'text-content':`${project.desc}`
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
                            'event-listeners':{'click':handleNewTaskClick},
                        }).build(),
                        new Element({
                            'tagname':'div',
                            'class':'all-tasks-container',
                        }).build(),
                    ]
                }).build(),
            ]
        }).build()
    );
}

// Project display --> add task button --> create form
function handleNewTaskClick(){

    Settings.newTask = !Settings.newTask;
    
    changeNewTaskButton();

    !Settings.newTask ? buildNewTaskForm() : removeNewTaskForm();
}

function changeNewTaskButton(){

    const button = document.querySelector('button.add-task');
    
    if (!Settings.newTask) {
        button.style.backgroundColor = 'var(--red)';
        button.style.color = 'var(--light1)';
        button.textContent = '-';
    } else {
        button.style.backgroundColor = 'var(--green)';
        button.style.color = 'black';
        button.textContent = '+';
    }
}

function buildNewTaskForm(){

    const button = document.querySelector('button.add-task');

    button.insertAdjacentElement('afterend',
        new Element({
            'tagname':'form',
            'class':'new-task-form',
            'event-listeners':{'submit':preventDefault},
            'children':[
                new Element({
                    'tagname':'input',
                    'placeholder':'Task',
                    'required':'true',
                    'class':'task-name-input',
                }).build(),
                new Element({
                    'tagname':'div',
                    'class':'priority-container',
                    'children':[
                        new Element({
                            'tagname':'label',
                            'text-content':'Priority: ',
                        }).build(),
                        new Element({
                            'tagname':'select',
                            'class':'priority',
                            'children':[
                                new Element({
                                    'tagname':'option',
                                    'class':'task-none',
                                    'value':'unset',
                                    'text-content':'none',
                                }).build(),
                                new Element({
                                    'tagname':'option',
                                    'class':'task-low',
                                    'value':'low',
                                    'text-content':'!',
                                }).build(),
                                new Element({
                                    'tagname':'option',
                                    'class':'task-medium',
                                    'value':'medium',
                                    'text-content':'!!',
                                }).build(),
                                new Element({
                                    'tagname':'option',
                                    'class':'task-high',
                                    'value':'high',
                                    'text-content':'!!!',
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
                            'text-content':'Due date: ',
                        }).build(),
                        new Element({
                            'tagname':'input',
                            'type':'date',
                        }).build(),
                    ]
                }).build(),
                new Element({
                    'tagname':'button',
                    'type':'submit',
                    'class':'submit-task',
                    'text-content':'Submit',
                    'event-listeners':{'click':submitTask},
                }).build(),
            ]
        }).build()
    );
}

function removeNewTaskForm(){
    const form = document.querySelector('form.new-task-form');
    form.remove();
}

// Project display --> submit new task button
function submitTask(e){

    if (document.querySelector('.task-name-input').value != ''){
        
        Settings.newTask = true;

        changeNewTaskButton();
    
        addTaskToStorage();
    
        removeNewTaskForm();
    
        removeProjectTasks();
    
        buildProjectTasks();
    }
}

function getProject(){
    const projectDisplay = document.querySelector('.project-display');
    const projectID = projectDisplay.getAttribute('content-projectid');
    return collection.findProject(projectID);
}

function addTaskToStorage(){
    
    const project = getProject();

    // (title, desc, scheduled, priority)
    project.addTask(
        document.querySelector('.task-name-input').value,
        undefined,
        document.querySelector('input[type="date"]').value,
        document.querySelector('select.priority').value
    );

    console.log(project);
}

function buildProjectTasks(){
    
    const project = getProject();

    for (const task of project.tasks) {
        buildTask(task);
    }
    
    function buildTask(task){

        const allTasksContainer = document.querySelector('.all-tasks-container');

        const priorityColor = getPriorityColor(task);

        allTasksContainer.appendChild(
            new Element({
                'tagname':'div',
                'class':'task-container',
                'content-taskid':`${task._id}`,
                'event-listeners':{'mouseover':updateCurrentTask},
                'children':[
                    new Element({
                        'tagname':'div',
                        'class':'task-priority',
                        'style':{backgroundColor:`${priorityColor}`},
                    }).build(),
                    new Element({
                        'tagname':'div',
                        'class':'task-name',
                        'text-content':`${task.title}`,
                    }).build(),
                    new Element({
                        'tagname':'div',
                        'class':'task-date',
                        'text-content':`${task.scheduled}`,
                    }).build(),
                    new Element({
                        'tagname':'button',
                        'class':'edit-task',
                        'text-content':'Edit',
                    }).build(),
                ]
            }).build()
        );
    }
}

function removeProjectTasks(){
    
    const allTasksContainer = document.querySelector('.all-tasks-container');

    while (allTasksContainer.firstChild) {
        allTasksContainer.removeChild(allTasksContainer.firstChild);
    }

}
    
function getPriorityColor(task){
    if (task.priority === 'unset') {
        return 'var(--priority-unset)';
    } else if (task.priority === 'low') {
        return 'var(--priority-green)';
    } else if (task.priority === 'medium') {
        return 'var(--priority-yellow)';
    } else if (task.priority === 'high') {
        return 'var(--priority-red)';
    }
}

// Project display --> edit task button
function updateCurrentTask(e){

    let id = e.target.getAttribute('content-taskid');

    if (id === null){
        const parent = e.target.parentNode;
        id = parent.getAttribute('content-taskid');
    }

    Settings.currentTask = id;

    console.log(Settings.currentElement);
}

function getCurrentTask(){
    return Settings.currentTask;
}

