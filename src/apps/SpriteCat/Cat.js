import { Sprite } from '../../libs/2d/Sprite';
import textureSrc from './cat.png';

export class Cat extends Sprite {
    constructor(x, y, variant) {
        super(x, y, Cat.texture.tileWidth, Cat.texture.tileHeight, 0, 0);
        this.setVariant(variant);
        this.refreshRate = 8;
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
            left: [[64, 96], [0, 96], [32, 96]],
            right: [[64, 0], [0, 0], [32, 0]],
            up: [[64, 32], [0, 32], [32, 32]],
            down: [[64, 64], [0, 64], [32, 64]],
        },
        idle: {
            down: [[32, 96]],
            right: [[32, 0]],
            up: [[32, 32]],
            down: [[32, 64]],
        },
        sleep: {
            left: [[96, 96]],
            right: [[96, 0]],
        },
        action: {
            left: [[0, 160], [32, 160], [64, 160], [96, 160]],
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

    walk(x, y) {
        if (x == 0 && y == 0) {
            return;
        }
        if (Math.abs(x) > Math.abs(y)) {
            if (x > 0) {
                this.play(Cat.animations.walk.right);
            } else {
                this.play(Cat.animations.walk.left);
            }
        } else if (Math.abs(y) > Math.abs(x)) {
            if (y > 0) {
                this.play(Cat.animations.walk.up);
            } else {
                this.play(Cat.animations.walk.down);
            }
        }
        this.translate(x, y, 0);
        if (this.tileCounter++ % this.refreshRate == 0) {
            return this.nextFrame();
        }
        return null;
    }

    render() {
        return this.getTile();
    }
}