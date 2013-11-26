    /*
    ParseTree
    Arvore gerada após rodar o parse no texto criado
    */
    var ParseTree = function() {

      /*-------------------------------------------------------------
          PRIVATE CLASS
          ----------------------------------------------------------------*/
          var ParseNode = function(leftChild, rightChild, info){
            return{
              leftChild : (typeof leftChild === 'undefined')? null : leftChild,
              rightChild : (typeof rightChild === 'undefined')? null : rightChild,
              info : (typeof info === 'undefined')? null : info
            };
          };
      /*-------------------------------------------------------------
          END PRIVATE CLASS
          ----------------------------------------------------------------*/

      /*
          PROPERTIES
          */
          this.root = new ParseNode();

          /*
          METHODS
          */
          this.isValue = function(operand){
            var typeOp = typeof operand;
            return typeOp === 'number' || typeOp === 'boolean';
          }

          this.advanceExpressionStep = function(operand){
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

          this.executeIf = function(ifExpression){
            if(!(ifExpression instanceof IfCommand))
              throw  new Error("Expression not an if");

            if(typeof ifExpression.condition === 'number')
              throw  new Error("Condition cannot be a number");

            if(typeof ifExpression.condition === 'boolean'){
              return (ifExpression.condition)? ifExpression.trueExec : ifExpression.falseExec;
            }
            else{
              ifExpression.condition = this.advanceExpressionStep(ifExpression.condition);
              return ifExpression;
            }
          }

/*
          this.executeWhile = function(whileExpression){
            if(!(whileExpression instanceof WhileCommand))
              throw  new Error("Expression not an while");

            if(typeof whileExpression.condition === 'number')
              throw  new Error("Condition cannot be a number");

            if(typeof whileExpression.condition === 'boolean'){
              if(whileExpression.condition)
               return whileExpression.trueExec;
            }
            else{
              whileExpression.condition = this.advanceExpressionStep(whileExpression.condition);
              return whileExpression;
             }
          }
*/

          this.executeDualOp = function(expression) {
            if(expression.leftOp === null)
              throw new Error("LeftOp must have a value");
            if(expression.rightOp === null)
              throw new Error("RightOp must have a value");

            if(!this.isValue(expression.leftOp))
            {
              expression.leftOp = this.advanceExpressionStep(expression.leftOp);
              return expression;
            }
            else if(!this.isValue(expression.rightOp))
            {
              expression.rightOp = this.advanceExpressionStep(expression.rightOp);
              return expression;
            }
            else{
              switch(expression.op){
                case '+':
                return expression.leftOp + expression.rightOp;
                break;
                case '>=':
                return expression.leftOp >= expression.rightOp;
                break;
                default:
                throw new Error("Operand not defined in expression");
                break;
              }
            }
          };


          this.executeSubstitution = function(expression) {
           if(expression.leftExp === null)
              throw new Error("LeftExp must have a value");
           if(expression.rightExp === null)
              throw new Error("RightExp must have a value");

           if(this.isValue(expression.leftExp) && !this.isValue(expression.rightExp)) //APP1
            {
              expression.rightExp = this.advanceExpressionStep(expression.rightExp);
              return expression;
            }


            if(!this.isValue(expression.leftExp) && !this.isValue(expression.rightExp)) //APP2
            {
              expression.leftExp = this.advanceExpressionStep(expression.leftExp);
              return expression;
            }

            if(this.isValue(expression.rightExp)) //APP2
            {
              throw new Error("Right operand must be an expression, not a number or boolean.");
            }


          };





        };

        module.exports = ParseTree