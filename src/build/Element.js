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
        //if a config object is passed in as a parameter, then a tagname property always needs to be added
        const element = document.createElement(this.config['tagname']);
        
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
            else if(property === 'event-listeners'){
                for(const property in this.config['event-listeners']){
                    element.addEventListener(property, this.config['event-listeners'][property]);
                }
            }
            else if(property === 'src'){
                element.src = this.config['src'];
            }
            //child must be built using this.build()
            else if(property === 'children'){
                for(const child of this.config['children']){
                    element.appendChild(child);
                }
            }
            else if(property === 'style'){
                for(const property in this.config['style']){
                    element.style[property] = this.config['style'][property];
                }
            }
            else if(property !== 'tagname'){
                element.setAttribute(property, this.config[property]);
            }
        }

        return element;
    }
}




