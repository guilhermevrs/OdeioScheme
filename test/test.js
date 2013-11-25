var assert = require("assert"),
ParseTree = require("../parseTree.js"),
DualOperand = require("../DualOperand.js");
IfCommand = require("../If.js");

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
});