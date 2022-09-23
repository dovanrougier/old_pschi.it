import { CubeWorld } from "./apps/CubeWorld/CubeWorld";
import { Paint } from "./apps/Paint/Paint";
import { SpirteCat as SpriteCat } from "./apps/SpriteCat/SpriteCat";

function setApp(appName) {
    if (currentApp) {
        currentApp.stop();
        currentApp.remove();
    }
    let app;
    switch (appName) {
        case 'paint':
            app = new Paint(document.body);
            break;
        case 'cube-world':
            app = new CubeWorld(document.body);
            break;
        case 'sprite-cat':
            default:
            app = new SpriteCat(document.body);
            break;
    }
    currentApp = app;
    app.start();
    return app;
}

var app = window.location.pathname.replace('/','');
document.setApp = setApp;

document.documentElement.style.height = '100%';
document.documentElement.style.width = '100%';
document.documentElement.style.margin = '0';

document.body.style.height = '100%';
document.body.style.width = '100%';
document.body.style.margin = '0';

let currentApp;
setApp(app);


