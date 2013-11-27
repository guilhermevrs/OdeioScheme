/*
While
*/
var WhileCommand = function(condition, trueExec){
	this.condition = (typeof condition === 'undefined')? null : condition;
	this.trueExec = (typeof trueExec === 'undefined')? null : trueExec;       

	this.step = function(){
		c = new Common();
		if(c.isValue(this.condition)){
			seq = new Sequence(this.trueExec, this);
			ifC = new IfCommand(this.condition, seq, 'skip');
			return ifC;
		}
		else{
			this.condition = this.condition.step();
			return this;
		}
	}
}


module.exports = WhileCommand;