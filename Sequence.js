    /*
    Sequence
    */
    var Sequence = function(leftExp, rightExp){
    	this.leftExp = (typeof leftExp === 'undefined')? null : leftExp;
    	this.rightExp = (typeof rightExp === 'undefined')? null : rightExp;
    	this.step = function(){
    		c = new Common();
    		if(c.isValue(this.leftExp))
    			return this.rightExp;
    		else
    		{
    			this.leftExp = this.leftExp.step();
    			return this;
    		}
    	}
    };


    module.exports = Sequence;