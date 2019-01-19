// const projects = require('./directories')

const { resolve, join } = require('path')

module.exports = {
  name: 'init',
  alias: ['i', 'new'],

  run: async toolbox => {
    const {
      toItermocil,
      getProjects,
      expandTilde,
      parameters: { argv },
      filesystem: fs,
      print: { info },
      config: {
        codocil: { projectDirectory }
      }
    } = toolbox
    const params = argv.slice(3)
    const recursive = params[0] === '-r'
    const directory = params[1] || fs.cwd()
    const p = getProjects(directory, { recursive })
    info(`found ${p.length} projects`)

    const projectFiles = p.map(toItermocil)
    projectFiles.forEach(({ fname, contents }) => {
      const path = resolve(join(expandTilde(projectDirectory), fname))
      if (!fs.exists(path)) {
        fs.write(path, contents)
        info(`added ${path}`)
      } else {
        info(`file ${path} already exists`)
      }
    })
  }
}
