const find = require('lodash/find')
module.exports = {
  name: 'codocil',
  run: async toolbox => {
    const {
      system,
      parameters,
      filesystem: { path, exists },
      print: { error, success },
      config: {
        codocil: { projectDirectory, itermocilDirectory }
      }
    } = toolbox
    const directories = [projectDirectory, itermocilDirectory]
    const arg = parameters.argv[2]
    const pathToProject = directories
      .map(dir => path(dir, arg + '.yml'))
      .find(exists)

    if (!pathToProject) {
      error(`project ${arg} doesn't exist`)
      return
    }

    system
      .run('itermocil ' + pathToProject.slice(0, pathToProject.length - 4))
      .then(success, error)
  }
}
