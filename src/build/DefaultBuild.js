import { Element } from './Element.js';
import { Event } from './event-listeners.js';
import hamburger from '../images/hamburger.png';
import { 
    ProjectUI,
    MenuUI,
} from './event-listeners.js';


class DefaultBuild {
    static content = document.getElementById('content');

    static buildHeader(){
        return new Element({
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
                            'event-listeners':{'click':ProjectUI.newProjectClick},
                        }).build(),
                        new Element({
                            'tagname':'button',
                            'class':'header-delete',
                            'text-content':'Delete',
                        }).build(),
                    ]
                }).build(),
            ]
        }).build()
    }

    static buildMenu(){
        return new Element({
            'tagname':'div',
            'class':'menu',
            }).build();
    }

    static buildMenuHamburger(){
        return new Element({
            'tagname':'img',
            'class':'menu-hamburger',
            'src':hamburger,
            'event-listeners':{'click':Event.createMobileDropDown},
        }).build()
    }

    static buildMenuUI(){
        return [
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
                'event-listeners':{'click':MenuUI.handleProjectsDropDown}
            }).build(),
            new Element({
                'tagname':'button',
                'class':'tasks',
                'text-content':'All tasks',
            }).build()
        ]
    }

    static buildMainContent(){
        return new Element({
            'tagname':'div',
            'class':'main-content',
        }).build();
    }

    static buildFooter(){
        return new Element({
            'tagname':'div',
            'class':'footer',
        }).build()
    }
}

export class InsertDefaultBuild {

    static content = document.getElementById('content');

    static insertHeader(){
        this.content.appendChild(
            DefaultBuild.buildHeader()
        );
    }

    static insertMenu(){
        this.content.appendChild(
            DefaultBuild.buildMenu()
        );
    }

    static insertMenuHamburger(){
        document.querySelector('.menu').appendChild(
            DefaultBuild.buildMenuHamburger()
        );
    }

    static insertMenuUI(){
        const menu = document.querySelector('.menu');
        const menuItems = DefaultBuild.buildMenuUI();
        for (const item of menuItems) {
            menu.appendChild(item);
        }
    }

    static insertMainContent(){
        this.content.appendChild(
            DefaultBuild.buildMainContent()
        );
    }

    static insertFooter(){
        this.content.appendChild(
            DefaultBuild.buildFooter()
        );
    }

    static insertDefaultUI(){
        this.insertHeader();
        this.insertMenu();
        this.insertMenuHamburger();
        this.insertMenuUI();
        this.insertMainContent();
        this.insertFooter();
    }
}