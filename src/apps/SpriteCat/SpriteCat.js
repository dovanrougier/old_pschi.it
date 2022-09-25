import { App } from '../../libs/core/App';
import { WebGLContext } from './WebGLContext';
import { Img } from '../../libs/html/Img';

import { Cat } from './Cat';
import { Camera } from '../../libs/3d/Camera';
import { WebGLCanvas } from '../../libs/html/WebGLCanvas';
import { Interior } from './Interior';

export class SpirteCat extends App {
    constructor(parent, options) {
        super(parent, options);
    }

    init() {
        this.context = new WebGLContext(this.container, null, { alpha: false });
        this.data = WebGLContext.contract;
        window.onresize = (e) => {
            WebGLCanvas.setAspect(this.context.gl);
            this.camera.setPerspective(45, this.context.getAspect(), 0.1, 1000);
        };

        this.max = 100;
        this.min = -this.max;
        this.then = 0;
        this.clicked = false;
        this.movementX = 0;
        this.movementY = 0;

        this.cat = new Cat(0, 0);
        this.cat.walk();
        this.data.cat.buffer = this.cat.getBufferData();
        this.data.cat.vertexMatrix = this.cat.getMatrix();

        this.tileMap = new Interior(0, 0, 1600, 1600);
        this.data.tileMap.buffer = this.tileMap.getBufferData();
        this.data.tileMap.vertexMatrix = this.tileMap.getMatrix();

        this.camera = new Camera(
            [0, 0, 512],
            [0, 0, 0],
            [0, 1, 0],
            45,
            this.context.getAspect(),
            0.1,
            1000
        );
        this.data.viewMatrix = this.camera.getMatrix();

        this.imgLoader = [];
        this.imgLoader.push(new Img(null, {
            src: Cat.texture.src,
            onload: () => {
                this.imgLoader.push(new Img(null, {
                    src: Interior.texture.src,
                    onload: () => {
                        this.data.tileMap.texture = this.imgLoader[1].element;
                        requestAnimationFrame(this.updateRender.bind(this));
                    }
                }));
                this.data.cat.texture = this.imgLoader[0].element;
            }
        }));

        this.initControl();

        return this;
    }

    updateMovement(e) {
        this.movementX += e.movementX;
        this.movementY += e.movementY;
        this.movementX = Math.max(this.min, Math.min(this.movementX, this.max));
        this.movementY = Math.max(this.min, Math.min(this.movementY, this.max));
    }

    initControl() {
        this.step = 0.01;
        this.context.element.onpointerdown = e => {
            this.clicked = true;
            this.context.requestPointerLock();
            this.updateMovement(e);
        };
        this.context.element.onpointerup = e => {
            document.exitPointerLock = document.exitPointerLock ||
                document.mozExitPointerLock;
            document.exitPointerLock();
            this.movementX = 0;
            this.movementY = 0;
            this.clicked = false;
        };
        this.context.element.onpointermove = e => {
            if (this.clicked) {
                this.updateMovement(e);
            }
        };

        document.onkeydown = e => {
            switch (e.code) {
                case 'a':
                case 'KeyA':
                case 'ArrowLeft':
                    this.movementX = -this.max;
                    break;
                case 'd':
                case 'KeyD':
                case 'ArrowRight':
                    this.movementX = this.max;
                    break;
                case 'w':
                case 'KeyW':
                case 'ArrowUp':
                    this.movementY = -this.max;
                    break;
                case 's':
                case 'KeyS':
                case 'ArrowDown':
                    this.movementY = this.max;
                    break;
                default:
                    return;
            }
            this.clicked = true;
        };

        document.onkeyup = e => {
            this.movementX = 0;
            this.movementY = 0;
            this.clicked = false;
        }

        return this;
    }

    updateRender(now) {
        this.updateCat();
        if (this.camera.hasMoved) {
            this.data.viewMatrix = this.camera.getMatrix();
        }

        this.context.updateCanvas(this.data);
        this.data = {};
        requestAnimationFrame(this.updateRender.bind(this));
    }

    updateCat() {
        this.data.cat = this.data.cat || {};
        if (this.clicked) {
            let x = this.movementX * this.step,
                y = -this.movementY * this.step;
            this.cat.translate(x, y);
            this.data.cat.vertexMatrix = this.cat.getMatrix();
            if (x) {
                this.camera.truck(x)
            }
            if (y) {
                this.camera.pedestal(y);
            }

        }
        if (this.cat.walk(this.movementX, -this.movementY)) {
            this.data.cat.buffer = this.cat.getBufferData();
        }
    }

    start() {
        this.init();

        return this;
    }
}