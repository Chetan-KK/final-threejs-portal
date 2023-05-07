import * as THREE from 'three';
import Experience from "../Experience";

export default class Floor {
    constructor () {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setFloor();
    }
    setFloor() {
        this.geometry = new THREE.PlaneGeometry(10, 10);
        this.material = new THREE.MeshBasicMaterial({
            color: 0xefbcbc
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.rotation.x = -Math.PI / 2;
        this.mesh.position.y = -.02;
        this.scene.add(this.mesh);
    }
}