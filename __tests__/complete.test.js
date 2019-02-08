const { setup } = require('../src/test_utils')

test('completions ', async () => {
  const dirs = ['testDir', 'pescadero', 'felicity']
    .map(setup)
    .forEach(async context => {
      const op = await context.cli('--cmpl')
      expect(op).toContain(context.name)
      context.tearDown()
    })
})
