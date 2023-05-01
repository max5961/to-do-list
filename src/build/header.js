import { Element } from '../Classes/Element.js';

export function createHeader(){
    const header = 
        new Element(
            'div',
            'header',
            undefined,
            [
                new Element(
                    'div',
                    'buttons-container',
                    undefined,
                    [
                        new Element(
                            'button',
                            'new-project',
                            'New Project'
                        ).build()
                    ]
                ).build()
            ]
        ).build();
    
    const content = document.getElementById('content');
    content.appendChild(header);
}
