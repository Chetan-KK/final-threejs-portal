import * as THREE from 'three';
import Camera from './Camera';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';
import Renderer from './Renderer';
import World from './World/World';
import Resources from './Utils/Resources';
import sources from './sources';
import Debug from './Utils/Debug';

let instance = null;

export default class Experience {
    constructor (_canvas) {

        //singleton method
        if (instance) {
            return instance;
        }
        instance = this;

        //options
        this.canvas = _canvas;

        //utils
        this.sizes = new Sizes();
        this.time = new Time();
        this.debug = new Debug();

        //scene
        this.scene = new THREE.Scene();

        //load resources
        this.resources = new Resources(sources);

        //camera
        this.camera = new Camera();

        //renderer
        this.renderer = new Renderer();

        //everything
        this.world = new World();

        this.listenEvents();

    }
    listenEvents() {

        //listen to resize event
        this.sizes.on('resize', () => {
            this.resize();
        });

        //listen to update event
        this.time.on('update', () => {
            this.update();
        });
    }
    resize() {
        this.camera.resize();
        this.world.resize();
        this.renderer.resize();
    }
    update() {
        this.camera.update();
        this.renderer.update();
        this.world.update();
    }

}