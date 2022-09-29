import { Rectangle } from './Rectangle';

export class TileMap extends Rectangle {
    constructor(x, y, width, height, tileWidth, tileHeight, textureWidth, textureHeight, color) {
        super(x, y, width, height, color);
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.textureWidth = textureWidth;
        this.textureHeight = textureHeight;
    }

    isInFrame(x, y) {
        return true;
    }

    static getBufferData(mapping, width, height, tileWidth, tileHeight, textureWidth, textureHeight) {
        const totalCount = 24 * ((width / tileWidth) * (height / tileHeight));
        const result = new Array(totalCount);
        let i = 0;
        textureWidth = tileWidth / textureWidth;
        textureHeight = tileHeight / textureHeight;
        mapping.forEach(tile => {
            let x = tile[0],
                y = tile[1],
                width = tile[2],
                height = tile[3];
            const u = tile[4][0] * textureWidth,
                v = tile[4][1] * textureHeight,
                uw = u + textureWidth,
                vh = v + textureHeight;
            do {
                const instanceX = x,
                    instanceY = y,
                    instanceWidth = tileWidth,
                    instanceHeight = tileHeight,
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

                x += tileWidth;
                width -= tileWidth;
                if (width <= 0) {
                    x = tile[0];
                    width = tile[2];
                    y += tileHeight;
                    height -= tileHeight;
                }
            } while (height > 0);
        });
        return result;
    }
}
