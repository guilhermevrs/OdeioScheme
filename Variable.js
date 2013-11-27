/*
Variable
*/
var Variable = function(id){
	this.id = (typeof id === 'undefined')? null : id;
};

module.exports = Variable;