import { Collection } from "./Collection.js";
import { Project } from "./Project.js";
import { Task } from "./Task.js";
import { collection } from "../index.js";
import { cloneDeep, update } from "lodash";

export class Storage {
    static pushToLocalStorage(collection){
        localStorage.setItem('collection',JSON.stringify(collection,getCircularReplacer()));

        function getCircularReplacer(){
            const seen = new WeakSet();
            return (key, value) => {
                if (typeof value === 'object' && value !== null) {
                    if (seen.has(value)) {
                        return
                    }
                    seen.add(value);
                }
                return value;
            };
        }
    }

    static retrieveFromLocalStorage(){
        const collectionCopy =  JSON.parse(localStorage.getItem('collection'));

        const collection = Object.assign(new Collection(), collectionCopy);

        collection.projects.forEach(project => {
            Object.setPrototypeOf(project, Project.prototype);
            project.tasks.forEach(task => {
                Object.setPrototypeOf(task, Task.prototype);
            });
        });

        return collection;

    }

    static checkStatus(){
        const collectionDeSeralized = Storage.retrieveFromLocalStorage();
        if (collectionDeSeralized === null) {
            return false;
        } else {
            return true;
        }
    }
}