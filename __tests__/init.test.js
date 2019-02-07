const { filesystem } = require('gluegun')
const { join } = require('path')
const config = require('../src/codocil.config')

const { setup } = require('../src/test_utils')

test('generates correct file', async () => {
  const projectName = 'testDir'
  const { cli, tearDown } = setup(projectName)

  const output = await cli('init')
  expect(output).toContain('Found 1 projects')
  expect(output).toContain(projectName)

  const itermocilFilePath = join(
    config.defaults.projectDirectory,
    projectName + '.yml'
  )
  expect(filesystem.exists(itermocilFilePath)).toBe('file')
  const itermocilFile = filesystem.read(itermocilFilePath)

  expect(itermocilFile).toContain(projectName)

  tearDown()
})
