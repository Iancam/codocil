const { expandTilde } = require('../utils')

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
    info(projectDirectory)
    console.log(list(projectDirectory), list)
    info(
      (list(expandTilde(projectDirectory)) || [])
        .filter(project => project.search(word) !== -1)
        .join('\n')
    )
  }
}
