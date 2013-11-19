var assert = require("assert"),
      ParseTree = require("../parseTree.js"),
      DualOperand = require("../DualOperand.js");

describe("ParseTree", function() {

	var tree;
	var intExpression;
	var boolExpression;

	beforeEach(function(){
	    tree = new ParseTree();
	    intExpression = new DualOperand(1, '+', 1);
	    boolExpression = new DualOperand(3, '>=', 1);
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
	});
});