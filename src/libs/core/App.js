import { Div } from '../../libs/html/Div';
import { Canvas } from '../../libs/html/Canvas';

export class App extends Div {
    constructor(parent, options) {
        super(parent, options);
        this.container = new Div(this);
    }

    stop() {
        this.state = null;
        this.context = null;
        this.container.remove();

        return this;
    }
}