var assert = require("assert");
Variable = require("../Variable.js");
DualOperand = require("../DualOperand.js");
Common = require("../Common.js");
ParseTree = require("../parseTree.js");
IfCommand = require("../IfCommand.js");
WhileCommand = require("../WhileCommand.js");
Fn = require("../Fn.js");
FnExec = require("../FnExec.js");
Sequence = require("../Sequence.js");
Let = require("../Let.js");
LetRec = require("../LetRec.js");

Object.toType = function(obj) {
	return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
}

describe("ParseTree", function() {

	var tree;
	var intExpression;
	var boolExpression;

	beforeEach(function(){
		tree = new ParseTree();
		intExpression = new DualOperand(1, '+', 1);
		boolExpression = new DualOperand(3, '>=', 1);
		ifExpressionInt = new IfCommand(true,1,6);
	});

	/*Expressões de operando dual*/
	describe("DualOperand", function(){
		it("should add two numbers", function(){
			var res = intExpression.step();
			assert.equal(res, 2, '1 + 1 = 2');
		});
		it("should compare two numbers", function(){
			var res = boolExpression.step();
			assert.equal(res, true, '3 >= 1 = true');
		});
		it("should progress first operand", function(){
			var testExpression = new DualOperand(ifExpressionInt, '+', 1);
			testExpression = testExpression.step();
			assert.equal(testExpression.leftOp, intExpression.leftOp, "has to progress e1");
		});
		it("should progress second operand", function(){
			var testExpression = new DualOperand(1, '+', ifExpressionInt);
			testExpression = testExpression.step();
			assert.equal(testExpression.rightOp, intExpression.rightOp, "has to progress e2");
		});
	});

	/*Comando IF*/
	describe("IfCommand", function(){
		it("should return e1", function(){
			var ifC = new IfCommand(true,1,6);
			assert.equal(ifC.step(), 1, "when condition is true");
		});
		it("should return e2", function(){
			var ifC = new IfCommand(false,1,6);
			assert.equal(ifC.step(), 6, "when condition is false");
		});
		it("should progress condition", function(){
			var ifC = new IfCommand(ifExpressionInt,1,6);
			var ifC = ifC.step();
			assert.equal(ifC.condition, 1, "when is not boolean");
		});
	});

	/*Comando WHILE*/
	describe("WhileCommand", function(){
		it("should return skip", function(){
			var whileC = new WhileCommand(false, 1);
			whileC = whileC.step();
			assert.equal(whileC.step(), 'skip', "when condition is false");
		});

		it("should progress condition", function(){
			var whileC = new WhileCommand(ifExpressionInt,1);
			var whileC = whileC.step();
			assert.equal(whileC.condition, true, "has to progress e1");
		});
	});

	describe('Common', function(){
		it("should replace x in body", function(){
			var dOp = new DualOperand(new Variable('x'), '+', 1);
			var c = new Common;
			var rOp = c.replaceObj(dOp, 'x', 5);
			assert.equal(rOp.leftOp, 5, "when x is inside");
		});
	});

	/*Expressões Substituiçao*/
	describe("Fn", function(){
		it("should replace x in body", function(){
			var dOp = new DualOperand(new Variable('x'), '+', 1);
			var textFn = new Fn('x', dOp);

			var rOp = textFn.step(5);
			assert.equal(rOp.leftOp, 5, "when x is inside");
		});
		it("should NOT replace x in body", function(){
			var varY = new Variable('y');
			var dOp = new DualOperand(varY, '+', 1);
			var textFn = new Fn('x', dOp);
			var rOp = textFn.step(5);
			assert.equal(rOp.leftOp, varY, "when x is NOT inside");
		});
		it("should progress to an if", function(){
			var textFn = new Fn('x', ifExpressionInt);
			var f = textFn.step(5);
			assert.equal(f, ifExpressionInt, "when the body is an if");
		});
		it("should progress to a Fn", function(){
			var textFn = new Fn('x', ifExpressionInt);
			var newTextFn = new Fn('y', textFn);
			var f = newTextFn.step(5);
			assert.equal(f, textFn, "when the body is an Fn");
		});
		it("should progress to a Sequence", function(){
			var varY = new Variable('y');
			var dOp = new DualOperand(varY, '+', 1);
			var d2Op = new DualOperand(2, '+', varY);
			var seq = new Sequence(dOp, d2Op);
			var textFn = new Fn('y', seq);
			var r = textFn.step(5);

			assert.equal(r.leftExp.leftOp, 5, "and replace left expression of it");
			assert.equal(r.rightExp.rightOp, 5, "and replace right expression of it");
		});
	});


/*Skip e Sequencia */
describe("Sequence", function(){
		it("should skip first expression", function(){ //SKIP 
			var testExpression = new Sequence('skip', ifExpressionInt);
			testExpression = testExpression.step();
			assert.equal(testExpression.rightExp, ifExpressionInt.leftOp, "when e1 is skip");
		});
		it("should not progress first expression", function(){ //SEQ1
			var testExpression = new Sequence(1, ifExpressionInt);
			testExpression = testExpression.step();
			assert.equal(testExpression.rightExp, null, "when e1 is a number");
		});
		it("should not progress first expression", function(){ //SEQ1
			var testExpression = new Sequence(true, ifExpressionInt);
			testExpression = testExpression.step();
			assert.equal(testExpression.rightExp, null, "when e1 is a boolean");
		});

		it("should progress first expression", function(){ //SEQ2
			var testExpression = new Sequence(ifExpressionInt, ifExpressionInt);
			testExpression = testExpression.step();
			assert.equal(testExpression.leftExp, ifExpressionInt.trueExec, "has to progress e1");
		});

	});

describe("Let", function(){
	it("should replace body", function(){
		var dOp = new DualOperand(new Variable('x'), '+', 4);
		var letOp = new Let('x', 5, dOp);
		assert.equal(letOp.step().leftOp, 5, "when it finds reference to variable");
	});

	it("should progress before replace", function(){
		var dOp = new DualOperand(new Variable('x'), '+', 4);
		var letOp = new Let('x', intExpression, dOp);
		assert.equal(letOp.step().step().leftOp, 2, "when it finds reference to variable");
	});
});

describe("LetRec", function(){
	it("should replace NOTHING", function(){
		var dOp = new DualOperand(1, '+', 3);
		var fnOp = new Fn('x', 5);
		var letOp = new LetRec('x', fnOp, dOp);
		assert.equal(letOp.step(), dOp, "when there is no free variables");
	});

	it("should replace with letrec", function(){
		var dOp = new DualOperand(1, '+', 3);
		var fnOp = new Fn('x', dOp);
		var fnExecOp = new FnExec(fnOp, 4)
		var letOp = new LetRec('x', fnOp, fnExecOp);

		var step = letOp.step();
		assert(step instanceof FnExec, 'must be a FnExec');
		step = step.step();
		assert(step instanceof DualOperand, 'must be a DualOperand');
		step = step.step();
		assert.equal(step, 4, 'must be 4');
	});
});

it("should return the exp", function(){
	assert.equal(tree.execute(5), 5, "when exp is a value");
});

it("should execute exp till the ent", function(){
	var dOp = new DualOperand(1, '+', 3);
	var fnOp = new Fn('x', 5);
	var letOp = new LetRec('x', fnOp, dOp);
	assert.equal(tree.execute(letOp), 4, "when exp is a LetRec");
});

it("should execute exp till the ent", function(){
	var dOp = new DualOperand(new Variable('x'), '+', 1);
	var textFn = new Fn('x', dOp);
	var execOp = new FnExec(textFn, 5);
	assert.equal(tree.execute(execOp), 6, "when exp is a LetRec");
});

});