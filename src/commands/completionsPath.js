module.exports = {
  name: 'completionsPath',
  alias: ['completionsPath'],
  run: async ({ filesystem: { path, cwd } }) => {
    console.log(path(cwd(), 'bin', 'completionsHook.zsh'))
  }
}
