export class Element {
    constructor (
        type = 'div',
        cls = undefined,
        textContent = undefined,
        children = [],
        attributes = {},
        eventListeners = {},
    ) {
        this.type = type;
        this.cls = cls;
        this.textContent = textContent;
        this.children = children;
        this.attributes = attributes;
        this.eventListeners = eventListeners;
    }

    addClass(value){
        if(this.cls === ''){
            this.cls = value;
        }

        //prevent multiple classes from not being separated by a space
        else {
            this.cls = this.cls + ` ${value}`
        }
    }

    addChild(value){
        this.children.push(value);
    }

    build(){

        //create element based on input type
        const element = document.createElement(this.type);

        //add classes
        if(this.cls !== undefined){

            const classes = this.cls.split(" ")

            if(classes.length > 1){
                for(const cls of classes){
                    element.classList.add(cls);
                }
            }
            else {
                element.classList.add(this.cls);
            }
        }

        //add text content to the element
        if(this.textContent !== undefined){
            element.textContent = this.textContent;
        }

        //appendChild() for all children objects
        if(this.children !== []){

            for(const child of this.children){
                const createdChildElement = child.build();
                element.appendChild(createdChildElement);
            }
        }

        return element;
    }
}