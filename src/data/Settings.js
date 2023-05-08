export const Settings = {
    // if true --> allow the 'New Project' button to create a form to submit a new project
    newProject : true,

    // if true --> all projects are shown in Menu > Projects drop down
    allProjects : true,

    // if true --> new task form is displayed and red minimize button takes place of the add task button
    newTask : true,

    // the current task the mouse is hovering over
    currentTask : undefined,

    // the current project in the .main-content the mouse is hovering over
    currentProject : undefined,

    // callback to be used with the 'mouseover' event
    updateCurrentTask(e){
        this.currentTask = Settings.checkAllNodesForID(e.target,'content-taskid');
        console.log(this.currentTask);
    },

    // callback to be used with the 'mouseover' event
    updateCurrentProject(e){
        this.currentProject = Settings.checkAllNodesForID(e.target, 'content-projectid');

        console.log(this.currentProject);
    },

    checkAllNodesForID(element, attribute){
        let id = element.getAttribute(attribute);

        if (id === undefined || id === null) {
            return Settings.checkAllNodesForID(element.parentNode, attribute);
        } else {
            return id;
        }
    }
}