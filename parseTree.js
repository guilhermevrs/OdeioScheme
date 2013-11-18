  "use strict";

  /*
    ParseNode
    Nodo da ParseTree
  */



  /*
    ParseTree
    Arvore gerada após rodar o parse no texto criado
  */
  function ParseTree() {
    
  }

  Cow.prototype = {
    greets: function(target) {
      if (!target)
        throw new Error("missing target");
      return this.name + " greets " + target;
    }
  };