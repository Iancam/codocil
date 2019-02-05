module.exports = {
  name: 'edit',
  run: async toolbox => {
    const {
      system,
      parameters,
      print: { success, error },
      config: { codocil: projectDirectory }
    } = toolbox
    info(
      system
        .run(['itermocil --edit', projectDirectory, parameters.first].join(' '))
        .then(success, error)
    )
  }
}
