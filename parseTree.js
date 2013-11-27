    /*
    ParseTree
    Arvore gerada após rodar o parse no texto criado
    */
    var ParseTree = function() {

          /*
          METHODS
          */
          this.execute = function(exp){
            if(exp.step){
              return this.execute(exp.step());
            }
            return exp;
          }

          this.step = function(exp){
            if(exp.step){
              return this.exp.step();
            }
            return false;
          }


        };

        module.exports = ParseTree