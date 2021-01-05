const assert = require("assert");
const fractionalIndex = require(".");
const { ZERO, UPPER_LIMIT } = fractionalIndex;

describe("fractionalIndex", () => {
  function validateFractionalIndex(a, b) {
    const index = fractionalIndex(a, b);
    const normalizedA = a ? a : String.fromCharCode(ZERO);
    const normalizedB = b ? b : String.fromCharCode(UPPER_LIMIT);
    assert(index > normalizedA, `${index} is not greater than ${normalizedA}`);
    assert(index < normalizedB, `${index} is not less than ${normalizedB}`);
  }

  it("errors when the first argument is greater than the second", () => {
    assert.throws(() => fractionalIndex("2", "1"));
    assert.throws(() => fractionalIndex("11", "1"));
  });

  it("errors when the two arguments are equal", () => {
    assert.throws(() => fractionalIndex("", ""));
    assert.throws(() => fractionalIndex("1", "1"));
    assert.throws(() => fractionalIndex("555", "555"));
  });

  it("errors when there are trailing zeros", () => {
    assert.throws(() => fractionalIndex("1" + String.fromCharCode(ZERO), null));
    assert.throws(() => fractionalIndex(null, "1" + String.fromCharCode(ZERO)));
  });

  it("calculates an index for the first item in a list", () => {
    validateFractionalIndex(null, null);
  });

  it("calculates an index when inserting to the beginning of the list", () => {
    validateFractionalIndex(null, "5");
    validateFractionalIndex(null, "3");
    validateFractionalIndex(null, "2");
    validateFractionalIndex(null, "1");
    validateFractionalIndex(null, "05");
    validateFractionalIndex(null, "03");
    validateFractionalIndex(null, "02");
    validateFractionalIndex(null, "01");
  });

  it("calculates an index when inserting to the end of the list", () => {
    validateFractionalIndex("5", null);
    validateFractionalIndex("8", null);
    validateFractionalIndex("9", null);
    validateFractionalIndex("95", null);
    validateFractionalIndex("98", null);
    validateFractionalIndex("99", null);
  });

  it("calculates an index when inserting between two indexes", () => {
    validateFractionalIndex("05", "1");
    validateFractionalIndex("001", "001002");
    validateFractionalIndex("001", "001001");
    validateFractionalIndex("499", "5");
    validateFractionalIndex("O", "OO");
  });
});
