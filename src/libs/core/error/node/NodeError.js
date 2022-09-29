export class NodeError extends Error{
    constructor(node, message, options){
        super(message, options);
        this.node = node;
        this.name = 'NodeError';
        this.message = `${node.id} : ${message}`;
    }
}