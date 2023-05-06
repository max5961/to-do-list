import { Element } from '../Classes/Element.js';
import hamburger from '../images/hamburger.png';
import { 
    handleAllProjectsClick,
    handleMobileDropDown,
    newProject } from './EVlisteners.js';



const content = document.getElementById('content');

function buildHeader(){
    const header = 
        new Element({
            'tagname': 'div',
            'class': 'header',
            'children':[
                new Element({
                    'tagname':'div',
                    'class': 'header-title',
                    'text-content':'To-Do-List',
                }).build(),
                new Element({
                    'tagname':'div',
                    'class':'header-button-container',
                    'children':[
                        new Element({
                            'tagname':'button',
                            'class': 'new-project',
                            'text-content':'New Project',
                            'event-listeners':{'click':newProject},
                        }).build(),
                        new Element({
                            'tagname':'button',
                            'class':'header-delete',
                            'text-content':'Delete',
                        }).build(),
                    ]
                }).build(),
            ]
        }).build();

    content.appendChild(header);
}

function buildMenu(){
    const menu =
        new Element({
            'tagname':'div',
            'class':'menu',
            'children':[
                new Element({
                    'tagname':'button',
                    'class':'scheduled',
                    'text-content':'Scheduled',
                }).build(),
                new Element({
                    'tagname':'button',
                    'class':'scheduled-today',
                    'text-content':'Scheduled-today',
                }).build(),
                new Element({
                    'tagname':'button',
                    'class':'projects',
                    'text-content':'All projects',
                    'event-listeners':{'click':handleAllProjectsClick}
                }).build(),
                new Element({
                    'tagname':'button',
                    'class':'tasks',
                    'text-content':'All tasks',
                }).build(),
            ]
        }).build()

    content.appendChild(menu);
}

function buildMobileMenu(){
    content.appendChild(
        new Element({
            'tagname':'div',
            'class':'mobile-menu',
            'children':[
                new Element({
                    'tagname':'button',
                    'event-listeners':{
                        'click':handleMobileDropDown,
                    },
                    'children':[
                        new Element({
                            'tagname':'img',
                            'src':hamburger,
                        }).build(),
                    ]
                }).build(),
            ]
        }).build()
    );
}

function buildFooter(){
    content.appendChild(
        new Element({
            'tagname':'div',
            'class':'footer',
        }).build()
    )
}

function buildToDoContent(){
    content.appendChild(
        new Element({
            'tagname':'div',
            'class':'to-do-content',
        }).build()
    )
}

export function buildUI(){
    buildHeader();
    buildMenu();
    buildMobileMenu();
    buildToDoContent();
    buildFooter();
}