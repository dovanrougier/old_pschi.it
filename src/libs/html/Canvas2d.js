import { Canvas } from "./Canvas";

export class Canvas2d extends Canvas{
    constructor(parent, canvasOptions, contextOptions){
        super(parent,canvasOptions);

        this.context = this.element.getContext('2d', contextOptions);
    }
}