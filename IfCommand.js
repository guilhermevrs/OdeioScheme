/*
	IF Command
	*/
var IfCommand = function(condition, trueExec, falseExec){
	this.condition = (typeof condition === 'undefined')? null : condition;
	this.trueExec = (typeof trueExec === 'undefined')? null : trueExec;
	this.falseExec = (typeof falseExec === 'undefined')? null : falseExec;
}

module.exports = IfCommand;