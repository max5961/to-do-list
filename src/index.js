import css from './styles/index.css';
import { Collection } from './data/Collection.js';
import { InsertDefaultBuild } from './build/DefaultBuild.js';
import { Storage } from './data/Storage';
import { ElementBuilder, ElementManager } from './build/ElementManager.js';
import { Settings } from './data/Settings';
import { parse } from 'date-fns';

export let collection = new Collection();

if (Storage.checkStatus()) {
    collection = Storage.retrieveFromLocalStorage();
    console.log(collection);
}

InsertDefaultBuild.insertDefaultUI();

if (collection.projects.length > 0) {
    ElementManager.showProjectsDropDown();
    Settings.showProjectsDropDown = false;

    Settings.currentProject = collection.projects[0]._id;
    ElementManager.insertProjectToMainContent(collection.projects[0]);
    ElementManager.insertTasksToProjectDisplay();
}







