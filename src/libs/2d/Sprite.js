import { Tile } from "./Tile";

export class Sprite extends Tile {
    constructor(x, y, width, height, u, v, tileWidth, tileHeight) {
        super(x, y, width, height, u, v, tileWidth, tileHeight);
        this.currentTile = null;
        this.currentAnimation = null;
        this.animationTile = -1;
    }

    setAnimation(animation) {
        this.currentAnimation = animation;
        this.animationTile = -1;
    }

    play(animation) {
        if (this.currentAnimation != animation) {
            console.log(animation);
            this.setAnimation(animation);
        }
        return this.nextTile();
    }

    previousTile() {
        this.animationTile = --this.animationTile < 0 ? this.currentAnimation.length - 1 : this.animationTile;
        const uv = this.currentAnimation[this.animationTile];
        this.setUV(uv[0], uv[1]);

        return this.getData();
    }

    nextTile() {
        this.animationTile = ++this.animationTile >= this.currentAnimation.length ? 0 : this.animationTile;
        const uv = this.currentAnimation[this.animationTile];
        this.setUV(uv[0], uv[1]);

        return this.getData();
    }
}