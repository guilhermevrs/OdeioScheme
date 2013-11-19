    /*
    DualOperand
    Operando binário
    */
    var DualOperand = function(leftOp, op, rightOp){
    	this.leftOp = (typeof leftOp === 'undefined')? null : leftOp;
             this.op = (typeof op === 'undefined')? null : op;
             this.rightOp = (typeof rightOp === 'undefined')? null : rightOp;
    };


    module.exports = DualOperand