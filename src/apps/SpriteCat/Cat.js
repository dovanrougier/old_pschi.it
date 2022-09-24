import { Sprite } from '../../libs/2d/Sprite';
import textureSrc from './cat.png';

export class Cat extends Sprite {
    constructor(x, y, variant) {
        super(x, y, Cat.texture.tileWidth, Cat.texture.tileHeight, 0, 0, Cat.texture.tileWidth / Cat.texture.width, Cat.texture.tileHeight / Cat.texture.height);
        this.setVariant(variant);
        this.refreshRate = 8;
        this.tileCounter = 0;
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
            left: [[2, 3], [0, 3], [1, 3]],
            right: [[2, 0], [0, 0], [1, 0]],
            up: [[2, 1], [0, 1], [1, 1]],
            down: [[2, 2], [0, 2], [1, 2]],
        },
        idle: {
            left: [[1, 3]],
            right: [[1, 0]],
            up: [[1, 1]],
            down: [[1, 2]],
        },
        sleep: {
            left: [[3, 3]],
            right: [[3, 0]],
        },
        action: {
            left: [[0, 4], [1, 4], [2, 4], [3, 4]],
        },
    };

    setVariant(variant) {
        this.setOffset((variant ?? 0) % 4 * this.width * 4);
    }

    setOffset(offset) {
        this.offset = offset;
    }

    idleLeft() {
        return this.play(Cat.animations.idle.left);
    }

    idleRight() {
        return this.play(Cat.animations.idle.right);
    }

    idleUp() {
        return this.play(Cat.animations.idle.up);
    }

    idleDown() {
        return this.play(Cat.animations.idle.down);
    }

    updateMovement(x, y) {
        this.translate(x, y, 0);
        this.walk(x, y);
    }

    walk(x, y) {
        let animation;
        if (Math.abs(x) > Math.abs(y)) {
            if (x > 0) {
                animation = Cat.animations.walk.right;
            } else {
                animation = Cat.animations.walk.left;
            }
        } else if (Math.abs(y) > Math.abs(x)) {
            if (y > 0) {
                animation = Cat.animations.walk.up;
            } else {
                animation = Cat.animations.walk.down;
            }
        }
        if(animation){
            console.log(this.tileCounter);
            if (this.tileCounter++ % this.refreshRate == 0) {
                this.tileCounter = 0;
                return this.play(animation);
            }
            return null;
        }
    }
}