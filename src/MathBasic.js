const MathBasic = {
  add: (...args) => {
    const [a, b] = validate(...args);
    return a + b;
  },
  subtract: (...args) => {
    const [a, b] = validate(...args);
    return a - b;
  },
  multiply: (...args) => {
    const [a, b] = validate(...args);
    return a * b;
  },
  divide: (...args) => {
    const [a, b] = validate(...args);
    return a / b;
  },
};

const validate = (...args) => {
  if (args.length !== 2) {
    throw new Error("Function only receives 2 parameters");
  }

  const [a, b] = args;
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Function only receives number parameters");
  }

  return [a, b];
};

module.exports = MathBasic;
