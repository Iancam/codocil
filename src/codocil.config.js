const { join } = require('path')
const itermocil = join(require('os').homedir(), '.itermocil')

module.exports = {
  name: 'codocil',
  defaults: {
    itermocilDirectory: itermocil,
    projectDirectory: join(itermocil, '.codocil'),
    ignoredDirectories: [
      'node_modules',
      '.git',
      '.vscode',
      '.idea',
      '__pycache__',
      /venv*/,
      '__snapshots__',
      '.svn'
    ],
    projectTypes: [{ name: 'javascript', id: 'package.json' }]
  }
}
