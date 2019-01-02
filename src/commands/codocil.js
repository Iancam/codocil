module.exports = {
  name: 'codocil',
  run: async toolbox => {
    const {
      system,
      parameters,
      filesystem: { path },
      config: {
        codocil: { projectDirectory }
      }
    } = toolbox

    system.run('itermocil ' + path(projectDirectory, parameters.argv[2])).then(
      success => {
        console.log(success)
      },
      fail => console.log(fail)
    )
  }
}
