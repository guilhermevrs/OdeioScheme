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
          this.executeDualOp = function(expression) {
            if(expression.leftOp === null)
              throw new Error("LeftOp must have a value");
            if(expression.rightOp === null)
              throw new Error("RightOp must have a value");
            switch(expression.op){
              case '+':
              return expression.leftOp + expression.rightOp;
              break;
              case '>=':
              return expression.leftOp >= expression.rightOp;
              break;
              default:
              throw new Error("Operand not defined");
              break;
            }
          };
        };


        module.exports = ParseTree