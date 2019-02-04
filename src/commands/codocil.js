const find = require('lodash/find')
module.exports = {
  name: 'codocil',
  run: async toolbox => {
    const {
      system,
      parameters,
      filesystem: { path, exists },
      config: {
        codocil: { projectDirectory, itermocilDirectory }
      }
    } = toolbox
    const callItermocil = (directories, arg) => {
      const pathToProject = directories
        .map(dir => path(dir, arg + '.yml'))
        .find(exists)
      console.log(pathToProject, directories)

      const withoutSuffix = pathToProject.slice(0, pathToProject.length - 4)
      return system.run('itermocil ' + withoutSuffix)
    }
    callItermocil(
      [projectDirectory, itermocilDirectory],
      parameters.argv[2]
    ).then(console.log, console.log)
  }
}
