import { Vector3 } from 'three';
import { MeshBasicMaterial } from 'three';
import { Line } from 'three';
import { BufferGeometry } from 'three';
import { Object3D } from 'three';
import { LineBasicMaterial } from 'three';
import { ArrowHelper } from 'three';
import { Mesh } from 'three';
import { SphereGeometry } from 'three';
import { Scene, OrthographicCamera, WebGLRenderer } from 'three';

class QuatWidget {
    constructor() {
        // bindings;
        this.render = ::this.render;
        // dom
        this.el = document.querySelector(".three");

        const width = 100;
        const height = 100;
        
        this.radius = 38;

        // scene + camera
        this.scene = new Scene();
        this.camera = new OrthographicCamera(width / -2, width / 2, height / 2, height / -2, -1000, 1000);


        // global object
        this.widget = new Object3D();
        this.scene.add(this.widget);

        // sphere

        const sphereGeo = new SphereGeometry(this.radius, 32, 32);
        const sphereMat = new MeshBasicMaterial({
            color: 0xaaaaaa,
            transparent: true,
            opacity: 0.05,
            wireframe: true,
        });

        const sphereGrid = new Mesh(sphereGeo, sphereMat);
        this.widget.add(sphereGrid);


        // arrow helper
        this.xyz = new Vector3(0, 1, 0).normalize();
        this.arrow = new ArrowHelper(this.xyz, new Vector3(0, 0, 0), this.radius * 1.5, 0x000000);
        this.widget.add(this.arrow);


        // axes
        let points =  [];
        for(let i = 0; i <= 360; i++){
            points.push(new Vector3(Math.sin(i*(Math.PI/180))*(this.radius), Math.cos(i*(Math.PI/180))*(this.radius), 0));
        }
          
        const circleGeo = new BufferGeometry().setFromPoints(points);

        // x axis
        this.zAxis = new Line(new BufferGeometry().copy(circleGeo), new LineBasicMaterial({ color: 0x0000ff }));

        this.xAxis = new Line(new BufferGeometry().copy(circleGeo), new LineBasicMaterial({ color: 0xff0000 }));
        this.xAxis.rotateX(Math.PI / 2);

        this.yAxis = new Line(new BufferGeometry().copy(circleGeo), new LineBasicMaterial({ color: 0x00ff00 }));
        this.yAxis.rotateY(Math.PI / 2);

        
        this.widget.add(this.xAxis);
        this.widget.add(this.yAxis);
        this.widget.add(this.zAxis);


        // camera position/angle
        this.camera.position.set(0.5, 0.5, 0.5);
        this.camera.lookAt(new Vector3(0,0,0));


        // renderer
        this.renderer = new WebGLRenderer({ alpha: true });
        this.renderer.setPixelRatio(2);
        this.renderer.setSize(width, height);
        this.el.appendChild(this.renderer.domElement);


        // start render
        this.render();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render);
    }

    setOrientation(quaternion) {
        this.widget.setRotationFromQuaternion(quaternion);
    }
}

export default QuatWidget;