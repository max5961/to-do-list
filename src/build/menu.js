import { Element } from '../Classes/Element.js';

export function createMenu(){
    const menu = 
        new Element(
            'div',
            'menu',
            undefined,
            [
               new Element(
                    'div',
                    'button-container',
                    undefined,
                    [
                        new Element(
                            'button',
                            'all-tasks',
                            'All Tasks'
                        ).build(),
                        new Element(
                            'button',
                            'all-projects',
                            'All Projects'
                        ).build(),
                        new Element(
                            'button',
                            'scheduled-today',
                            'Scheduled Today'
                        ).build(),
                        new Element(
                            'button',
                            'scheduled',
                            'Scheduled'
                        ).build(),
                        new Element(
                            'button',
                            'projects',
                            'Projects'
                        ).build()
                    ]
                    
               ).build()
            ]
        ).build();

        const content = document.getElementById('content');
        content.appendChild(menu);
}