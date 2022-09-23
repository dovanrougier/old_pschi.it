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
        canvas.context.drawImage(this.element, 0, 0, this.element.width, this.element.height);
        canvas.context.drawImage(image.element, this.element.width, 0, image.element.width, image.element.height);

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
        canvas.context.drawImage(this.element, 0, 0, this.element.width, this.element.height);
        canvas.context.drawImage(image.element, 0, this.element.height, image.element.width, image.element.height);

        var img = canvas.element.toDataURL("image/png");
        resultOptions.src = img;

        const result = new Img(resultParent, resultOptions);

        return result;
    }


    static loadImage(src, onload) {
        const img = new Img();
        img.loadImage(src, onload);
        return this;
    }
}