import { Geometry3D } from "./Geometry3D";

export class Plane extends Geometry3D {
    static vertexCount(drawMode) {
        switch (drawMode) {
            case 'TRIANGLES':
            default:
                return 6;
        }
    }

    static updateVertexArray(array, index, offset, stride, x, y, width, height, drawMode){
        x -= width / 2;
        y -= height / 2;
        const xw = x + width;
        const yh = y + height;

        index += offset;
        
        switch (drawMode) {
            case 'TRIANGLES':
            default:
                array[index++] = x;
                array[index++] = y;
                array[index] = 0;
                index += stride - 2;
                
                array[index++] = x;
                array[index++] = yh;
                array[index] = 0;
                index += stride - 2;
                
                array[index++] = xw;
                array[index++] = y;
                array[index] = 0;
                index += stride - 2;
                
                array[index++] = xw;
                array[index++] = y;
                array[index] = 0;
                index += stride - 2;
                
                array[index++] = x;
                array[index++] = yh;
                array[index] = 0;
                index += stride - 2;
                
                array[index++] = xw;
                array[index++] = yh;
                array[index] = 0;
        }
    }

    static updateNormalArray(array, index, offset, stride, drawMode){
        index += offset;
        
        switch (drawMode) {
            case 'TRIANGLES':
            default:
                array[index++] = 0;
                array[index++] = 0;
                array[index] = -1;
                index += stride - 2;
                
                array[index++] = 0;
                array[index++] = 0;
                array[index] = -1;
                index += stride - 2;
                
                array[index++] = 0;
                array[index++] = 0;
                array[index] = -1;
                index += stride - 2;
                
                array[index++] = 0;
                array[index++] = 0;
                array[index] = -1;
                index += stride - 2;
                
                array[index++] = 0;
                array[index++] = 0;
                array[index] = -1;
                index += stride - 2;
                
                array[index++] = 0;
                array[index++] = 0;
                array[index] = -1;
        }
    }

    static updateColorArray(array, index, offset, stride, color, drawMode){
        index += offset;
        
        switch (drawMode) {
            case 'TRIANGLES':
            default:
                for(let i = 0; i < 6; i++){
                    array[index++] = color[0];
                    array[index++] = color[1];
                    array[index++] = color[2];
                    array[index] = color[3];
                    index += stride - 3;
                }
        }
    }
}