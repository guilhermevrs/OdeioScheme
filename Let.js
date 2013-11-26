/*
Let
*/
var Let = function(x,e1, e2){
	this.x = (typeof x === 'undefined')? null : x;
	this.e1 = (typeof e1 === 'undefined')? null : e1;
	this.e2 = (typeof e2 === 'undefined')? null : e2;
	this.step = function(){
		if(typeof this.e1 === 'number' || typeof this.e1 === 'boolean' || this.e1 instanceof Fn){

		}
	}
};

module.export = Let;