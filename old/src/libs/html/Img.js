import { Canvas2d } from "./Canvas2d";
import { HtmlElement } from "./HtmlElement";

export class Img extends HtmlElement {
    static elementTag = 'img';

    constructor(parent, options) {
        super(parent, Img.elementTag, options);
        if(options.src){
            this.loadImage(options.src, options.onload);
        }
    }

    loadImage(src, onload) {
        this.element.src = src;
        if(onload){
            this.element.onload = onload;
        }

        return this;
    }

    concatImageX(image, resultParent, resultOptions) {
        if(!resultOptions){
            resultOptions = {};
        }
        resultOptions.width =  this.element.width + image.element.width;
        resultOptions.height = this.element.height > image.element.height ? this.element.height : image.element.height;

        const canvas = new Canvas2d(null, {
            width: resultOptions.width,
            height: resultOptions.height
        });
        canvas.drawImage(this.element, 0, 0, this.element.width, this.element.height);
        canvas.drawImage(image.element, this.element.width, 0, image.element.width, image.element.height);

        var img = canvas.element.toDataURL("image/png");
        resultOptions.src = img;

        const result = new Img(resultParent, resultOptions);

        return result;
    }

    concatImageY(image, resultParent, resultOptions) {
        if(!resultOptions){
            resultOptions = {};
        }
        resultOptions.height =  this.element.height + image.element.height;
        resultOptions.width = this.element.width > image.element.width ? this.element.width : image.element.width;

        const canvas = new Canvas2d(null, {
            width: resultOptions.width,
            height: resultOptions.height
        });
        canvas.drawImage(this.element, 0, 0, this.element.width, this.element.height);
        canvas.drawImage(image.element, 0, this.element.height, image.element.width, image.element.height);

        var img = canvas.element.toDataURL("image/png");
        resultOptions.src = img;

        const result = new Img(resultParent, resultOptions);

        return result;
    }

    flipY(onload){
        const canvas = new Canvas2d();
        canvas.translate(this.element.width, 0);
        canvas.scale(-1,1);
        canvas.drawImage(this.element, 0, 0, this.element.width, this.element.height);

        var img = canvas.element.toDataURL("image/png");
        this.element.onload = onload;
        this.element.src = img;
        
        return this;
    }


    static loadImage(src, onload) {
        const img = new Img();
        img.loadImage(src, onload);
        return img;
    }

    static drawStick(onload){
        const canvas = new Canvas2d();
        canvas.shadowColor = "#FF9900";
        canvas.shadowBlur = 15;
        canvas.strokeStyle = "#FF9900";
        canvas.fillStyle = "#FF9900";
        canvas.fillRect(25, 25, 100, 100);
        canvas.clearRect(45, 45, 60, 60);
        canvas.strokeRect(50, 50, 50, 50);

        var src = canvas.element.toDataURL("image/png");
        
        return new Img(null, {
            src: src,
            onload: onload,
        });
    }
}