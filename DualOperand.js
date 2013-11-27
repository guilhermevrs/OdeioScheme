/*
DualOperand
Operando binário
*/
var DualOperand = function(leftOp, op, rightOp){
    this.leftOp = (typeof leftOp === 'undefined')? null : leftOp;
    this.op = (typeof op === 'undefined')? null : op;
    this.rightOp = (typeof rightOp === 'undefined')? null : rightOp;
    this.step = function(){
        c = new Common();
        if(!c.isValue(this.leftOp)){
            this.leftOp = this.leftOp.step();
            return this;
        }
        else if(!c.isValue(this.rightOp)){
            this.rightOp = this.rightOp.step();
            return this;
        }
        else{
            switch(this.op){
                case '+':
                return this.leftOp + this.rightOp;
                break;
                case '>=':
                return this.leftOp >= this.rightOp;
                break;
                default:
                throw  new Error("Operator unknown");
                break;
            }
        }
    };
};
module.exports = DualOperand