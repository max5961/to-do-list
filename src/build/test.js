const body = document.querySelector('body');

body.appendChild(createElement(
    'div', 
    'container', 
    [
        createElement(
            'div',
            'container-content',
            [
                createElement('div', 'item'),
                createElement('div', 'item'),
                createElement('div', 'item'),
                createElement('div', 'item'),
                createElement('div', 'item'),
            ]
            
        ),
    ]
))

function buildProjectOnMenu(){

    const container = new Element('div', 'project-container')

    .addChild(new Element('div', 'project-task')
        .addChild(new Element('div', 'task', 'Project Title')).build())

    .addChild(new Element('div', 'project-task'))
    .build();

    return container;
}

function buildHeader(){
    const header = new Element('div', 'header')

    .addChild(new Element('div', 'title'))
    .addChild(new Element('div', 'buttons-container')

        .addChild(new Element('button', 'button-one', 'do something'))
        .addChild(new Element('button', 'button-two', 'do something'))
        .addChild(new Element('button', 'button-three', 'do something')))

        .build()
    
    return header;
}

