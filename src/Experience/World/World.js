import * as THREE from 'three';
import Experience from "../Experience";

export default class World {
    constructor () {

        //options
        this.experience = new Experience();
        this.time = this.experience.time;
        this.scene = this.experience.scene;

        this.testBox();
    }
    testBox() {
        this.box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial());
        this.scene.add(this.box);
    }
    update() {
        this.box.rotation.x = this.time.elapsed / 900;
    }
}