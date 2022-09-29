export class Degree {
    /** Convert radian to degree
     * @param {Number} radian Angle in radian
    */
    static fromRadian(radian) {
        return radian * 180 / Math.PI;
    }
}