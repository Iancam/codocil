const { join } = require('path')
const itermocil = join(require('os').homedir(), '.itermocil')

module.exports = {
  name: 'codocil',
  defaults: {
    packageContents: {
      name: 'codocil',
      version: '0.0.1',
      description: 'codocil CLI',
      private: true,
      bin: {
        codocil: 'bin/codocil'
      },
      scripts: {
        format: 'prettier --write **/*.{js,json} && standard --fix',
        lint: 'standard',
        test: 'jest',
        watch: 'jest --watch --verbose=false',
        snapupdate: 'jest --updateSnapshot',
        coverage: 'jest --coverage'
      },
      license: 'MIT',
      dependencies: {
        gluegun: 'next',
        lodash: 'next'
      },
      devDependencies: {
        jest: '^24.0.0-alpha.16',
        prettier: '^1.12.1',
        standard: '^12.0.1'
      },
      jest: {
        testEnvironment: 'node'
      },
      standard: {
        env: ['jest']
      },
      prettier: {
        semi: false,
        singleQuote: true
      }
    },
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
