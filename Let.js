/*
Let
*/
var Let = function(x,e1, e2){
	this.x = (typeof x === 'undefined')? null : x;
	this.e1 = (typeof e1 === 'undefined')? null : e1;
	this.e2 = (typeof e2 === 'undefined')? null : e2;
	this.step = function(){
		c = new Common();
		if(c.isValue(this.e1) || this.e1 instanceof Fn){
			return c.replaceObj(this.e2, this.x, this.e1);
		}
		else{
			this.e1 = this.e1.step();
			return this;
		}
	}
};

module.exports = Let;