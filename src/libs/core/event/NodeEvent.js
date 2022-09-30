export class NodeEvent extends Event {
    constructor(type, options) {
        super(type, options);
        if(options){
            this.child = options.child;
        }
    }
}