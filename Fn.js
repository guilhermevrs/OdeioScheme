    /*
    Fn
    */
    var Fn = function(x, body){
    	this.x = (typeof x === 'undefined')? null : x;
    	this.body = (typeof body === 'undefined')? null : body;
    	this.apply = function(v){
    		return ReplaceObject(this.body, this.x, v);
    	}

    	function ReplaceObject(obj, x, v){
    		if(obj instanceof DualOperand){
    			obj = ReplaceInDualOperand(obj, x, v);
    		}
    		else if(obj instanceof Variable && obj.id === x){
    			obj = v;
    		}
    		else if(obj instanceof Sequence){
    			obj = ReplaceInSequence(obj, x, v);
    		}
    		else if(obj instanceof IfCommand){
    			obj = ReplaceInIfCommand(obj, x, v);
    		}
    		else if(obj instanceof WhileCommand){

    		}
    		else if(obj instanceof Fn && obj.x != x){
    			obj.body = ReplaceObject(obj.body);
    		}
    		return obj;
    	}

    	function ReplaceInDualOperand(dualOperand, x, v){
    		if(dualOperand.leftOp instanceof Variable && dualOperand.leftOp.id === x)
    			dualOperand.leftOp = v;
    		if(dualOperand.rightOp instanceof Variable && dualOperand.rightOp.id === x)
    			dualOperand.rightOp = v;
    		return dualOperand;
    	}

    	function ReplaceInIfCommand(ifCommand, x, v){
    		if(ifCommand.condition instanceof Variable && ifCommand.condition.id === x)
    			ifCommand.condition = v;
    		else{
    			ifCommand.condition = ReplaceObject(ifCommand.condition, x, v);
    		}
    		if(ifCommand.trueExec instanceof Variable && ifCommand.trueExec.id === x)
    			ifCommand.trueExec = v;
    		else{
    			ifCommand.trueExec = ReplaceObject(ifCommand.trueExec, x, v);
    		}
    		if(ifCommand.falseExec instanceof Variable && ifCommand.falseExec.id === x)
    			ifCommand.falseExec = v;
    		else{
    			ifCommand.falseExec = ReplaceObject(ifCommand.falseExec, x, v);
    		}
    		return ifCommand;
    	}

    	function ReplaceInSequence(seq, x, v){
    		seq.leftExp = ReplaceObject(seq.leftExp, x, v);
    		seq.rightExp = ReplaceObject(seq.rightExp, x, v);
    		return seq;
    	}
    };


    module.exports = Fn;