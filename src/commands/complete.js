const union = require('lodash/union')
module.exports = {
  name: 'complete',
  alias: ['cmpl'],
  run: async toolbox => {
    const {
      parameters: { first: word },
      filesystem: { list },
      print: { info },
      config: {
        codocil: { projectDirectory, itermocilDirectory }
      }
    } = toolbox
    info(
      (
        union(list(projectDirectory), list(itermocilDirectory)).filter(
          s => !s.startsWith('.')
        ) || []
      )
        .filter(project => (word ? project.search(word) !== -1 : true))
        .join('\n')
    )
  }
}
