import { Element } from '../Classes/Element.js';

export function createHeader(){
    const header = new Element(
        {
            'type':'div',
            'class':'header',
            'children':[
                new Element(
                    {
                        'type':'h1',
                        'class':'header-title',
                        'text-content':'To-Do-List',
                    }
                ).build(),
                new Element(
                    {
                        'type':'div',
                        'class':'button-container',
                        'children':[
                            new Element(
                                {
                                    'type':'button',
                                    'class':'new-project',
                                    'text-content':'New Project',
                                }
                            ).build(),
                        ]
                    }
                ).build()
            ]
        }
    ).build()

    const content = document.getElementById('content');
    content.appendChild(header);
}