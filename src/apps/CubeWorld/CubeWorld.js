import { WebGLContext } from './WebGlContext';
import { Camera } from '../../libs/3d/Camera';
import { Cube } from '../../libs/3d/geometry/Cube';
import { Light } from '../../libs/3d/Light';
import { Fog } from '../../libs/3d/Fog';
import { Matrix4 } from '../../libs/math/Matrix4';
import { Radian } from '../../libs/math/Radian';
import { App } from '../../libs/core/App';

export class CubeWorld extends App {
    constructor(parent, options) {
        super(parent, options);
    }

    init() {
        this.context = new WebGLContext(this.container);
        this.clicked = false;
        this.movementX = 0;
        this.movementY = 0;
        this.camera = new Camera(
            [0,0,-5],
            [0,0,0],
            [0,1,0],
            45,
            this.context.getAspect(),
            0.1,
            1000
        );
        this.light = new Light(
            [0, 2, 0],
            [1, 1, 1],
            [0.2, 0.2, 0.2]);
        this.fog = new Fog(
            [0, 0, 0],
            [0, 8]);

        this.cube = new Cube(
            0, 0, 0,
            1, 1, 1,
            [Math.random(), Math.random(), Math.random(), 1]);

        for (let i = 0; i < 10000; i++) {
            this.addInstance();
        }

        this.initControl();

        return this;
    }

    updateMovement(e) {
        if (this.clicked) {
            this.movementX += e.movementX;
            this.movementY += e.movementY;
        }
    }

    initControl() {
        this.step = 0.01;

        this.context.element.onpointerdown = e => {
            this.clicked = true;
            this.context.requestPointerLock();
            this.updateMovement(e);
        }
        this.context.element.onpointerup = e => {
            document.exitPointerLock = document.exitPointerLock ||
                document.mozExitPointerLock;
            document.exitPointerLock();
            this.movementX = 0;
            this.movementY = 0;
            this.clicked = false;
        }
        this.context.element.onpointermove = this.updateMovement.bind(this);
        document.onkeydown = e => {
            switch (e.code) {
                case 'a':
                case 'KeyA':
                case 'ArrowLeft':
                    this.camera.truck(-this.step);
                    break;
                case 'd':
                case 'KeyD':
                case 'ArrowRight':
                    this.camera.truck(this.step);
                    break;
                case 'w':
                case 'KeyW':
                case 'ArrowUp':
                    this.camera.dolly(this.step);
                    break;
                case 's':
                case 'KeyS':
                case 'ArrowDown':
                    this.camera.dolly(-this.step);
                    break;
                case 'ControlLeft':
                    this.camera.pedestal(-this.step);
                    break;
                case 'Space':
                    this.camera.pedestal(this.step);
                    break;
                case 'q':
                case 'KeyQ':
                    this.camera.cant(Radian.fromDegree(this.step));
                    break;
                case 'e':
                case 'KeyE':
                    this.camera.cant(Radian.fromDegree(-this.step));
                    break;
                default:
                    return;
            }
        }

        return this;
    }

    addInstance(color) {
        if (!color) {
            color = [Math.random(), Math.random(), Math.random(), 1];
        }
        const distance = 25;
        return this.cube.addInstance(
            CubeWorld.generateRandomPosition(distance), CubeWorld.generateRandomPosition(distance), CubeWorld.generateRandomPosition(distance),
            1, 1, 1,
            color);
    }


    updateRender(data) {
        this.context.updateCanvas(data);

        return this;
    }

    start() {
        this.init().updateRender({
            fog: this.fog,
            light: this.light,
            viewMatrix: this.camera.getMatrix(),
            vertexMatrix: Matrix4.identityMatrix().values,
            click: 0,
            buffer: this.cube.getInstancesData(),
            drawCount: this.cube.drawCount * this.cube.instances.length
        }).draw();

        return this;
    }

    draw() {
        if (this.clicked) {
            this.camera.dolly(this.step);
        }
        if (this.movementX) {
            this.camera.pan(Radian.fromDegree(this.movementX * -this.step));
        }
        if (this.movementY) {
            this.camera.tilt(Radian.fromDegree(this.movementY * -this.step));
        }
        this.updateRender({
            viewMatrix: this.camera.getMatrix(),
        });
        this.context.draw();
        requestAnimationFrame(this.draw.bind(this));
    }

    static generateRandomPosition(distance) {
        return Math.round(Math.random() * distance - Math.random() * distance);
    }
}