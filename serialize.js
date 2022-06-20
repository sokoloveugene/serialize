const { checksum } = require("./crypto-light");

const fromJS = {
  Map: (map) => ({
    dataType: "Map",
    value: Array.from(map.entries()),
  }),
  Set: (set) => ({
    dataType: "Set",
    value: Array.from(set),
  }),
  Function: (fn) => ({
    dataType: "Function",
    value: fn.toString(),
    checksum: checksum(fn.toString()),
  }),
};

const toJS = {
  Map: (options) => new Map(options.value),
  Set: (options) => new Set(options.value),
  Function: (options) => {
    if (checksum(options.value) === options.checksum) {
      return eval(options.value);
    }
  },
};

function replacer(key, value) {
  const converter = fromJS[value.constructor.name];

  return converter ? converter(value) : value;
}

function reviver(key, value) {
  const converter = toJS[value?.dataType];

  return converter ? converter(value) : value;
}

module.exports = {
  serialize: (value) => JSON.stringify(value, replacer),
  deserialize: (str) => JSON.parse(str, reviver),
};
