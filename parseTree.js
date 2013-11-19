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


          this.executeDualOp = function(expression) {
            if(expression.leftOp === null)
              throw new Error("LeftOp must have a value");
            if(expression.rightOp === null)
              throw new Error("RightOp must have a value");

            if(!this.isValue(expression.leftOp))
            {
              //TODO: Progredir left
            }
            else if(!this.isValue(expression.rightOp))
            {
              //TODO: Progredir right
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
        };


        module.exports = ParseTree