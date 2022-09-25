import { RepeatedTile } from '../../libs/2d/RepeatedTile';
import { Matrix4 } from '../../libs/math/Matrix4';
import textureSrc from './interior.png';

export class TileMap {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.matrix = Matrix4.identityMatrix().translate(-width / 2, -height / 2, 0);
        this.setDimensions(width, height);
    }

    setPosition(x, y) {
        if (x != this.x || y != this.y) {
            this.x = x;
            this.y = y;

            return true;
        }
        return false;
    }

    setDimensions(width, height) {
        if (width != this.width || height != this.height) {
            this.width = width;
            this.height = height;


            this.updateTiles();
            return true;
        }
        return false;
    }

    updateTiles() {
        let x = 0;
        let y = 0;


        const width = this.width / 2,
            height = this.height,
            tileMap = [
                [0, 0, width, height, 1, 1],
                [width, 0, width, height, 1, 0],
            ];

        this.tiles = tileMap.map(t =>
            new RepeatedTile(
                t[0], t[1],
                TileMap.texture.tileWidth, TileMap.texture.tileHeight,
                t[2], t[3],
                t[4], t[5],
                TileMap.texture.tileWidth / TileMap.texture.width, TileMap.texture.tileHeight / TileMap.texture.height)
        );
    }

    isInFrame(tile) {
        return true;
    }

    getBufferData() {
        return this.tiles.flatMap(t => t.getBufferData());
    }

    static texture = {
        src: textureSrc,
        width: 256,
        height: 256,
        tileWidth: 16,
        tileHeight: 16,
    };

    static tile = {
        floor: {
            wood: [[0, 0], [1, 0], [2, 0]],
            tile: [[0, 1], [1, 1], [2, 1]]
        }
    }

    getMatrix() {
        return this.matrix.values;
    }
}