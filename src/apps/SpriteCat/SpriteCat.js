import { App } from '../../libs/core/App';
import { WebGLContext } from './WebGLContext';
import { Img } from '../../libs/html/Img';

import { Cat } from './Cat';
import { Camera } from '../../libs/3d/Camera';
import { Matrix4 } from '../../libs/math/Matrix4';

export class SpirteCat extends App {
    constructor(parent, options) {
        super(parent, options);
    }

    init() {
        this.context = new WebGLContext(this.container, null, { alpha: true });

        this.max = 50;
        this.min = -this.max;
        this.then = 0;
        this.clicked = false;
        this.movementX = 0;
        this.movementY = 0;
        this.cat = new Cat(0, 0);

        this.camera = new Camera(
            [0, 0, -512],
            [0, 0, 0],
            [0, 1, 0],
            45,
            this.context.getAspect(),
            0.1,
            1000
        );
        this.imgLoader = new Img(null, {
            src: Cat.texture.src,
            onload: () => {
                const buffer = this.cat.idleRight();

                this.updateRender({
                    buffer: buffer,
                    vertexMatrix: this.cat.getMatrix(),
                    viewMatrix: this.camera.getMatrix(),
                    texture: this.imgLoader.element
                });
                requestAnimationFrame(this.draw.bind(this));
            }
        });

        this.initControl();

        return this;
    }

    updateMovement(e) {
        this.movementX -= e.movementX;
        this.movementY += e.movementY;
        this.movementX = Math.max(this.min, Math.min(this.movementX, this.max));
        this.movementY = Math.max(this.min, Math.min(this.movementY, this.max));
    }

    initControl() {
        this.step = 0.001;
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
                    this.movementX = this.max;
                    break;
                case 'd':
                case 'KeyD':
                case 'ArrowRight':
                    this.movementX = -this.max;
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

    draw(now) {
        if (this.clicked) {
            const data = {
                vertexMatrix: this.cat.getMatrix(),
            }
            const buffer = this.cat.walk(this.movementX * this.step, -this.movementY * this.step);
            if (buffer) {
                data.buffer = buffer;
            }
            this.updateRender(data);
        }
        this.context.draw();
        requestAnimationFrame(this.draw.bind(this));
    }

    updateRender(data) {
        this.context.updateCanvas(data);

        return this;
    }

    start() {
        this.init();

        return this;
    }
}

function hello(){
    console.log('helloWorld');
}