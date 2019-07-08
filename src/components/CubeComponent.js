import React from 'react';
import * as t3 from 'three';
import './common.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class CubeComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.scene = new t3.Scene();
        this.camera = new t3.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        this.renderer = new t3.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );

        // Load the Orbitcontroller
        // eslint-disable-next-line
        var controls = new OrbitControls(this.camera, this.renderer.domElement );

        const geometry = new t3.BoxGeometry( 4, 1 , 1);
        const material = new t3.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
        this.cube = new t3.Mesh( geometry, material );
        this.scene.add( this.cube );
        this.camera.position.z = 5;
        const animate = () => {
            requestAnimationFrame( animate );
            this.cube.rotation.x += 0.01;
            this.cube.rotation.y += 0.01;
            this.renderer.render( this.scene, this.camera );
        };

        animate();
    }

    componentDidMount() {
        this.mount.appendChild( this.renderer.domElement );
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