module.exports = {
  name: 'edit',
  run: async toolbox => {
    const {
      system,
      parameters,
      print: { success, error, info },
      config: {
        codocil: { projectDirectory }
      },
      filesystem: { path }
    } = toolbox
    const cmd = [
      'itermocil --edit',
      path(projectDirectory, parameters.first)
    ].join(' ')
    info(cmd)
    info(system.run(cmd).then(success, error))
  }
}
