import React from 'react';
import * as t3 from 'three';
import './common.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class LineComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.scene = new t3.Scene();
        this.camera = new t3.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

        this.camera.position.set( 0, 0, 100 );
        this.camera.lookAt( 0, 0, 0 );

        this.renderer = new t3.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );

        // Load the Orbitcontroller
        // eslint-disable-next-line
        var controls = new OrbitControls(this.camera, this.renderer.domElement );

        const material = new t3.LineBasicMaterial( { color: 0xff0000} );
        const geometry = new t3.Geometry();
        geometry.vertices.push(new t3.Vector3( -10, 0, 0) );
        geometry.vertices.push(new t3.Vector3( 0, 10, 0) );
        geometry.vertices.push(new t3.Vector3( 10, 0, 0) );

        var line = new t3.Line( geometry, material );

        this.scene.add( line );
        this.renderer.render( this.scene, this.camera );
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

export default LineComponent;