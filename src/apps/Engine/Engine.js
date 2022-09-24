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

    start() {
        console.log('Hello');
    }
}