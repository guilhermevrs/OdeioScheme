var assert = require("assert"),
      ParseTree = require("../ParseTree");

describe("ParseTree", function() {

	before(function(){
	    console.log(new ParseTree());
	    console.log(new ParseTree().name);
	});

	describe("constructor", function() {
		it("should have empty root", function(){
			assert.ok(true,'Hey jude')
		});
		it("should have a chupens name");
	});
});