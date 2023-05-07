import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Experience from "./Experience";

export default class Camera {
    constructor () {

        //options
        this.experience = new Experience();
        this.canvas = this.experience.canvas;
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;

        //options
        this.setCamera();
        this.setOrbitControls();
    }
    setCamera() {

        //camera instance
        this.instance = new THREE.PerspectiveCamera(45, this.sizes.aspect, .1, 100);
        this.instance.position.set(3, 2, 3);
        this.scene.add(this.instance);
    }
    setOrbitControls() {

        //orbital controls
        this.controls = new OrbitControls(this.instance, this.canvas);

        this.controls.enableDamping = true;
    }

    resize() {
        this.instance.aspect = this.sizes.aspect;
        this.instance.updateProjectionMatrix();
    }
    update() {
        this.controls.update();
    }
}