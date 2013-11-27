/*
FnExec
*/
var FnExec = function(fn, param){
	this.fn = (typeof fn == 'undefined')? null : fn;
	this.param = (typeof param == 'undefined')? null : param;
	this.step = function(){
		return this.fn.step(this.param);
	}
};

module.exports = FnExec;