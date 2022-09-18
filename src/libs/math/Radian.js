export class Radian {
    static fromDegree(degree) {
        return Math.PI * (degree % 360) / 180.0;
    }
}