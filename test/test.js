var assert = require("assert"),
      ParseTree = require("../parseTree.js");

describe("ParseTree", function() {

	var tree

	beforeEach(function(){
	    tree = new ParseTree();
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
});