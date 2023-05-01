import { Element } from '../Classes/Element.js';

export function newProjectForm(){
    const form = new Element(
        'div',
        'form-container',
        undefined,
        [
            new Element(
                'form',
                'project-form',
                undefined,
                [
                    new Element(
                        'input',
                        'type-input'
                    ).build(),
                    new Element(
                        'input',
                        'type-input'
                    ).build(),
                    new Element(
                        'input',
                        'type-input'
                    ).build(),
                    new Element(
                        'input',
                        'type-input'
                    ).build(),
                    new Element(
                        'input',
                        'type-input'
                    ).build()
                ]
            ).build(),
        ]
    ).build();

    const content = document.getElementById('content');
    content.appendChild(form);
}