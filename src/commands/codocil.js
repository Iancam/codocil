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
      const path = directories.map(dir => path(directory, arg)).find(exists)
      return system.run('itermocil ' + path)
    }
    callItermocil(
      [projectDirectory, itermocilDirectory],
      parameters.argv[2]
    ).then(console.log, console.log)
  }
}
