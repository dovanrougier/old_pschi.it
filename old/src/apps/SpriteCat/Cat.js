import { Sprite } from '../../libs/2d/Sprite';
import textureSrc from './cat.png';

export class Cat extends Sprite {
    constructor(x, y, variant) {
        super(x, y, Cat.texture.tileWidth, Cat.texture.tileHeight, 0, 0, Cat.texture.tileWidth / Cat.texture.width, Cat.texture.tileHeight / Cat.texture.height);
        this.setVariant(variant);
        this.refreshRate = 8;
        this.idle = Cat.animations.idle.right;
    }

    static texture = {
        src: textureSrc,
        width: 512,
        height: 256,
        tileWidth: 32,
        tileHeight: 32,
    };
    static animations = {
        walk: {
            right: [[2, 3, 5], [0, 3, 5], [1, 3, 5]],
            left: [[2, 0, 5], [0, 0, 5], [1, 0, 5]],
            up: [[2, 1, 5], [0, 1, 5], [1, 1, 5]],
            down: [[2, 2, 5], [0, 2, 5], [1, 2, 5]],
        },
        idle: {
            right: [[1, 3]],
            left: [[1, 0]],
            up: [[1, 1]],
            down: [[1, 2]],
        },
        sleep: {
            left: [[3, 3]],
            right: [[3, 0]],
        },
        action: [[0, 4], [1, 4], [2, 4], [3, 4]],
    };

    setVariant(variant) {
        this.setOffset((variant ?? 0) % 4 * this.width * 4);
    }

    setOffset(offset) {
        this.offset = offset;
    }

    walk(x, y) {
        if (Math.abs(x) > Math.abs(y)) {
            if (x > 0) {
                this.idle = Cat.animations.idle.right;
                this.animation = Cat.animations.walk.right;
            } else {
                this.idle = Cat.animations.idle.left;
                this.animation = Cat.animations.walk.left;
            }
        } else if (Math.abs(y) > Math.abs(x)) {
            if (y > 0) {
                this.idle = Cat.animations.idle.up;
                this.animation = Cat.animations.walk.up;
            } else {
                this.idle = Cat.animations.idle.down;
                this.animation = Cat.animations.walk.down;
            }
        }
        if(x== 0 && y == 0){
            return this.play(this.idle);
        }
        return this.play(this.animation ?? this.idle);
    }
}