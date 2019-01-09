const { join } = require('path')
const itermocil = join(require('os').homedir(), '.itermocil')

module.exports = {
  name: 'codocil',
  defaults: {
    itermocilDirectory: itermocil,
    projectDirectory: join(itermocil, '.codocil')
  }
}
