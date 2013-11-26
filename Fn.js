    /*
    Fn
    */
    var Fn = function(x, body){
    	this.x = (typeof x === 'undefined')? null : x;
    	this.body = (typeof body === 'undefined')? null : body;
    	this.apply = function(v){
    		if(this.body instanceof DualOperand){
    			return ReplaceInDualOperand(this.body, this.x, v);
    		}
    		if(this.body instanceof Sequence){

    		}
    		else if(this.body instanceof IfCommand){

    		}
    		else if(this.body instanceof While){

    		}
    		else if(this.body instanceof Fn){

    		}
    		return this.body;
    	}

    	function ReplaceInDualOperand(dualOperand, x, v){
    		if(dualOperand.leftOp instanceof Variable && dualOperand.leftOp.id === x)
    			dualOperand.leftOp = v;
    		if(dualOperand.rightOp instanceof Variable && dualOperand.rightOp.id === x)
    			dualOperand.rightOp = v;
    		return dualOperand;
    	}
    };


    module.exports = Fn;