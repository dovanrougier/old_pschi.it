import { Rectangle } from "./Rectangle";

export class Tile extends Rectangle {
    constructor(x, y, width, height, u, v, tileWidth, tileHeight) {
        super(x, y, width, height);
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.setUV(u, v);
    }

    setTileDimension(tileWidth, tileHeight) {
        if (this.tileWidth != tileWidth || this.tileHeight != tileHeight) {
            this.tileWidth = tileWidth;
            this.tileHeight = tileHeight;

            this.textureBuffer = Tile.getTextureBuffer(this.u, this.v, this.tileWidth, this.tileHeight);
            this.bufferData = Tile.getBufferData(this.vertexBuffer, this.textureBuffer);

            return true;
        }
        return false;
    }

    setUV(u, v) {
        if (this.u != u || this.v != v) {
            this.u = u;
            this.v = v;

            this.textureBuffer = Tile.getTextureBuffer(this.u, this.v, this.tileWidth, this.tileHeight);
            this.bufferData = Tile.getBufferData(this.vertexBuffer, this.textureBuffer);

            return true;
        }
        return false;
    }

    getTextureBuffer() {
        return this.textureBuffer;
    }

    getBufferData() {
        return this.bufferData;
    }

    static getTextureBuffer(u, v, width, height) {
        u *= width;
        v *= height;
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

    static getBufferData(vertexBuffer, textureBuffer) {
        return [
            vertexBuffer[0], vertexBuffer[1], textureBuffer[0], textureBuffer[1],
            vertexBuffer[2], vertexBuffer[3], textureBuffer[2], textureBuffer[3],
            vertexBuffer[4], vertexBuffer[5], textureBuffer[4], textureBuffer[5],

            vertexBuffer[6], vertexBuffer[7], textureBuffer[6], textureBuffer[7],
            vertexBuffer[8], vertexBuffer[9], textureBuffer[8], textureBuffer[9],
            vertexBuffer[10], vertexBuffer[11], textureBuffer[10], textureBuffer[11],
        ];
    }
}