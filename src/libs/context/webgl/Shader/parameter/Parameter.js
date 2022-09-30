export class Parameter{
    constructor(type, name){
        this.type = type;
        this.name = name;
    }

    saveLocation(gl){
        throw new Error(`${this} is missing ${this.saveLocation.name} implementation.`);
    }

    setValue(gl, value){
        //console.log(`${this.name}.SetValue(${this.value}) : (${this.type});`);
        throw new Error(`${this.constructor.name} is missing ${this.setValue.name} implementation.`);
    }

    getDeclaration(){
        throw new Error(`${this.constructor.name} is missing ${this.getDeclaration.name} implementation.`);
    }

    toString(){
        return this.name;
    }
}