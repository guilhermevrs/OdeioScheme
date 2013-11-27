/*
FnExec
*/
var FnExec = function(fn, param){
	this.fn = (typeof fn == 'undefined')? null : fn;
	this.param = (typeof param == 'undefined')? null : param;
	this.step = function(){
		c = new Common();
		if(c.isValue(this.param))
			return this.fn.step(this.param);
		else
		{
			this.param = this.param.step();
			return this;
		}
	}
};

module.exports = FnExec;