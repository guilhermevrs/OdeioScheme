/*
	While
	*/
	var WhileCommand = function(condition, trueExec){
	this.condition = (typeof condition === 'undefined')? null : condition;
	this.trueExec = (typeof trueExec === 'undefined')? null : trueExec;
}

module.exports = WhileCommand;