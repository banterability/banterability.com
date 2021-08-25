module.exports = {
  head: (array, n) => {
    // Get the first `n` elements of a collection.
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  },
  min: (...numbers) => {
    return Math.min.apply(null, numbers);
  },
};
