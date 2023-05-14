import { collection } from '../index.js';
import { Element } from './Element.js';
import { Settings } from '../data/Settings.js';
import { Event } from './event-listeners.js';
import { 
        ProjectUI,
        MenuUI,
        TaskUI } from './event-listeners.js';


export class ElementBuilder {

    static buildProjectUIModal(){
        return new Element({
            'tagname':'div',
            'class':'new-project-modal-container',
            'children':[
                new Element({
                    'tagname':'form',
                    'class':'new-project-modal',
                    'event-listeners':{'submit':Event.preventDefault},
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
                                    'event-listeners':{'click':ProjectUI.cancelProjectClick}
                                }).build(),

                                // submit button
                                new Element({
                                    'tagname':'button',
                                    'type':'submit',
                                    'class':'submit-new-project',
                                    'text-content':'Add',
                                    'event-listeners':{'click':ProjectUI.submitProjectClick}
                                }).build(),
                            ]
                        }).build(),
                    ]
                }).build()
            ]
        }).build()
    }

    // inserts an unordered list element below the projects button in the menu
    static buildProjectsDropDownContainer(){
        return new Element(
            {
                'tagname':'ul',
                'class':'projects-drop-down',
            }
        ).build()
    }

    // adds a single project to the unordered list below the projects button
    static buildProjectInMenu(project){
        return new Element({
            'tagname':'li',
            'project-id':`${project._id}`,
            'event-listeners':{'mouseover':Settings.updateCurrentProject},
            'children':[
                new Element({
                    'tagname':'button',
                    'text-content':`${project.title}`,
                    'event-listeners':{'click':MenuUI.individualProjectClick}
                }).build(),
            ]
        }).build()
    }

    // displays project to .main-content
    static buildProjectDisplay(project){
        return new Element({
            'tagname':'div',
            'class':'project-display',
            'project-id':`${project._id}`,
            'event-listeners':{'mouseover':Settings.updateCurrentProject},
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
                            'tagname':'div',
                            'class':'display-tasks-header',
                            'children':[
                                new Element({
                                    'tagname':'h1',
                                    'text-content':'Tasks',
                                }).build(),
                                new Element({
                                    'tagname':'button',
                                    'class':'add-task',
                                    'text-content':'+',
                                    'event-listeners':{'click':TaskUI.newTaskClick},
                                }).build(),
                            ]
                        }).build(),
                        new Element({
                            'tagname':'div',
                            'class':'all-tasks-container',
                        }).build(),
                    ]
                }).build(),
            ]
        }).build()
    }

    static buildNewTaskForm(){
        return new Element({
            'tagname':'form',
            'class':'new-task-form',
            'event-listeners':{'submit':Event.preventDefault},
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
                    'event-listeners':{'click':TaskUI.submitNewTask},
                }).build(),
            ]
        }).build()
    }

    static buildProjectTask(task, priorityColor){
        return new Element({
            'tagname':'div',
            'class':'task-container',
            'content-taskid':`${task._id}`,
            'event-listeners':{'mouseover':Settings.updateCurrentTask},
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
                    'event-listeners':{'click':TaskUI.handleEditTaskClick},
                }).build(),
            ]
        }).build()
    }

    static buildEditProjectTask(task, priorityColor){
        return new Element({
            'tagname':'form',
            'class':'edit-task-container',
            'content-taskid':`${task._id}`,
            'event-listeners':{'mouseover':Settings.updateCurrentTask},
            'event-listeners':{'submit':Event.preventDefault},
            'children':[
                new Element({
                    'tagname':'div',
                    'class':'task-priority',
                    'style':{backgroundColor:`${priorityColor}`},
                }).build(),
                new Element({
                    'tagname':'input',
                    'class':'task-name-edit',
                    'value':`${task.title}`,
                }).build(),
                new Element({
                    'tagname':'div',
                    'class':'task-date',
                    'text-content':`${task.scheduled}`,
                }).build(),
                new Element({
                    'tagname':'button',
                    'class':'edit-task',
                    'text-content':'Discard',
                    'event-listeners':{'click':TaskUI.handleEditTaskClick},
                }).build(),
                new Element({
                    'tagname':'div',
                    'class':'notes-container',
                    'children':[
                        new Element({
                            'tagname':'label',
                            'for':'notes',
                            'text-content':'Notes',
                        }).build(),
                        new Element({
                            'tagname':'textarea',
                            'id':'notes',
                        }).build(),
                    ]
                }).build(),
                new Element({
                    'tagname':'label',
                    'class':'change-date-container',
                    'children':[
                        new Element({
                            'tagname':'label',
                            'text-content':'Edit Due Date',
                        }).build(),
                        new Element({
                            'tagname':'div',
                            'class':'change-date-buttons-container',
                            'children':[
                                new Element({
                                    'tagname':'button',
                                    'class':'change-date-button',
                                    'text-content':'None',
                                }).build(),
                                new Element({
                                    'tagname':'button',
                                    'class':'change-date-button',
                                    'text-content':'Today',
                                }).build(),
                                new Element({
                                    'tagname':'button',
                                    'class':'change-date-button',
                                    'text-content':'Tomorrow',
                                }).build(),
                                new Element({
                                    'tagname':'input',
                                    'type':'date',
                                }).build(),
                            ]
                        }).build(),
                    ]
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
                    'tagname':'button',
                    'class':'submit-edit-task',
                    'text-content':'Submit',
                }).build(),
            ]
        }).build()
    }
}

export class ElementRemover {
    
    static removeProjectUIModal(){
        document.querySelector('.new-project-modal-container').remove();
    }

    static removeProjectsDropDown(){
        document.querySelector('.projects-drop-down').remove();
    }

    static removeContentFromMainContent(){
        const mainContent = document.querySelector('.main-content');
        while (mainContent.firstChild){
            mainContent.removeChild(mainContent.firstChild);
        }
    }

    static removeNewTaskForm(){
        document.querySelector('.new-task-form').remove();
    }

    static removeProjectTasks(){
        const allTasksContainer = document.querySelector('.all-tasks-container');
        while (allTasksContainer.firstChild) {
            allTasksContainer.removeChild(allTasksContainer.firstChild);
        }
    }
}

export class ElementManager {
    
    static addProjectToCollection(){
        collection.addProject(
            document.querySelector('input#name').value,
            document.querySelector('textarea#desc').value
        )
    }

    static insertProjectUIModal(){
        document.querySelector('.main-content').appendChild(
            ElementBuilder.buildProjectUIModal()
        );
    }

    static showProjectsDropDown(){

        if (collection.getAllProjects().length > 0) {
            const projectsTab = document.querySelector('button.projects');

            projectsTab.insertAdjacentElement('afterend', ElementBuilder.buildProjectsDropDownContainer());
    
            this.appendAllProjectsToDropDown();
        }
    }
    
    static appendAllProjectsToDropDown(){

        for (const project of collection.getAllProjects()) {

            document.querySelector('ul.projects-drop-down').appendChild(ElementBuilder.buildProjectInMenu(project));

        }
    }

    static insertProjectToMainContent(project){
        ElementRemover.removeContentFromMainContent();
        document.querySelector('.main-content').appendChild(ElementBuilder.buildProjectDisplay(project));
    }

    static insertNewTaskForm(){
        document.querySelector('.all-tasks-container').insertAdjacentElement('afterbegin', ElementBuilder.buildNewTaskForm());
    }

    static toggleNewTaskButton(){
        const button = document.querySelector('button.add-task');

        Settings.newTaskAllowed ? changeToMinimize(button) : changeToMaximize(button);

        function changeToMinimize(){
            button.style.backgroundColor = 'var(--red)';
            button.textContent = '-';
        }

        function changeToMaximize(){
            button.style.backgroundColor = 'var(--green)';
            button.textContent = '+';
        }
    }

    static addTaskToProject(){
        const project = collection.getProject(Settings.currentProject);
        project.addTask(
            document.querySelector('.task-name-input').value,
            document.querySelector('input[type="date"]').value,
            document.querySelector('select.priority').value
        )
    }

    static checkForUniqueTaskName(nameInput){
        const project = collection.getProject(Settings.currentProject);
        return project.checkForUniqueTaskName(nameInput);
    }

    static insertTask(task, priorityColor){
        document.querySelector('.all-tasks-container').appendChild(
            ElementBuilder.buildProjectTask(task, priorityColor)
        );
    }

    static insertTasksToProjectDisplay(){

        const project = collection.getProject(Settings.currentProject);

        for (const task of project.tasks) {

            const priorityColor = ElementManager.getPriorityColor(task);

            ElementManager.insertTask(task, priorityColor);

        };
    }

    static getPriorityColor(task){
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
}

export class EditUI {

    static insertAllTasks(){

        const currentProject = collection.getProject(Settings.currentProject);
        const currentTask = currentProject.getTask(Settings.currentTask);
        const allTasksContainer = document.querySelector('.all-tasks-container');
        
        for (const task of currentProject.tasks) {

            const priorityColor = ElementManager.getPriorityColor(task);

            if (task === currentTask) {

                allTasksContainer.appendChild(
                    ElementBuilder.buildEditProjectTask(task, priorityColor)
                );

            } else {
                allTasksContainer.appendChild(
                    ElementBuilder.buildProjectTask(task, priorityColor)
                );
            }
        }
    }
}