export class Element {
    constructor(
        type = 'div',
        _class = undefined,
        textContent = undefined,
        children = [],
    ) {
        this.type = type;
        this._class = _class;
        this.textContent = textContent;
        this.children = children;
    }

    build(){
        
        const element = document.createElement(this.type);
        
        if(this._class !== undefined){

            const classes = this._class.split(' ');

            if(this._class != undefined){
            
                for(const _class of classes){
                    element.classList.add(_class);
                }
            }
        }
        
        if(this.textContent != undefined){
            element.textContent = this.textContent;
        }

        if(this.children != []){
            for(const child of this.children){
                element.appendChild(child);
            }
        }

        return element;
    }
}





