import { State } from '../../libs/core/State';
import { Canvas } from '../../libs/html/Canvas';
import { Slider } from '../../libs/html/Slider';
import { Button } from '../../libs/html/Button';
import { WebGLContext } from './WebGLContext';
import { App } from '../../libs/core/App';

export class Paint extends App {
    constructor(parent, options) {
        super(parent, options);
    }

    init() {
        this.context = new WebGLContext(this.container, {
            aspect: 16 / 9,
        });

        this.state = new State(8);
        this.clicked = false;
        this.inCanvas = false;
        this.configuration = {
            position: [0, 0],
            pointSize: 10,
            pointLimit: 1,
            red: 1,
            green: 1,
            blue: 1,
            alpha: 1,
        };

        this.createControl();

        return this;
    }

    createControl() {
        this.createButton();
        this.createEventListener();
    }

    createButton() {
        this.control = [];
        const updatePointSize = (event) => {
            this.configuration.pointSize = event.target.value;
        }
        const step = 0.1;
        this.control.push(new Slider(this.container, {
            id: 'pointSize',
            min: 0,
            max: 100,
            step: 1,
            value: this.configuration.pointSize,
            oninput: updatePointSize,
            onchange: updatePointSize,
        }));
        const updatePointLimit = (event) => {
            this.configuration.pointLimit = event.target.value;
        }
        this.control.push(new Slider(this.container, {
            id: 'pointLimit',
            min: 0,
            max: 1,
            step: step,
            value: this.configuration.pointLimit,
            oninput: updatePointLimit,
            onchange: updatePointLimit,
        }));
        const updateRed = (event) => {
            this.configuration.red = event.target.value;
        }
        this.control.push(new Slider(this.container, {
            id: 'red',
            min: 0,
            max: 1,
            step: step,
            value: this.configuration.red,
            oninput: updateRed,
            onchange: updateRed,
        }));
        const updateGreen = (event) => {
            this.configuration.green = event.target.value;
        }
        this.control.push(new Slider(this.container, {
            id: 'green',
            min: 0,
            max: 1,
            step: step,
            value: this.configuration.green,
            oninput: updateGreen,
            onchange: updateGreen,
        }));
        const updateBlue = (event) => {
            this.configuration.blue = event.target.value;
        }
        this.control.push(new Slider(this.container, {
            id: 'blue',
            min: 0,
            max: 1,
            step: step,
            value: this.configuration.blue,
            oninput: updateBlue,
            onchange: updateBlue,
        }));
        const updateAlpha = (event) => {
            this.configuration.alpha = event.target.value;
        }
        this.control.push(new Slider(this.container, {
            id: 'alpha',
            min: 0,
            max: 1,
            step: step,
            value: this.configuration.alpha,
            oninput: updateAlpha,
            onchange: updateAlpha,
        }));

        this.control.push(new Button(this.container, {
            id: 'previous',
            onclick: (e) => {
                if (this.state.previous()) {
                    this.updateRender(new Float32Array(this.state.getData()));
                }
            }
        }));

        this.control.push(new Button(this.container, {
            id: 'next',
            onclick: (e) => {
                if (this.state.next()) {
                    this.updateRender(new Float32Array(this.state.getData()));
                }
            }
        }));
    }

    createEventListener() {
        this.context.element.onpointermove = this.updateState.bind(this);
        this.context.element.onpointerenter = e => {
            this.inCanvas = true;
            this.clicked = e.buttons != 0;
        };
        this.context.element.onpointerleave = e => {
            this.inCanvas = false;
        };
        this.context.element.onpointercancel = e => {
            this.inCanvas = false;
            this.clicked = false;
        };
        this.context.element.onpointerup = e => {
            this.clicked = false;
        };
        this.context.element.onpointerdown = e => {
            this.clicked = true;
            this.state.new();
            this.updateState(e);
        };
    }

    updateState(event) {
        if (this.clicked && this.inCanvas) {
            this.configuration.position = Canvas.getMouseRelativePositon(event, this.context.element);
            const round = 80;
            this.state.push([
                this.configuration.position[0],
                this.configuration.position[1],
                this.configuration.pointSize,
                this.configuration.pointLimit,
                this.configuration.red,
                this.configuration.green,
                this.configuration.blue,
                this.configuration.alpha
            ]);
        }

        return this;
    }

    updateRender() {
        let data;
        if (this.state.updated) {
            data = this.state.getData()
        }
        this.context.updateCanvas(data);

        requestAnimationFrame(this.updateRender.bind(this));
    }

    start() {
        this.init().updateRender();

        return this;
    }
}