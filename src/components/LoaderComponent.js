import React from 'react';
import './common.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
var THREE = window.THREE = require('three');
require('three/examples/js/loaders/GLTFLoader');

var LOAD_EXAMPLE = 'https://raw.githubusercontent.com/Cartmanishere/three-render/master/public/scene.gltf';

class WebVRComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.animate = this.animate.bind(this);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

        this.camera.position.set( 0, 0, 60 );

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );

        // Load the Orbitcontroller
        // eslint-disable-next-line
        var controls = new OrbitControls(this.camera, this.renderer.domElement );

        // Load Light
        var ambientLight = new THREE.AmbientLight( 0xcccccc );
        this.scene.add( ambientLight );

        var directionalLight = new THREE.DirectionalLight( 0xffffff );
        directionalLight.position.set( 0, 1, 1 ).normalize();
        this.scene.add( directionalLight );

        const loader = new THREE.GLTFLoader();
        loader.load( LOAD_EXAMPLE, (gltf) => {

            const model = gltf.scene;
            this.mixer = new THREE.AnimationMixer( model );
            gltf.animations.forEach(( clip ) => {
                this.mixer.clipAction(clip).play();
            });
            gltf.scene.position.y -= 10;
            this.scene.add( gltf.scene );
            this.renderer.render( this.scene, this.camera );
        });
    }

    animate() {
        this.renderer.render( this.scene, this.camera );
        if (this.mixer != null) {
            this.mixer.update(2);
        }
        requestAnimationFrame( this.animate );
    }

    componentDidMount() {
        this.mount.appendChild( this.renderer.domElement );
        this.animate();
    }

    render() {
        return (
            <div className="render-component">
                <div ref={ref => (this.mount = ref)}/>
            </div>
        )
    }
}

export default WebVRComponent;