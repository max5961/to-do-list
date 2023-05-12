import { Element } from './Element.js';
import { Event } from './event-listeners.js';
import { Settings } from '../data/Settings.js';
import { collection } from '../index.js';

export class ElementBuilder {

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
                                        'event-listeners':{'click':Event.cancelProjectClick}
                                    }).build(),

                                    // submit button
                                    new Element({
                                        'tagname':'button',
                                        'type':'submit',
                                        'class':'submit-new-project',
                                        'text-content':'Add',
                                        'event-listeners':{'click':Event.submitProjectClick}
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

    // inserts an unordered list element below the projects button in the menu
    static buildProjectsDropDown(){

        const projectsButton = document.querySelector('.projects');
        projectsButton.insertAdjacentElement('afterend',
            new Element(
                {
                    'tagname':'ul',
                    'class':'projects-drop-down',
                }
            ).build()
        );
    }

    // adds a single project to the unordered list below the projects button
    static addProjectsToDropDown(){
        const unorderedList = document.querySelector('ul.projects-drop-down');

        const projects = collection.getAllProjects();

        for (const project of projects) {
            insertProjectToDropDown(project);
        }

        function insertProjectToDropDown(project){
            unorderedList.appendChild(
                new Element({
                    'tagname':'li',
                    'project-id':`${project._id}`,
                    'event-listeners':{'mouseover':Settings.updateCurrentProject},
                    'children':[
                        new Element({
                            'tagname':'button',
                            'text-content':`${project.title}`,
                            'event-listeners':{'click':Event.menuIndividualProjectClick}
                        }).build(),
                    ]
                }).build()
            )
        }
    }

    static removeProjectsDropDown(){
        const projectsDropDown = document.querySelector('ul.projects-drop-down');

        if(projectsDropDown){
            projectsDropDown.remove();
        }
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
                                    'event-listeners':{'click':Event.newTaskClick},
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

    // can be used as removeProjectDisplay()
    static removeContent(){
        const toDoContent = document.querySelector('.main-content');

        while (toDoContent.firstChild) {
            toDoContent.removeChild(toDoContent.firstChild);
        }
        
    }

    static buildNewTaskForm(){
        const container = document.querySelector('.display-tasks-header');

        container.insertAdjacentElement('afterend',
            new Element({
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
                        'event-listeners':{'click':Event.submitTaskClick},
                    }).build(),
                ]
            }).build()
        );
    }

    static removeNewTaskForm(){
        const form = document.querySelector('form.new-task-form');
        form.remove();
    }

    static buildProjectTask(task){
        const allTasksContainer = document.querySelector('.all-tasks-container');

        const priorityColor = getPriorityColor(task);

        allTasksContainer.appendChild(
            new Element({
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
                    }).build(),
                ]
            }).build()
        );

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
    }

    static buildAllProjectTasks(project){
        
        for (const task of project.tasks) {
            ElementBuilder.buildProjectTask(task);
        }
    }

    static removeProjectTasks(){
        const allTasksContainer = document.querySelector('.all-tasks-container');

        while (allTasksContainer.firstChild) {
            allTasksContainer.removeChild(allTasksContainer.firstChild);
        }
    }

    static changeNewTaskButton(){
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

    static addTaskToProjectData(){

        const project = collection.findProject(Settings.currentProject);

        project.addTask(
            document.querySelector('.task-name-input').value,
            undefined,
            document.querySelector('input[type="date"]').value,
            document.querySelector('select.priority').value
        )

    }
}