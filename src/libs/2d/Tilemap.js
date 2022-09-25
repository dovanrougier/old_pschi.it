import { RepeatedTile } from './RepeatedTile';
import { Rectangle } from './Rectangle';

export class TileMap extends Rectangle {
    constructor(x, y, width, height, mapping, tileWidth, tileHeight, textureWidth, textureHeight, color) {
        super(x, y, width, height, color);
        this.mapping = mapping;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.textureWidth = textureWidth;
        this.textureHeight = textureHeight;
    }

    isInFrame(x, y) {
        return true;
    }

    getBufferData() {
        const totalCount = 24 * ((this.width / this.tileWidth) * (this.height / this.tileHeight));
        const result = new Array(totalCount);
        let i = 0;
        const textureWidth = this.tileWidth / this.textureWidth,
            textureHeight = this.tileHeight / this.textureHeight;
        this.mapping.forEach(tile => {
            let x = tile[0],
                y = tile[1],
                width = tile[2],
                height = tile[3];
            const u = tile[4] * textureWidth,
                v = tile[5] * textureHeight,
                uw = u + textureWidth,
                vh = v + textureHeight;
            do {
                const instanceX = x,
                    instanceY = y,
                    instanceWidth = this.tileWidth,
                    instanceHeight = this.tileHeight,
                    xw = instanceX + instanceWidth,
                    yh = instanceY + instanceHeight;

                result[i++] = instanceX;
                result[i++] = instanceY;
                result[i++] = uw;
                result[i++] = vh;

                result[i++] = instanceX;
                result[i++] = yh;
                result[i++] = uw;
                result[i++] = v;

                result[i++] = xw;
                result[i++] = yh;
                result[i++] = u;
                result[i++] = v;

                result[i++] = xw;
                result[i++] = yh;
                result[i++] = u;
                result[i++] = v;

                result[i++] = xw;
                result[i++] = instanceY;
                result[i++] = u;
                result[i++] = vh;

                result[i++] = instanceX;
                result[i++] = instanceY;
                result[i++] = uw;
                result[i++] = vh;

                x += this.tileWidth;
                width -= this.tileWidth;
                if (width <= 0) {
                    x = tile[0];
                    width = tile[2];
                    y += this.tileHeight;
                    height -= this.tileHeight;
                }
            } while (height > 0);
        });
        return result;
    }
}