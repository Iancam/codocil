module.exports = {
  name: 'completionsPath',
  alias: ['completionsPath'],
  run: async ({ filesystem: { path } }) => {
    console.log(path(__dirname, '..', '..', 'bin', 'completionsHook.zsh'))
  }
}
