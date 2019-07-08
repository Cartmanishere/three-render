import React from 'react';
import './common.css';
var THREE = window.THREE = require('three');
require('three/examples/js/vr/WebVR');

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
    }

    animate() {
        this.renderer.render( this.scene, this.camera );
        if (this.mixer != null) {
            this.mixer.update(2);
        }
        requestAnimationFrame( this.animate );
    }

    componentDidMount() {
        // this.mount.appendChild( WEBVR.createButton(this.renderer));
        this.renderer.vr.enabled = true;
        this.renderer.setAnimationLoop(() => {
            this.renderer.render(this.scene, this.camera);
        });
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