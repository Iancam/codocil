module.exports = {
  name: 'complete',
  alias: ['cmpl'],
  run: async toolbox => {
    const {
      parameters: { first: word },
      filesystem: { list },
      print: { info },
      config: {
        codocil: { projectDirectory }
      }
    } = toolbox
    console.log(word, list(projectDirectory), projectDirectory, list('/users/'))

    info(
      (list(projectDirectory) || [])
        .filter(project => (word ? project.search(word) !== -1 : true))
        .join('\n')
    )
  }
}
