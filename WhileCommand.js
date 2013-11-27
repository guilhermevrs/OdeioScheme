/*
	While
	*/
	var WhileCommand = function(condition, trueExec){
	this.condition = (typeof condition === 'undefined')? null : condition;
	this.trueExec = (typeof trueExec === 'undefined')? null : trueExec;       
	
	this.apply = function WhileToIf(){
		if(!isValue(condition)){
			condition = condition.step;
			Sequence seq = new Sequence(trueExec, WhileCommand(condition, trueExec));
			return IfCommand(condition, seq, 'skip');
			}
		}
	}

	this.step = function(operand){
            //TODO: Implementar
       if(operand instanceof IfCommand){
           return this.executeIf(operand);
         }
            /*
              else if(operand instanceof Function){
                PROGRIDE FUNCTION
              }
              (...)
            */
    };

	this.isValue = function(operand){
            var typeOp = typeof operand;
            return typeOp === 'number' || typeOp === 'boolean';
          }



module.exports = WhileCommand;