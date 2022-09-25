export class State {
    constructor(elementSize) {
        this.data = [[]];
        this.currentIndex = 0;
        this.elementSize = elementSize;
        this.updated = false;
    }
    getSlicedData() {
        return this.data.slice(0, this.currentIndex + 1);
    }

    getData(){
        this.updated = false;
        return this.getSlicedData().flat();
    }

    pop(element) {
        if (element.length != this.elementSize) {
            throw new Error(`The ${this.constructor.name} need an element of size ${this.elementSize} ( not ${element.length}).`);
        }
        for (let i = this.elementSize; i > 0; --i) {
            this.data[this.currentIndex].pop(element[i]);
        }
        this.updated = true;
    }

    push(element) {
        if (element.length != this.elementSize) {
            throw new Error(`The ${this.constructor.name} need an element of size ${this.elementSize} ( not ${element.length}).`);
        }
        for (let i = 0; i < this.elementSize; i++) {
            this.data[this.currentIndex].push(element[i]);
        }
        this.updated = true;
    }

    previous() {
        if (this.currentIndex == 0) {
            return false;
        }
        this.updated = true;
        this.currentIndex--;
        return true;
    }

    next() {
        if (this.currentIndex >= this.data.length) {
            return false;
        }
        this.updated = true;
        this.currentIndex++;
        return true;
    }

    new() {
        this.data = this.getSlicedData();
        this.data.push([]);
        this.currentIndex++;
    }
}