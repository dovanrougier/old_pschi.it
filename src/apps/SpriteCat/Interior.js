import { TileMap } from '../../libs/2d/TileMap';
import { Matrix4 } from '../../libs/math/Matrix4';
import textureSrc from './interior.png';

export class Interior extends TileMap {
    constructor(x, y, width, height) {
        super(
            x, y, width, height,
            Interior.texture.tileMap,
            Interior.texture.tileWidth, Interior.texture.tileHeight,
            Interior.texture.width, Interior.texture.height);
        this.matrix = Matrix4.identityMatrix();
    }

    static texture = {
        src: textureSrc,
        width: 256,
        height: 256,
        tileWidth: 16,
        tileHeight: 16,
        tileMap: [
            [0, 0, 512, 512, 1, 1],
            [-512, 0, 512, 512, 2, 1],
            [-512, -512, 512, 512, 0, 1],
            [0, -512, 512, 512, 1, 0],
        ]
    };

    static tile = {
        floor: {
            wood: [[0, 0], [1, 0], [2, 0]],
            tile: [[0, 1], [1, 1], [2, 1]]
        }
    }
}