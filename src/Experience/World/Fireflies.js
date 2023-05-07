import * as THREE from 'three';
import Experience from "../Experience";
import firefliesVertexShader from './shaders/firefliesVertex.glsl';
import firefliesFragmentShader from './shaders/firefliesFragment.glsl';

export default class Fireflies {
    constructor () {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.time = this.experience.time;
        this.scene = this.experience.scene;
        this.debug = this.experience.debug;

        this.properties = {
            count: 30,
            size: 100,
            radius: 3,
        };

        this.setFireflies();

        if (this.debug.active) {
            this.setDebug();
        }
    }
    setFireflies() {

        if (this.points) {
            this.geometry.dispose();
            this.material.dispose();
            this.scene.remove(this.points);
        }

        this.geometry = new THREE.BufferGeometry();
        this.positions = new Float32Array(this.properties.count * 3);
        this.scale = new Float32Array(this.properties.count);

        for (let i = 0; i < this.properties.count; i++) {
            let i3 = i * 3;

            this.positions[i3] = (Math.random() - .5) * this.properties.radius;
            this.positions[i3 + 1] = ((Math.random() - .5) + .5) * (this.properties.radius / 2) + .2;
            this.positions[i3 + 2] = (Math.random() - .5) * this.properties.radius;

            this.scale[i] = Math.random();
        }
        this.positionAttribute = new THREE.BufferAttribute(this.positions, 3);
        this.scaleAttribute = new THREE.BufferAttribute(this.scale, 1);

        this.geometry.setAttribute('position', this.positionAttribute);
        this.geometry.setAttribute('aScale', this.scaleAttribute);

        this.material = new THREE.ShaderMaterial({
            uniforms: {
                uPixelRatio: { value: this.sizes.pixelRatio },
                uSize: { value: this.properties.size },
                uTime: { value: 0 },
            },
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexShader: firefliesVertexShader,
            fragmentShader: firefliesFragmentShader,
        });

        this.points = new THREE.Points(this.geometry, this.material);
        this.scene.add(this.points);
    }
    resize() {
        this.material.uniforms.uPixelRatio.value = this.sizes.pixelRatio;
    }
    setDebug() {
        this.debugFolder = this.debug.ui.addFolder('fire files');
        this.debugFolder.add(this.properties, "size").min(10).max(500).step(.01).name('size').onFinishChange(() => {
            this.setFireflies();
        });
    }
    update() {
        this.material.uniforms.uTime.value = this.time.elapsed / 1000;
    }
}