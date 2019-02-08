const { system, filesystem } = require('gluegun')
const { resolve, join } = require('path')
const config = require('../src/codocil.config')
const src = resolve(__dirname, '..')

const cliFactory = (path, fs) => async cmd => {
  return system.run(
    ['cd', path, ';', 'node', resolve(src, 'bin', 'codocil'), `${cmd}`].join(
      ' '
    )
  )
}

const tearDownFactory = (projectName, path) => () => {
  const itermocilFilePath = join(config.defaults.projectDirectory, projectName)
  filesystem.remove(path)
  filesystem.remove(itermocilFilePath)
}

const setup = (projectName = 'testDir') => {
  const startDir = join(filesystem.homedir(), 'Developer', 'tmp', projectName)
  filesystem.dir(startDir)
  filesystem
    .cwd(startDir)
    .file('package.json', { content: config.defaults.packageContents })
  return {
    name: projectName,
    path: startDir,
    cli: cliFactory(startDir),
    tearDown: tearDownFactory(projectName, startDir),
    itermocilFilePath: join(
      config.defaults.projectDirectory,
      projectName + '.yml'
    )
  }
}

module.exports = {
  setup
}
