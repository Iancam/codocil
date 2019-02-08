const { filesystem } = require('gluegun')
const { join } = require('path')

test('completionsPath file exists', async () => {
  expect(
    filesystem.isFile(join(filesystem.cwd(), 'bin', 'completionsHook.zsh'))
  ).toBe(true)
})
