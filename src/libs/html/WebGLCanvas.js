import { Canvas } from "./Canvas";

export class WebGLCanvas extends Canvas{
    constructor(parent, canvasOptions, webglOptions){
        super(parent,canvasOptions);

        this.gl = this.element.getContext('webgl', webglOptions) || this.element.getContext('experimental-webgl', webglOptions);
        
        WebGLCanvas.setAspect(this.gl, canvasOptions?.aspect);
        window.onresize = (e) => { WebGLCanvas.setAspect(this.gl, canvasOptions?.aspect); };
    }
    
    static setAspect(gl, aspect) {
        Canvas.setAspect(gl.canvas, aspect);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
}