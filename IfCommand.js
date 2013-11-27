/*
	IF Command
	*/
var IfCommand = function(condition, trueExec, falseExec){
	this.condition = (typeof condition === 'undefined')? null : condition;
	this.trueExec = (typeof trueExec === 'undefined')? null : trueExec;
	this.falseExec = (typeof falseExec === 'undefined')? null : falseExec;
	this.step = function(){
		c = new Common();
		if(!c.isValue(this.condition)){
			this.condition = this.condition.step();
			return this;
		}
		if(this.condition)
			return this.trueExec;
		else
			return this.falseExec;
	}
}

module.exports = IfCommand;