var assert = require("assert");
ParseTree = require("../parseTree.js");
DualOperand = require("../DualOperand.js");
IfCommand = require("../If.js");
WhileCommand = require("../While.js");
Fn = require("../Fn.js");
Sequence = require("../Sequence.js");
Variable = require("../Variable.js");

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
		WhileExpressionInt = new WhileCommand(true,1);
	});

	/*Construtor da root*/
	describe("constructor", function() {
		it("should have root with no children", function(){
			assert.equal(tree.root.leftChild, null, 'LeftChild null');
			assert.equal(tree.root.rightChild, null, 'Rightchild null');
		});
		it("should have no info", function(){
			assert.equal(tree.root.info, null, 'info null');
		});
	});

	/*Expressões de operando dual*/
	describe("DualOperand", function(){
		it("should add two numbers", function(){
			var res = tree.executeDualOp(intExpression);
			assert.equal(res, 2, '1 + 1 = 2');
		});
		it("should compare two numbers", function(){
			var res = tree.executeDualOp(boolExpression);
			assert.equal(res, true, '3 >= 1 = true');
		});
		it("should progress first operand", function(){
			var testExpression = new DualOperand(ifExpressionInt, '+', 1);
			testExpression = tree.executeDualOp(testExpression);
			assert.equal(testExpression.leftOp, intExpression.leftOp, "has to progress e1");
		});
		it("should progress second operand", function(){
			var testExpression = new DualOperand(1, '+', ifExpressionInt);
			testExpression = tree.executeDualOp(testExpression);
			assert.equal(testExpression.rightOp, intExpression.rightOp, "has to progress e2");
		});
	});

	/*Comando IF*/
	describe("IfCommand", function(){
		it("should return e1", function(){
			var ifC = new IfCommand(true,1,6);
			assert.equal(tree.executeIf(ifC), 1, "when condition is true");
		});
		it("should return e2", function(){
			var ifC = new IfCommand(false,1,6);
			assert.equal(tree.executeIf(ifC), 6, "when condition is false");
		});
		it("should progress condition", function(){
			var ifC = new IfCommand(ifExpressionInt,1,6);
			var ifC = tree.executeIf(ifC);
			assert.equal(ifC.condition, 1, "when is not boolean");
		});
	})


	/*Comando WHILE*/
	describe("WhileCommand", function(){
		it("should return e1", function(){
			var whileC = new WhileCommand(true,1);
			assert.equal(tree.executeWhile(whileC), true, "when condition is true");
		});

		it("should return skip", function(){
			var whileC = new WhileCommand(false,1);
			assert.equal(tree.executeWhile(whileC), 'skip', "when condition is false");
		});

		it("should progress e1", function(){
			var whileC = new WhileCommand(ifExpressionInt,1);
			var whileC = tree.executeWhile(whileC);
			assert.equal(whileC.condition, true, "has to progress e1");
		});
	})

	/*Expressões Substituiçao*/
	describe("Fn", function(){
		it("should replace x in body", function(){
			var dOp = new DualOperand(new Variable('x'), '+', 1);
			var textFn = new Fn('x', dOp);
			var rOp = tree.executeFn(textFn, 5);
			assert.equal(rOp.leftOp, 5, "when x is inside");
		});
		it("should NOT replace x in body", function(){
			var varY = new Variable('y');
			var dOp = new DualOperand(varY, '+', 1);
			var textFn = new Fn('x', dOp);
			var rOp = tree.executeFn(textFn, 5);
			assert.equal(rOp.leftOp, varY, "when x is NOT inside");
		});
		it("should progress to an if", function(){
			var textFn = new Fn('x', ifExpressionInt);
			var f = tree.executeFn(textFn, 5);
			assert.equal(f, ifExpressionInt, "when the body is an if");
		});
		it("should progress to a Fn", function(){
			var textFn = new Fn('x', ifExpressionInt);
			var newTextFn = new Fn('y', textFn);
			var f = tree.executeFn(newTextFn, 5);
			assert.equal(f, textFn, "when the body is an Fn");
		});
		it("should progress to a Sequence", function(){
			var varY = new Variable('y');
			var dOp = new DualOperand(varY, '+', 1);
			var d2Op = new DualOperand(2, '+', varY);
			var seq = new Sequence(dOp, d2Op);
			var textFn = new Fn('y', seq);
			var r = tree.executeFn(textFn, 5);

			assert.equal(r.leftExp.leftOp, 5, "and replace left expression of it");
			assert.equal(r.rightExp.rightOp, 5, "and replace right expression of it");
		});
	});

 
 	/*Skip e Sequencia */
	describe("Sequence", function(){
		it("should skip first expression", function(){ //SKIP 
			var testExpression = new Sequence('skip', ifExpressionInt);
			testExpression = tree.executeSequence(testExpression);
			assert.equal(testExpression.rightExp, ifExpressionInt.leftOp, "when e1 is skip");
		});
		it("should not progress first expression", function(){ //SEQ1
			var testExpression = new Sequence(1, ifExpressionInt);
			testExpression = tree.executeSequence(testExpression);
			assert.equal(testExpression.rightExp, null, "when e1 is a number");
		});
		it("should not progress first expression", function(){ //SEQ1
			var testExpression = new Sequence(true, ifExpressionInt);
			testExpression = tree.executeSequence(testExpression);
			assert.equal(testExpression.rightExp, null, "when e1 is a boolean");
		});

		it("should progress first expression", function(){ //SEQ2
			var testExpression = new Sequence(ifExpressionInt, ifExpressionInt);
			testExpression = tree.executeSequence(testExpression);
			assert.equal(testExpression.leftExp, ifExpressionInt.trueExec, "has to progress e1");
		});

	});

});