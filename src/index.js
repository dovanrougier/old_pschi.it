import { PerspectiveCamera } from './libs/3d/camera/PerspectiveCamera';
import { Cube } from './libs/3d/geometry/Cube';
import { Plane } from './libs/3d/geometry/Plane';
import { AmbientLight } from './libs/3d/light/AmbientLight';
import { DirectionalLight } from './libs/3d/light/DirectionalLight';
import { Node3D } from './libs/3d/Node3D';
import { Fog } from './libs/3d/scene/Fog';
import { Scene } from './libs/3d/scene/Scene';
import { HtmlNode } from './libs/html/HtmlNode';
import { WebGLCanvas } from './libs/html/WebGLCanvas';
import { Vector3 } from './libs/math/Vector3';


window.onresize = (e) => {
    canvas.fitParent();
};

const canvas = new WebGLCanvas();
HtmlNode.setDocument();
canvas.appendToBody();
canvas.fitParent();

const scene = new Scene();
scene.fog = new Fog(10, 20, new Vector3(0, 0, 0));

const camera = new PerspectiveCamera(
    45,
    canvas.getAspectRatio(),
    0.1,
    1000);
scene.appendChild(camera);

const ambientLight = new AmbientLight(new Vector3(0.2, 0.2, 0.2));
scene.appendChild(ambientLight);

const pointLight = new DirectionalLight(new Vector3(1, 1, 1), 1, [0, 5, -5]);
scene.appendChild(pointLight);

const node3d = new Node3D();
node3d.geometry = new Cube();
node3d.translate(0, 0, -5);

scene.appendChild(node3d);

canvas.appendChild(scene);

requestAnimationFrame(start);

function start(now) {
    node3d.rotate(0.01, 1,1,1);
    canvas.draw();
    requestAnimationFrame(start);
}