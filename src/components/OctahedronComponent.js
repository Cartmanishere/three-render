import React from 'react';
import * as t3 from 'three';
import './common.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Decoration from '../objects/Decoration';

// Referred from https://www.august.com.au/blog/animating-scenes-with-webgl-three-js/

class CubeComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.animate = this.animate.bind(this);

        this.scene = new t3.Scene();
        this.camera = new t3.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        this.renderer = new t3.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.setClearColor( 0xfff6e6 );

        // Enable shadow mapping
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = t3.PCFSoftShadowMap;

        // Load the Orbitcontroller
        var controls = new OrbitControls(this.camera, this.renderer.domElement );
        // this.controls.target = new t3.Vector3(0,15,0);
        // this.controls.maxPolarAngle = Math.PI / 2;

        this.decorations = [];

        var decoration1 = new Decoration();
        decoration1.position.y += 10;
        this.scene.add(decoration1);
        this.decorations.push(decoration1);

        var decoration2 = new Decoration();
        decoration2.position.set(20,15,-10);
        decoration2.scale.set(.8,.8,.8);
        this.scene.add(decoration2);
        this.decorations.push(decoration2);

        var decoration3 = new Decoration();
        decoration3.position.set(-20,20,-12);
        this.scene.add(decoration3);
        this.decorations.push(decoration3);

        const ambientLight = new t3.AmbientLight( 0xffffff, 0.2 );
        this.scene.add( ambientLight );

        const pointLight = new t3.PointLight( 0xffffff, 1 );
        pointLight.position.set( 25, 50, 25 );
        this.scene.add( pointLight );

        this.camera.position.z = 5;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = t3.PCFSoftShadowMap;

        pointLight.castShadow = true;
        pointLight.shadow.mapSize.width = 1024;
        pointLight.shadow.mapSize.height = 1024;


        var shadowMaterial = new t3.ShadowMaterial( { color: 0xeeeeee } );
        shadowMaterial.opacity = 0.5;

        const animate = () => {
            requestAnimationFrame( animate );
            this.renderer.render( this.scene, this.camera );
        };

        animate();
    }

    animate() {
        // this.controls.update();
        for(let d = 0; d < this.decorations.length; d++) {
            this.decorations[d].updatePosition();
        }
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate);
    }

    componentDidMount() {
        this.mount.appendChild( this.renderer.domElement );
        requestAnimationFrame(this.animate);
    }

    render() {
        return (
            <div className="render-component">
                <div ref={ref => (this.mount = ref)}/>
            </div>
        )
    }
}

export default CubeComponent;