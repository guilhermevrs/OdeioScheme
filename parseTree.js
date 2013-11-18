    /*
    ParseTree
    Arvore gerada após rodar o parse no texto criado
    */
    var ParseTree = function(name, age) {
      this.name = name;
      this.age = age;
      this.about = function() {
        console.log(this.name +' is '+ this.age +' years old');
      };
    };


    module.exports = ParseTree