const { filesystem } = require('gluegun')

const { setup } = require('../src/test_utils')

test('generates correct file', async () => {
  const projectName = 'testtDir'
  const { cli, tearDown, itermocilFilePath } = setup(projectName)

  const output = await cli('init')
  expect(output).toContain('Found 1 projects')
  expect(output).toContain(projectName)

  expect(filesystem.exists(itermocilFilePath)).toBe('file')
  const itermocilFile = filesystem.read(itermocilFilePath)

  expect(itermocilFile).toContain(projectName)

  tearDown()
})
