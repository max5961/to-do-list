import { Project } from './Project.js';

export class Collection {
    constructor(){
        this.projects = [];
    }

    // sort projects by name in ascending order
    sortAscending(){
        this.projects.sort((a,b) => {
            const A = a.title.toUpperCase();
            const B = b.title.toUpperCase();

            if(A < B){
                return -1;
            }

            if(A > B){
                return 1;
            }

            return 0;
        })
    }

    // sort projects by name in descending order
    sortDescending(){
        this.projects.sort((a,b) => {
            const A = a.title.toUpperCase();
            const B = b.title.toUpperCase();

            if(B < A){
                return -1;
            }

            if(B > A){
                return 1;
            }

            return 0;
        })
    }
}