module.exports = toolbox => {
  toolbox.expandTilde = function expandTilde(path) {
    return path.replace('~', require('os').homedir())
  }
}
