import { CubeWorld } from "./apps/webgl-cubes/CubeWorld";
import { Paint } from "./apps/webgl-paint/Paint";
import './style.css';

function setApp(appName) {
    app.stop();
    app.remove();
    switch (appName) {
        case 'paint':
            app = new Paint(document.body);
            break;
        case 'cube-world':
            app = new CubeWorld(document.body);
            break;
    }
    app.start();
}

let app = new CubeWorld(document.body);
app.start();

document.setApp = setApp;

