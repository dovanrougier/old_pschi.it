import { Rectangle } from "./Rectangle";

export class Tile extends Rectangle {
    constructor(x, y, width, height, u, v, tileWidth, tileHeight) {
        super(x, y, width, height);
        this.setUV(u, v);
        this.setTileDimension(tileWidth, tileHeight);
    }

    setUV(u, v) {
        this.u = u;
        this.v = v;
    }

    setTileDimension(tileWidth, tileHeight) {
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
    }

    getTextureCoordinate() {
        return Tile.getTextureCoordinate(this.u, this.v, this.tileWidth, this.tileHeight);
    }

    getData() {
        return Tile.getData(this.x, this.y, this.width, this.height, this.u, this.v, this.tileWidth, this.tileHeight);
    }

    static getTextureCoordinate(u, v, width, height) {
        const uw = u + width,
            vh = v + height;

        return [
            uw, vh,
            uw, v,
            u, v,

            u, v,
            u, vh,
            uw, vh,
        ];
    }

    static getData(x, y, width, height, u, v, tileWidth, tileHeight) {
        //center the origin
        x = x - width / 2;
        y = y - height / 2;
        const xw = x + width,
            yh = y + height,
            uw = u + tileWidth,
            vh = v + tileHeight;

        return [
            x, y, uw, vh,
            x, yh, uw, v,
            xw, yh, u, v,

            xw, yh, u, v,
            xw, y, u, vh,
            x, y, uw, vh
        ];
    }
}