/*
Common
*/
var Common = function(){
	this.isValue = function(op){
		var typeOp = typeof op;
		return typeOp === 'number' || typeOp === 'boolean' || typeOp === 'string';
	}
};
module.exports = Common;