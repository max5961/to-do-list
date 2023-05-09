class Menu {
    constructor(){}

    static removeProjectsDropDown(){

        const projectsDropDown = document.querySelector('ul.projects-drop-down');
    
        if(projectsDropDown){
            projectsDropDown.remove();
        }
    }

    static buildProjectsDropDown(){
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

}