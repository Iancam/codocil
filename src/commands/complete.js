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
    info(
      (list(projectDirectory) || [])
        .filter(project => project.search(word) !== -1)
        .join('\n')
    )
  }
}
