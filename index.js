// Fractional string indexes for ordering items.
// References
// - https://www.figma.com/blog/realtime-editing-of-ordered-sequences/
// Original source
// - https://observablehq.com/@dgreensp/implementing-fractional-indexing
//
// We would like to be able to re-order items in an ordered list by only
// updating the index of the thing that moved. We can do this by using
// non-integer indexes, such that moving an item between two other items can be
// done by making the item's index in between the previous item's index and the
// next item's index.
//
// We will use strings for the indexes instead of decimals to avoid
// error-prone floating point math and limited ability to represent floats
// with large decimals.

// base10 configuration
// export const ZERO = 48; // "0"
// export const UPPER_LIMIT = 58; // ASCII code for "9" + 1

// base95 configuration
const ZERO = 32; // " ", beginning of ASCII range
const UPPER_LIMIT = 127; // end of ASCII range + 1

// `a` may be empty string or null, `b` is null or non-empty string.
// `a < b` lexicographically if `b` is non-null.
// no trailing zeros allowed.
function fractionalIndex(
  a,
  b
) {
  if (a === null) {
    a = "";
  }

  if (b !== null && a >= b) {
    throw new Error(a + " >= " + b);
  }
  if (
    a.slice(-1) === String.fromCharCode(ZERO) ||
    (b && b.slice(-1) === String.fromCharCode(ZERO))
  ) {
    throw new Error("trailing zero");
  }
  if (b) {
    // remove longest common prefix.  pad `a` with 0s as we
    // go.  note that we don't need to pad `b`, because it can't
    // end before `a` while traversing the common prefix.
    let n = 0;
    while ((a.charAt(n) || String.fromCharCode(ZERO)) === b.charAt(n)) {
      n++;
    }
    if (n > 0) {
      return b.slice(0, n) + fractionalIndex(a.slice(n), b.slice(n));
    }
  }
  // first digits (or lack of digit) are different
  const digitA = a ? a.charCodeAt(0) : ZERO;
  const digitB = b !== null ? b.charCodeAt(0) : UPPER_LIMIT;
  if (digitB - digitA > 1) {
    const midDigit = Math.round(0.5 * (digitA + digitB));
    return String.fromCharCode(midDigit);
  } else {
    // first digits are consecutive
    if (b && b.length > 1) {
      return b.slice(0, 1);
    } else {
      // `b` is null or has length 1 (a single digit).
      // the first digit of `a` is the previous digit to `b`,
      // or the largest digit if `b` is null.
      // given, for example in base10, midpoint('49', '5'), return
      // '4' + midpoint('9', null), which will become
      // '4' + '9' + midpoint('', null), which is '495'
      return String.fromCharCode(digitA) + fractionalIndex(a.slice(1), null);
    }
  }
}

fractionalIndex.ZERO = ZERO;
fractionalIndex.UPPER_LIMIT = UPPER_LIMIT;

module.exports = fractionalIndex;
