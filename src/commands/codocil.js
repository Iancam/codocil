module.exports = {
  name: 'codocil',
  run: async toolbox => {
    const { system, parameters } = toolbox

    console.log(
      system.run('itermocil ~/.itermocil/codocil/' + parameters.first).then(
        success => {
          console.log(success)
        },
        fail => console.log(fail)
      )
    )
  }
}
