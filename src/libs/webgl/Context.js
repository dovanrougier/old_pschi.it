export class Context{
    constructor(context){
        this.gl = context;
    }

    viewport(x, y, width, height) {
        this.gl.viewport(x, y, width, height);
    }

    clearColor(r, g, b, a) {
        this.gl.clearColor(r, g, b, a);
    }

    enableDepthTest() {
        this.gl.enable(this.gl.DEPTH_TEST);
    }

    disableDepthTest() {
        this.gl.disable(this.gl.DEPTH_TEST);
    }

    clear() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
}