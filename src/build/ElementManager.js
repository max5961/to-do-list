import { add, format } from 'date-fns';
import { collection } from '../index.js';
import { Element } from './Element.js';
import { Settings } from '../data/Settings.js';
import { Event } from './event-listeners.js';
import { Collection } from '../data/Collection.js';
import { 
        ProjectUI,
        MenuUI,
        TaskUI,
        ScheduledTasksEvent } from './event-listeners.js';

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
                    'tagname':'button',
                    'class':'edit-project',
                    'text-content':'Edit',
                    'event-listeners':{'click':TaskUI.handleEditProjectClick},
                }).build(),
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
                    'event-listeners':{'click':TaskUI.createEditTaskForm},
                }).build(),
            ]
        }).build()
    }

    static buildEditProjectTask(task, priorityColor){
        return new Element({
            'tagname':'form',
            'class':'edit-task-container',
            'content-taskid':`${task._id}`,
            'event-listeners':{'pointerover':Settings.updateCurrentTask},
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
                    'required':'true',
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
                    'event-listeners':{'click':TaskUI.minimizeEditTaskForm},
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
                                    'class':'change-date-button-none',
                                    'event-listeners':{'click':TaskUI.handleEditDate},
                                    'text-content':'None',
                                }).build(),
                                new Element({
                                    'tagname':'button',
                                    'class':'change-date-button-today',
                                    'event-listeners':{'click':TaskUI.handleEditDate},
                                    'text-content':'Today',
                                }).build(),
                                new Element({
                                    'tagname':'button',
                                    'class':'change-date-button-tomorrow',
                                    'event-listeners':{'click':TaskUI.handleEditDate},
                                    'text-content':'Tomorrow',
                                }).build(),
                                new Element({
                                    'tagname':'input',
                                    'class':'change-date-input',
                                    'event-listeners':{'input':TaskUI.handleEditDate},
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
                            'event-listeners':{'change':TaskUI.handleEditPriority},
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
                    'event-listeners':{'click':TaskUI.handleSubmitEditedTaskClick},
                }).build(),
            ]
        }).build()
    }

    static buildEditProjectName(project){
        return new Element({
            'tagname':'div',
            'class':'project-display-title-container',
            'value':`${project.title}`,
            'children':[
                new Element({
                    'tagname':'label',
                    'text-content':'Project Name',
                }).build(),
                new Element({
                    'tagname':'input',
                    'class':'project-display-title',
                    'value':`${project.title}`,
                }).build(),
            ]
        }).build();
    }

    static buildEditProjectDesc(project){
        return new Element({
            'tagname':'div',
            'class':'project-description-container',
            'children':[
                new Element({
                    'tagname':'label',
                    'text-content':'Project Description',
                }).build(),
                new Element({
                    'tagname':'textarea',
                    'class':'project-description',
                    'text-content':`${project.desc}`,
                }).build()
            ]
        }).build();
    }

    static buildEditProjectButtons(){
        return new Element({
            'tagname':'div',
            'class':'edit-project-buttons-container',
            'children':[
                new Element({
                    'tagname':'button',
                    'text-content':'Discard',
                    'class':'cancel-project-changes',
                    'event-listeners':{'click':ProjectUI.handleCancelEdit}
                }).build(),
                new Element({
                    'tagname':'button',
                    'class':'submit-project-changes',
                    'text-content':'Submit',
                    'event-listeners':{'click':ProjectUI.handleSubmitEdit}
                }).build(),
            ]
        }).build();
    }

    static buildAllTasksDisplay(allTasksType){
        let h1

        if (allTasksType === 'scheduled') {
            h1 = 'Scheduled Tasks';

        } else if (allTasksType === 'scheduled-today') {
            h1 = 'Tasks Scheduled Today';
        } else if (allTasksType === 'all') {
            h1 = 'All Tasks';
        }

        return new Element({
            'tagname':'div',
            'class':'display-scheduled-tasks',
            'children':[
                new Element({
                    'tagname':'div',
                    'class':'tasks-header-container',
                    'children':[
                        new Element({
                            'tagname':'h1',
                            'class':'all-tasks-title',
                            'text-content':`${h1}`,
                        }).build(),
                    ]
                }).build(),
                new Element({
                    'tagname':'div',
                    'class':'all-tasks-container',
                }).build(),
            ]
        }).build();
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
        const projectIndex = collection.findProject(Settings.currentProject);
        collection.projects[projectIndex].addTask(
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
    
    // inserts all tasks but the current task being edited is inserted with a form instead
    static insertAllTasks(tasks){

        const currentTask = collection.findTask(Settings.currentTask);
        const allTasksContainer = document.querySelector('.all-tasks-container');
        
        for (const task of tasks) {

            const priorityColor = ElementManager.getPriorityColor(task);

            if (task === currentTask) {

                allTasksContainer.appendChild(
                    ElementBuilder.buildEditProjectTask(task, priorityColor)
                );

                EditUI.setValues(task);

            } else {
                allTasksContainer.appendChild(
                    ElementBuilder.buildProjectTask(task, priorityColor)
                );
            }
        }
    }

    static setValues(task){
        const select = document.querySelector('select.priority');
        select.value = task.priority;

        const date = document.querySelector('.change-date-input');
        date.value = task.scheduled;

        const notes = document.querySelector('textarea#notes');
        notes.value = task.desc;
    }

    static updateDateValue(e){
        const none = document.querySelector('.change-date-button-none');
        const today = document.querySelector('.change-date-button-today');
        const tomorrow = document.querySelector('.change-date-button-tomorrow');
        const input = document.querySelector('.change-date-input');

        const dateToday = format(new Date(), 'yyyy-MM-dd');
        const dateTomorrow = format(add(new Date(), {days: 1}), 'yyyy-MM-dd');

        if (e.target === none) {
            EditUI.toggleDateButtons(e,none,today,tomorrow,input);
            input.value = null;
        } else if (e.target === today) {
            EditUI.toggleDateButtons(e,none,today,tomorrow,input);
            input.value = dateToday;
        } else if (e.target === tomorrow) {
            EditUI.toggleDateButtons(e,none,today,tomorrow,input);
            input.value = dateTomorrow;
        } else if (e.target === input) {
            EditUI.toggleDateButtons(e,none,today,tomorrow,input);
        }

    }

    static toggleDateButtons(e, none=undefined, today=undefined,tomorrow=undefined,input=undefined){
        const color = 'var(--light2)';
        const buttons = [none,today,tomorrow];

        if (e.target === none) {
            EditUI.resetButtons(buttons);
            none.style.backgroundColor = color;
        } else if (e.target === today) {
            EditUI.resetButtons(buttons);
            today.style.backgroundColor = color;
        } else if (e.target === tomorrow) {
            EditUI.resetButtons(buttons);
            tomorrow.style.backgroundColor = color;
        } else if (e.target === input) {
            EditUI.resetButtons(buttons);
        }
    }

    static resetButtons(buttons){
        buttons.forEach(button => button.style.backgroundColor = 'var(--light1');
    }

    static updatePriority(){
        const select = document.querySelector('select.priority');
        const taskUI = document.querySelector(`[content-taskid=${Settings.currentEditTask}]`);
        const priorityDiv = getPriorityDiv(taskUI);


        if (select.value === 'unset') {
            priorityDiv.style.backgroundColor = 'var(--priority-unset)';
        } else if (select.value === 'low') {
            priorityDiv.style.backgroundColor = 'var(--priority-green)';
        } else if (select.value === 'medium') {
            priorityDiv.style.backgroundColor = 'var(--priority-yellow)';
        } else if (select.value === 'high') {
            priorityDiv.style.backgroundColor = 'var(--priority-red)';
        }

        function getPriorityDiv(taskUI){
            for (const child of taskUI.childNodes) {
                if (child.className === 'task-priority') {
                    return child;
                }
            }
        }
    }

    static getEditedTask(){
        const editedTask = collection.getProject(Settings.currentProject).getTask(Settings.currentEditTask);

        editedTask.title = document.querySelector('.task-name-edit').value;
        editedTask.scheduled = document.querySelector('.change-date-input').value;
        editedTask.priority = document.querySelector('select.priority').value;
        editedTask.desc = document.querySelector('textarea#notes').value;

        return editedTask;
    }

    static changeProjectDisplayToEdit(project){
        const h1 = document.querySelector('h1.project-display-title');
        const desc = document.querySelector('.project-description');
        const editProjectButton = document.querySelector('button.edit-project');
        h1.remove();
        desc.remove();
        editProjectButton.remove();

        const projectContainer = document.querySelector('.project-display');
        const controlButtons = ElementBuilder.buildEditProjectButtons();
        const titleInput = ElementBuilder.buildEditProjectName(project);
        const descTextarea = ElementBuilder.buildEditProjectDesc(project);

        projectContainer.insertAdjacentElement('afterbegin',descTextarea);
        projectContainer.insertAdjacentElement('afterbegin',titleInput);
        projectContainer.insertAdjacentElement('afterbegin',controlButtons);
        
    }
}

export class ScheduledTasks {
    
    static insertScheduledTasksContainer(scheduledType){
        document.querySelector('.main-content').appendChild(
            ElementBuilder.buildAllTasksDisplay(scheduledType)
        );
    }

    static insertTasksToContainer(allTasks){

        const container = document.querySelector('.all-tasks-container');

        for (const task of allTasks){

            const priorityColor = ElementManager.getPriorityColor(task);

            container.appendChild(ElementBuilder.buildProjectTask(task, priorityColor));

        }
    }

    // scheduledType parameter should be either 'scheduled' or 'scheduled-today'
    static displayScheduledTasks(scheduledType, tasks){
        ElementRemover.removeContentFromMainContent();
        ScheduledTasks.insertScheduledTasksContainer(scheduledType);
        ScheduledTasks.insertTasksToContainer(tasks);
        Settings.currentScheduled = scheduledType;
    }

    static getOrderedTasksArray(selectedValue){

        if (selectedValue === 'order-name-asc') {
            return Collection.sortAscending(collection.getAllTasks());
        } 

        else if (selectedValue === 'order-name-desc') {
            return Collection.sortDescending(collection.getAllTasks());
        }
    }
}