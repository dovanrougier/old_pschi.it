import { CubeWorld } from "./apps/webgl-cubes/CubeWorld";
import { Paint } from "./apps/webgl-paint/Paint";

function setApp(appName) {
    if(currentApp){
        app.stop();
        app.remove();
    }
    let app;
    switch (appName) {
        case 'paint':
            app = new Paint(document.body);
            break;
        case 'cube-world':
            app = new CubeWorld(document.body);
            break;
    }
    currentApp = app;
    app.start();
    return app;
}

document.documentElement.style.height = '100%';
document.documentElement.style.width = '100%';
document.documentElement.style.margin = '0';

document.body.style.height = '100%';
document.body.style.width = '100%';
document.body.style.margin = '0';

let currentApp;
setApp('cube-world');

document.setApp = setApp;


