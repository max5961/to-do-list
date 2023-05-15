export const Settings = {
    // if true --> allow the 'New Project' button to create a form to submit a new project
    newProjectAllowed : true,

    // if true --> all projects are shown in Menu > Projects drop down
    showProjectsDropDown : false,

    // if true --> new task form is displayed and red minimize button takes place of the add task button
    newTaskAllowed : true,

    // the current task the mouse is hovering over
    currentTask : undefined,

    // the current project in the .main-content the mouse is hovering over
    currentProject : undefined,

    currentEditTask : undefined,

    editingTask : false,

    // callback to be used with the 'mouseover' event
    updateCurrentTask(e){
        Settings.currentTask = Settings.checkAllNodesForID(e.target,'content-taskid');
    },

    // callback to be used with the 'mouseover' event
    updateCurrentProject(e){
        Settings.currentProject = Settings.checkAllNodesForID(e.target, 'project-id');
    },

    checkAllNodesForID(element, attribute){
        let id = element.getAttribute(attribute);

        if (id === undefined || id === null) {
            return Settings.checkAllNodesForID(element.parentNode, attribute);
        } else {
            return id;
        }
    },
}