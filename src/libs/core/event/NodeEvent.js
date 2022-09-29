export class NodeEvent extends Event{
    constructor(targetNode, type, options){
        super(type,options);
        options = options || {};
        options.target = targetNode;
    }
}