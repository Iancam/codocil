module.exports = {
  name: 'edit',
  run: async toolbox => {
    const { system, parameters } = toolbox

    console.log(
      system
        .run('itermocil --edit ~/.itermocil/codocil/' + parameters.first)
        .then(
          success => {
            console.log(success)
          },
          fail => console.log(fail)
        )
    )
  }
}
