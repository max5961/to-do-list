export class Element {
    constructor(
        config = {
            'type':'div',
        }
    ) {
        this.config = config;
    }

    build(){
        //new Element().build() will default to a created div element
        //if a config object is passed in as a parameter, then a type property always needs to be added
        const element = document.createElement(this.config['type']);
        
        for(const property in this.config){
            if(property === 'class'){
                element.classList.add(this.config['class']);
            }
            else if(property === 'id'){
                element.setAttribute('id', this.config['id']);
            }
            else if(property === 'text-content'){
                element.textContent = this.config['text-content'];
            }
            else if(property === 'eventListeners'){
                for(const property in this.config['eventListeners']){
                    element.addEventListener(property, this.config['eventListeners'][property]);
                }
            }
            //child must be built using this.build()
            else if(property === 'children'){
                for(const child of this.config['children']){
                    element.appendChild(child);
                }
            }
            else {
                element.setAttribute(property, this.config[property]);
            }
        }

        return element;
    }
}




