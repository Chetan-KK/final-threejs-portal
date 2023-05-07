import * as THREE from 'three';
import Experience from "../Experience";

import portalVertexShader from './shaders/portalVertex.glsl';
import portalFragmentShader from './shaders/portalFragment.glsl';

export default class Portal {
    constructor () {
        this.experience = new Experience();
        this.time = this.experience.time;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.debug = this.experience.debug;

        this.properties = {
            innerColor: 0x282822,
            outterColor: 0xb2ff,
            strength: 8.5
        };

        this.setTexture();
        this.setMaterials();
        this.setPortal();

        if (this.debug.active) {
            this.setDebug();
        }
    }
    setDebug() {
        this.debugFolder = this.debug.ui.addFolder('Portal');

        this.debugs();
    }
    setTexture() {
        this.backedTexture = this.resources.items.portalTexture;
        this.backedTexture.flipY = false;
        this.backedTexture.encoding = THREE.sRGBEncoding;
    }
    setMaterials() {
        this.backedMaterials = new THREE.MeshBasicMaterial({ map: this.backedTexture });

        this.portalLightMaterial = new THREE.ShaderMaterial({
            vertexShader: portalVertexShader,
            fragmentShader: portalFragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uStrength: { value: this.properties.strength },
                uInnerColor: { value: new THREE.Color(this.properties.innerColor) },
                uOutterColor: { value: new THREE.Color(this.properties.outterColor) },
            }
        });
        this.poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 });

    }
    setPortal() {
        this.model = this.resources.items.portalModel.scene;


        // this.model.traverse((child) => {
        //     child.material = this.backedMaterials;
        // });

        this.backedMesh = this.model.children.find((child) => child.name === "backed");
        this.portalLightMesh = this.model.children.find((child) => child.name === "portalLight");
        this.poleLightAMesh = this.model.children.find((child) => child.name === "poleLightA");
        this.poleLightBMesh = this.model.children.find((child) => child.name === "poleLightB");

        this.backedMesh.material = this.backedMaterials;
        this.poleLightAMesh.material = this.poleLightMaterial;
        this.poleLightBMesh.material = this.poleLightMaterial;
        this.portalLightMesh.material = this.portalLightMaterial;

        this.scene.add(this.model);
    }
    update() {
        this.portalLightMaterial.uniforms.uTime.value = this.time.elapsed / 1000;
    }
    debugs() {
        this.debugFolder.addColor(this.properties, "innerColor").onChange(() => {
            this.portalLightMaterial.uniforms.uInnerColor.value = new THREE.Color(this.properties.innerColor);
        });
        this.debugFolder.addColor(this.properties, "outterColor").onChange(() => {
            this.portalLightMaterial.uniforms.uOutterColor.value = new THREE.Color(this.properties.outterColor);
        });
        this.debugFolder.add(this.properties, "strength").min(.1).max(20).name("strenght").onChange(() => {
            this.portalLightMaterial.uniforms.uStrength.value = this.properties.strength;
        });
    }
}