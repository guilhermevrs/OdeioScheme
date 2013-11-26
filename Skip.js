/* FazNada
   Operacao Skip
   */

   var faznada = function(LeftExp, RightExp){
   	this.LeftExp = (typeof LeftExp === 'undefined')? null : LeftExp;
   	this.RightExp = (typeof RightExp === 'undefined')? null : RightExp;
   };

   module.exports = Skip;