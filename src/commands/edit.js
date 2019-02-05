module.exports = {
  name: 'edit',
  run: async toolbox => {
    const {
      system,
      parameters,
      print: { success, error }
    } = toolbox

    console.log(
      system
        .run('itermocil --edit ~/.itermocil/.codocil/' + parameters.first)
        .then(success, error)
    )
  }
}
