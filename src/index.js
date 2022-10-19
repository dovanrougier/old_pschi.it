import { PerspectiveCamera } from './libs/3d/camera/PerspectiveCamera';
import { Color } from './libs/core/Color';
import { CubeGrid } from './libs/3d/geometry/CubeGrid';
import { AmbientLight } from './libs/3d/light/AmbientLight';
import { DirectionalLight } from './libs/3d/light/DirectionalLight';
import { Node3D } from './libs/3d/Node3D';
import { Fog } from './libs/3d/scene/Fog';
import { Scene } from './libs/3d/scene/Scene';
import { HtmlNode } from './libs/html/HtmlNode';
import { WebGLCanvas } from './libs/html/WebGLCanvas';
import { Cube } from './libs/3d/geometry/Cube';


window.onresize = (e) => {
    canvas.fitParent();
};

const canvas = new WebGLCanvas();
HtmlNode.setDocument();
canvas.appendToBody();
canvas.fitParent();

const scene = new Scene();
scene.background = new Color(0.5, 0.5, 0.5);
scene.fog = new Fog(10, 100, scene.background);

const camera = new PerspectiveCamera(
    45,
    canvas.getAspectRatio(),
    0.1,
    1000);
scene.appendChild(camera);

const ambientLight = new AmbientLight(scene.background);
scene.appendChild(ambientLight);

const pointLight = new DirectionalLight(new Color(1, 1, 1), 1, [0, 5, -5]);
scene.appendChild(pointLight);

const cube = new Cube();
const node = new Node3D();
node.geometry = cube;
node.translate(0, 0, -5);
cube.material.rainbow = true;
cube.material.wireframe = true;
node.debug = false;
scene.appendChild(node);

// const cubeGrid = new Cube(2,2,2);
// const nodeGrid = new Node3D();
// nodeGrid.geometry = cubeGrid;
// nodeGrid.translate(-2, 0, -5);
// cubeGrid.material.rainbow = true;
// cubeGrid.material.points = false;
// cubeGrid.material.pointSize = 10;
// nodeGrid.debug = false;
// scene.appendChild(nodeGrid);


// const plane = new Plane();
// const node2 = new Node3D();
// node2.geometry = plane;
// plane.material.rainbow = true;
// plane.material.wireframe = true;
// node2.translate(-2, 0, -5);
// scene.appendChild(node2);

canvas.appendChild(scene);

requestAnimationFrame(start);

function start(now) {
    node.rotate(0.01, 1, 1, 1);
    // nodeGrid.rotate(0.01, 1, 1, 1);
    canvas.draw();
    requestAnimationFrame(start);
}