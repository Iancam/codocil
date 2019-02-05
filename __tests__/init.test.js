const { system, filesystem } = require('gluegun')
const { resolve, join } = require('path')
const config = require('../src/codocil.config')
const src = resolve(__dirname, '..')

const cli = async cmd => {
  const projectName = 'testDir'
  filesystem.dir('testDir')
  filesystem.cwd('testDir')
  filesystem.file('package.json')
  system.run('cd testDir')
  return system.run('node ' + resolve(src, 'bin', 'codocil') + ` ${cmd}`)
}
test('generates file', async () => {
  const projectName = 'testDir'
  filesystem.dir('testDir')
  filesystem.cwd('testDir')
  filesystem.file('package.json')

  const output = await cli('init ./testDir')
  expect(output).toContain('Found 1 projects')
  expect(output).toContain('testDir')

  const itermocilFilePath = join(config.defaults.projectDirectory, projectName)
  const itermocilFile = filesystem.read(itermocilFilePath)

  expect(itermocilFile).toContain(`module.exports = {`)
  // expect(foomodel).toContain(`name: 'foo'`)

  // cleanup artifact
  filesystem.cwd('../')
  filesystem.remove('testDir')
  filesystem.remove(itermocilFilePath)
})
