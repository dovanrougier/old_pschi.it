import { Parameter } from "./Parameter";

export class Varying extends Parameter{
    constructor(type, name){
        super(type, name);
    }
    
    saveLocation(gl){
    }
    
    getDeclaration(){
        return `varying ${this.type} ${this.name};`
    }
}