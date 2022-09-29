export class Radian {
    /** Convert degree to radian
     * @param {Number} degree Angle in degree
    */
    static fromDegree(degree) {
        return Math.PI * (degree % 360) / 180.0;
    }
}