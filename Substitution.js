    /*
    Substitution
    */
    var Substitution = function(leftExp, rightExp){
    	this.leftExp = (typeof leftExp === 'undefined')? null : leftExp;
        this.rightExp = (typeof rightExp === 'undefined')? null : rightExp;
    };


    module.exports = Substitution;