import * as THREE from 'three';
import Experience from './Experience';

export default class Renderer {
    constructor () {

        //options
        this.experience = new Experience();
        this.canvas = this.experience.canvas;
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.debug = this.experience.debug;

        this.debugProperties = {
            clearColor: 0x321b1b
        };

        this.setRenderer();

        if (this.debug.active) {
            this.setDebug();
        }
    }
    setRenderer() {

        //renderer instance
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });

        //renderer options
        this.instance.useLegacyLights = true;
        this.instance.outputEncoding = THREE.sRGBEncoding;
        // this.instance.toneMapping = THREE.CineonToneMapping;
        // this.instance.toneMappingExposure = 1.75;
        // this.instance.shadowMap.enabled = true;
        // this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
        this.instance.setClearColor(this.debugProperties.clearColor);
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);

        //render scene
        this.instance.render(this.scene, this.camera.instance);
    }
    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);
    }
    update() {

        this.instance.render(this.scene, this.camera.instance);
    }
    setDebug() {
        this.debugFolder = this.debug.ui.addFolder('renderer');
        this.debugFolder.addColor(this.debugProperties, "clearColor").onChange(() => {
            this.instance.setClearColor(this.debugProperties.clearColor);
        });
    }
}