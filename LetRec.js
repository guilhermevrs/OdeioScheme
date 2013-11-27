/*
LetRec
*/
var LetRec = function(x, f, e2){
	if(!(f instanceof Fn)){
		throw new Error('Second parameter MUST be a Fn');
	}
	this.x = (typeof x === 'undefined')? null : x;
	this.f = (typeof f === 'undefined')? null : f;
	this.e2 = (typeof e2 === 'undefined')? null : e2;
	this.step = function(){
		c = new Common();
		ltRec = new LetRec(x,f,f.body);
		newFn = new Fn(x, ltRec);
		return c.replaceObj(this.e2,x,newFn);
	}
}
module.exports = LetRec;