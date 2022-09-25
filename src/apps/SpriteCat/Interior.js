import { TileMap } from '../../libs/2d/TileMap';
import { Matrix4 } from '../../libs/math/Matrix4';
import textureSrc from './interior.png';

export class Interior extends TileMap {
    constructor(x, y, width, height) {
        super(x, y, width, height,
            Interior.texture.tileWidth, Interior.texture.tileHeight,
            Interior.texture.width, Interior.texture.height);
        this.matrix = Matrix4.identityMatrix();

        this.mapping = Interior.texture.mapping;
        this.mapping = this.mapping.concat(
            this.createTable(64,64)
        )
    }

    createTable(x, y) {
        return [
            [x - this.tileWidth, y + this.tileHeight, this.tileWidth, this.tileHeight, Interior.tile.table.top.left],
            [x, y + this.tileHeight, this.tileWidth, this.tileHeight, Interior.tile.table.top.middle],
            [x + this.tileWidth, y + this.tileHeight, this.tileWidth, this.tileHeight, Interior.tile.table.top.right],

            [x - this.tileWidth, y, this.tileWidth, this.tileHeight, Interior.tile.table.middle.left],
            [x, y, this.tileWidth, this.tileHeight, Interior.tile.table.middle.middle],
            [x + this.tileWidth, y, this.tileWidth, this.tileHeight, Interior.tile.table.middle.right],

            [x - this.tileWidth, y - this.tileHeight, this.tileWidth, this.tileHeight, Interior.tile.table.bottom.left],
            [x, y - this.tileHeight, this.tileWidth, this.tileHeight, Interior.tile.table.bottom.middle],
            [x + this.tileWidth, y - this.tileHeight, this.tileWidth, this.tileHeight, Interior.tile.table.bottom.right],
        ]
    }

    getBufferData() {
        console.log(this.mapping);
        return TileMap.getBufferData(this.mapping, this.width, this.height, this.tileWidth, this.tileHeight, this.textureWidth, this.textureHeight);
    }

    static tile = {
        floor: {
            wood: [[0, 0], [1, 0], [2, 0]],
            tile: [[0, 1], [1, 1], [2, 1]],
        },
        table: {// x 12-13-15 y 3 4 5
            top: {
                right: [11, 3],
                middle: [12, 3],
                left: [13, 3],
            },
            middle: {
                right: [11, 4],
                middle: [12, 4],
                left: [13, 4],
            },
            bottom: {
                right: [11, 5],
                middle: [12, 5],
                left: [13, 5],
            }
        }
    }

    static createFloor(x, y, width, height, tile) {
        return [x, y, width, height, tile];
    }

    static texture = {
        src: textureSrc,
        width: 256,
        height: 256,
        tileWidth: 16,
        tileHeight: 16,
        mapping: [
            Interior.createFloor(0, 0, 512, 512, Interior.tile.floor.tile[1]),
            Interior.createFloor(-512, 0, 512, 512, Interior.tile.floor.tile[2]),
            Interior.createFloor(-512, -512, 512, 512, Interior.tile.floor.tile[0]),
            Interior.createFloor(0, -512, 512, 512, Interior.tile.floor.wood[1]),
        ]
    };
}