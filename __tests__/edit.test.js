const { system, filesystem } = require('gluegun')
const { resolve, join } = require('path')
const config = require('../src/codocil.config')
const src = resolve(__dirname, '..')
const pname = 'testDir'
const projPath = join(filesystem.homedir(), 'Developer', 'tmp', pname)

const cli = async cmd => {
  filesystem.dir(projPath)
  filesystem.cwd(projPath).file('package.json')
  return system.run(
    `cd ${projPath} && ` + 'node ' + resolve(src, 'bin', 'codocil') + ` ${cmd}`
  )
}

test('project in right place', async () => {
  const output = await cli('init ' + projPath)
  expect(output).toContain('Found 1 projects')
  expect(output).toContain(pname)
  const itermocilFilePath =
    join(config.defaults.projectDirectory, pname) + '.yml'
  expect(filesystem.isFile(itermocilFilePath)).toBe(true)
  filesystem.remove(projPath)
  filesystem.remove(itermocilFilePath)
})
