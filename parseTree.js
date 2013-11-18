    /*
    ParseTree
    Arvore gerada após rodar o parse no texto criado
    */
    var ParseTree = function(name, age) {

      /*
          PRIVATE CLASS
      */
      var ParseNode = function(leftChild, rightChild, info){
        return{
          leftChild : (typeof leftChild === 'undefined')? null : leftChild,
          rightChild : (typeof rightChild === 'undefined')? null : rightChild,
          info : (typeof info === 'undefined')? null : info
        };
      };

      /*
          PROPERTIES
      */
      this.root = new ParseNode();

      /*
          MASTER
      */
      this.test = function() {
        console.log('HUE');
      };
    };


    module.exports = ParseTree