/*
Common
*/
var Common = function(){
	this.isValue = function(op){
		var typeOp = typeof op;
		return typeOp === 'number' || typeOp === 'boolean' || typeOp === 'string';
	};
	this.isRightVariable = function(v, x){
		return (v instanceof Variable && v.id === x);
	};
	this.replaceObj = function(obj, x, v){
		if(this.isRightVariable(obj,x)){
			obj = v;
		}
		else if(obj instanceof DualOperand){
			obj = this.replaceInDualOperand(obj, x, v);
		}
		else if(obj instanceof Sequence){
			obj = this.replaceInSequence(obj, x, v);
		}
		else if(obj instanceof IfCommand){
			obj = this.replaceInIfCommand(obj, x, v);
		}
		/*else if(obj instanceof WhileCommand){

		}*/
		else if(obj instanceof Fn && obj.x != x){
			obj.body = this.replaceObj(obj.body);
		}
		return obj;
	};
	this.replaceInDualOperand = function(obj, x, v){
		if(this.isRightVariable(obj.leftOp, x))
			obj.leftOp = v;
		if(this.isRightVariable(obj.rightOp, x))
			obj.rightOp = v;
		return obj;
	};
	this.replaceInSequence = function(obj, x, v){
		obj.leftExp = this.replaceObj(obj.leftExp, x, v);
		obj.rightExp = this.replaceObj(obj.rightExp, x, v);
		return obj;
	};
	this.replaceInIfCommand = function(obj, x, v){
		if(this.isRightVariable(obj.condition, x))
			obj.condition = v;
		else{
			obj.condition = this.replaceObj(obj.condition, x, v);
		}
		if(this.isRightVariable(obj.trueExec, x))
			obj.trueExec = v;
		else{
			obj.trueExec = this.replaceObj(obj.trueExec, x, v);
		}
		if(this.isRightVariable(obj.falseExec, x))
			obj.falseExec = v;
		else{
			obj.falseExec = this.replaceObj(obj.falseExec, x, v);
		}
		return obj;
	}
};
module.exports = Common;