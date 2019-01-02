module.exports = {
  name: 'codocil',
  defaults: {
    projectDirectory: require('path').join(
      require('os').homedir(),
      '.itermocil',
      '.codocil'
    )
  }
}
