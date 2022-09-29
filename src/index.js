import { PerspectiveCamera } from './libs/3d/camera/PerspectiveCamera';
import { Scene } from './libs/3d/scene/Scene';
import { WebGLCanvas } from './libs/html/WebGLCanvas';

document.documentElement.style.height = '100%';
document.documentElement.style.width = '100%';
document.documentElement.style.margin = '0';

document.body.style.height = '100%';
document.body.style.width = '100%';
document.body.style.margin = '0';

window.onresize = (e) => {
    canvas.fitBody();
};

const canvas = new WebGLCanvas();
canvas.appendToHtmlElement(document.body);
canvas.fitBody();

const scene = new Scene();

canvas.render(scene);