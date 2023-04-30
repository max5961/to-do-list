class Element {
    constructor (
        type = 'div',
        cls = '',
        children = [],
        textContent = '',
        attributes = {},
        eventListeners = {},
    ) {
        this.type = type;
        this.cls = cls;
        this.children = children;
        this.textContent = textContent;
        this.attributes = attributes;
        this.eventListeners = eventListeners;
    }

    addClass(value){
        if(this.cls === ''){
            this.cls = value;
        }

        //prevent multiple classes from not being separated by a space
        else{
            this.class += ` ${value}`
        }
    }

    addChild(value){
        this.children.push(value);
        
    }

    //Erases the current value of this.text and updates it to a new value.  Does not append new value to the current value
    setText(value){
        this.textContent = value;
    }

    addAttribute(object){
        for(const key of object){
            this.attributes[key] = key;
        }
    }

    build(){

        const element = document.createElement(this.type);

        if(cls !== ''){
            element.classList.add(cls);
        }

        if(attributes !== {}){
            for(key of this.attributes){
                element.setAttribute(key, value);
            }
        }

        if(children !== []){
            for(child of this.children){
                child = child.build();
                element.appendChild(child);
            }
        }

        if(eventListeners !== {}){
            for(const key of this.eventListeners){
                element.addEventListener(key, value);
            }
        }

        return element;
    }
}





