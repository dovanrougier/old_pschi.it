import { Tile } from "./Tile";

export class RepeatedTile extends Tile {
    constructor(x, y, width, height, totalWidth, totalHeight, u, v, tileWidth, tileHeight) {
        super(x, y, width, height, u, v, tileWidth, tileHeight);
        this.totalWidth = totalWidth;
        this.totalHeight = totalHeight;
    }

    getBufferData() {
        let result = new Array((this.totalWidth / this.width) * (this.totalHeight * this.height));
        let x = this.x,
            y = this.y,
            i = 0;

        do {
            result[i++] = this.vertexBuffer[0] + x;
            result[i++] = this.vertexBuffer[1] + y;
            result[i++] = this.textureBuffer[0];
            result[i++] = this.textureBuffer[1];

            result[i++] = this.vertexBuffer[2] + x;
            result[i++] = this.vertexBuffer[3] + y;
            result[i++] = this.textureBuffer[2];
            result[i++] = this.textureBuffer[3];

            result[i++] = this.vertexBuffer[4] + x;
            result[i++] = this.vertexBuffer[5] + y;
            result[i++] = this.textureBuffer[4];
            result[i++] = this.textureBuffer[5];

            result[i++] = this.vertexBuffer[6] + x;
            result[i++] = this.vertexBuffer[7] + y;
            result[i++] = this.textureBuffer[6];
            result[i++] = this.textureBuffer[7];

            result[i++] = this.vertexBuffer[8] + x;
            result[i++] = this.vertexBuffer[9] + y;
            result[i++] = this.textureBuffer[8];
            result[i++] = this.textureBuffer[9];

            result[i++] = this.vertexBuffer[10] + x;
            result[i++] = this.vertexBuffer[11] + y;
            result[i++] = this.textureBuffer[10];
            result[i++] = this.textureBuffer[11];

            x += this.width;
            if (x > this.totalWidth) {
                x = 0;
                y += this.height;
            }

        } while (y < this.totalHeight);
        return result;
    }
}