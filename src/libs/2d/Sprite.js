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
            this.setAnimation(animation);
        }
        return this.nextTile();
    }

    previousTile() {
        if(!this.frameCount || ++this.frameCount < this.currentAnimation[this.animationTile][3]){
            this.animationTile = ++this.animationTile >= this.currentAnimation.length ? 0 : this.animationTile;
            const animationFrame = this.currentAnimation[this.animationTile];
            this.frameCount = 0;
            return this.setUV(animationFrame[0], animationFrame[1]);
        }

        return false;
    }

    nextTile() {
        if(!this.frameCount || --this.frameCount <= 0){
            this.animationTile = ++this.animationTile >= this.currentAnimation.length ? 0 : this.animationTile;
            const animationFrame = this.currentAnimation[this.animationTile];
            this.frameCount = animationFrame[2];
            return this.setUV(animationFrame[0], animationFrame[1]);
        }

        return false;
    }
}