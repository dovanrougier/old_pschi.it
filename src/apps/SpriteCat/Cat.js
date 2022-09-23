import { Matrix4 } from '../../libs/math/Matrix4';
import { Vector2 } from '../../libs/math/Vector2';
import textureSrc from './cat.png';

export class Cat {
    constructor(variant) {
        this.u = 1;
        this.v = 0;
        this.width = 32 / 512;
        this.height = 32 / 256;
        this.size = 1;
        this.matrix = Matrix4.identityMatrix();
        this.setVariant(variant);
        this.currentFrame = null;
        this.currentAnimation = null;
        this.frameCounter = 0;
    }

    static animations = {
        walk: {
            left: [[2, 3], [0, 3], [1, 3]],
            right: [[2, 0], [0, 0], [1, 0]],
            top: [[2, 1], [0, 1], [1, 1]],
            down: [[2, 2], [0, 2], [1, 2]],
        },
        idle: {
            left: [[1, 3]],
            right: [[1, 0]],
            top: [[1, 1]],
            down: [[1, 2]],
        }
    }

    setVariant(variant) {
        this.setOffset((variant ?? 0) % 4 * this.width * 4);
    }

    setOffset(offset) {
        this.offset = offset;
    }

    play(animation) {
        if (this.currentAnimation != animation) {
            this.currentAnimation = animation;
            this.animationFrame = -1;
            this.frameCounter = 0;
        }

        return this;
    }

    previousFrame() {
        this.currentFrame = this.getData(this.currentAnimation[--this.animationFrame % this.currentAnimation.length]);

        return this.currentFrame;
    }

    nextFrame() {
        this.currentFrame = this.getData(this.currentAnimation[++this.animationFrame % this.currentAnimation.length]);

        return this.currentFrame;
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
                this.play(Cat.animations.walk.top);
            } else {
                this.play(Cat.animations.walk.down);
            }
        }
        this.matrix.translate(x, y, 0);
        if (this.frameCounter++ % 8 == 0) {
            console.log('update')
            this.u += 1;
            this.u %= 3;
            this.frameCounter = 1;
            return this.nextFrame();
        }
        console.log('no update');
        return null;
    }

    getData(frame) {
        const u = frame[0] * this.width + this.offset,
            v = frame[1] * this.height;

        return new Float32Array([
            -this.size, this.size, u, v,
            -this.size, -this.size, u, v + this.height,
            this.size, this.size, u + this.width, v,

            -this.size, -this.size, u, v + this.height,
            this.size, this.size, u + this.width, v,
            this.size, -this.size, u + this.width, v + this.height,
        ]);
    }

    getMatrix() {
        return this.matrix.values;
    }

    static texture = textureSrc;
}