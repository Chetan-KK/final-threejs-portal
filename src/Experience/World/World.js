import * as THREE from 'three';
import Experience from "../Experience";
import Floor from './Floor';
import Portal from './Portal';
import Fireflies from './Fireflies';

export default class World {
    constructor () {

        //options
        this.experience = new Experience();
        this.time = this.experience.time;
        this.debug = this.experience.debug;
        this.isLoaded = false;

        //others
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.resources.on('ready', () => {
            this.loaded();
            this.isLoaded = true;
        });
    }

    //laod after all resources are loaded    
    loaded() {
        // this.floor = new Floor();
        this.portal = new Portal();
        this.fireflies = new Fireflies();
    }
    resize() {
        this.fireflies.resize();
    }
    update() {
        if (this.isLoaded) {
            this.fireflies.update();
            this.portal.update();
        }
    }
}