/*
Fn
*/
var Fn = function(x, body){
    this.x = (typeof x === 'undefined')? null : x;
    this.body = (typeof body === 'undefined')? null : body;
    this.step = function(v){
        if(typeof v === 'undefined')
        {
            throw new Error('To step a function, you need to pass a value');
        }
        c = new Common();
        return c.replaceObj(this.body, this.x, v);
    }
};


module.exports = Fn;