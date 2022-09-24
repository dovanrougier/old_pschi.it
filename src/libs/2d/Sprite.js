import { Rectangle } from "./Rectangle";

export class Sprite extends Rectangle {
    constructor(x, y, width, height, u, v) {
        super(x, y, width, height, null, u, v);
        this.currentTile = null;
        this.currentAnimation = null;
        this.animationTile = -1;
    }

    setAnimation(animation) {
        this.currentAnimation = animation;
        this.animationTile = -1;
    }

    play(animation) {
        this.setAnimation(animation);
        return this.nextTile();
    }

    previousTile() {
        this.animationTile = --this.animationTile < 0 ? this.currentAnimation.length - 1 : this.animationTile;
        this.setTile(this.tileCounter.currentAnimation[this.animationTile]);

        return this.getTile();
    }

    nextTile() {
        this.animationTile = ++this.animationTile >= this.currentAnimation.length ? 0 : this.animationTile;
        this.setTile(this.currentAnimation[this.animationTile]);

        return this.getTile();
    }

    setTile(tile) {
        this.currentTile = tile;
        this.setUV(tile[0], tile[1]);
    }

    getTile() {
        return Sprite.getTile(this.x, this.y, this.width, this.height, this.u, this.v);
    }

    static getTile(x, y, width, height, u, v) {
        const vertex = this.getVertex(x, y, width, height),
            uv = this.getTextureCoordinate(u, v, width, height);

        return [
            vertex[0], vertex[1], uv[0], uv[1],
            vertex[2], vertex[3], uv[2], uv[3],
            vertex[4], vertex[5], uv[4], uv[5],

            vertex[6], vertex[7], uv[6], uv[7],
            vertex[8], vertex[9], uv[8], uv[9],
            vertex[10], vertex[11], uv[10], uv[11],
        ];
    }
}