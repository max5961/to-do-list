import { Element } from './Element.js';
import { ElementBuilder } from './ElementBuilder.js';
import { Settings } from '../data/Settings.js';
import { Event } from './event-listeners.js';
import hamburger from '../images/hamburger.png';

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
                            'event-listeners':{'click':Event.newProjectClick},
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

    static buildMenuContent(){
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
                'event-listeners':{'click':Event.menuProjectClick}
            }).build(),
            new Element({
                'tagname':'button',
                'class':'tasks',
                'text-content':'All tasks',
            }).build()
        ]
    }

    static buildMenuHamburger(){
        return new Element({
            'tagname':'img',
            'class':'menu-hamburger',
            'src':hamburger,
            'event-listeners':{'click':Event.createMobileDropDown},
        }).build()
    }

    static buildFooter(){
        return new Element({
            'tagname':'div',
            'class':'footer',
        }).build()
    }

    static buildMainContent(){
        return new Element({
            'tagname':'div',
            'class':'main-content',
        }).build();
    }
}

export class InsertDefault extends DefaultBuild {

    static appendHeader(){
        this.content.appendChild(this.buildHeader());
    }

    static appendMenu(){
        this.content.appendChild(this.buildMenu());
    }

    static appendMenuContent(){
        this.buildMenuContent().forEach(tab => {
            document.querySelector('.menu').appendChild(tab);
        });
    }

    static appendMenuHamburger(){
        document.querySelector('.menu').insertAdjacentElement('afterbegin', this.buildMenuHamburger());
    }

    static removeMenuContent(){

        const menu = document.querySelector('.menu');

        while (menu.childNodes[0] && menu.childNodes.length > 1) {
            menu.removeChild(menu.childNodes[1]);
        }
    }

    static appendMainContent(){
        this.content.appendChild(this.buildMainContent());
    }

    static appendFooter(){
        this.content.appendChild(this.buildFooter());
    }

    static appendUI(){
        this.appendHeader();
        this.appendMenu();
        this.appendMenuContent();
        this.appendMenuHamburger();
        this.appendMainContent();
        this.appendFooter();
    }
}
