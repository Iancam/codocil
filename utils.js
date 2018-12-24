module.exports.expandTilde = function expandTilde(path) {
  return path.replace("~", require("os").homedir());
};
