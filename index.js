const { serialize, deserialize } = require("./serialize.js");

const data = {
  token: "sectet-token",
  parameters: new Map([["action", "save"]]),
  unique: new Set([1, 2, 3, 3, 3]),
  sum: (a, b) => a + b,
};

const json = serialize(data);

const js = deserialize(json);

console.dir({ json, js });
