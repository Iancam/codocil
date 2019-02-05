const fs = require('fs')
const flatten = require('lodash/flattenDeep')
const { join, basename } = require('path')
const yaml = require('js-yaml')

const gitCommands = ['git pull', 'git status']
const edit = ['code .']

function hasGit(path, fs) {
  return (
    fs
      .readdirSync(path, { withFileTypes: true })
      .filter(ent => ent.isDirectory() && ent.name == '.git').length > 0
  )
}

module.exports = toolbox => {
  toolbox.toItermocil = ({ path }) => {
    const git = hasGit(path, fs) ? gitCommands : []
    let server
    try {
      const packageJsonPath = join(path, 'package.json')
      const pckgjson = JSON.parse(fs.readFileSync(packageJsonPath))
      server = pckgjson.scripts.start ? 'yarn start' : 'nodemon'
    } catch (error) {
      server = 'nodemon'
    }

    const panes = [
      {
        name: 'main',
        commands: flatten([git, edit])
      },
      {
        name: 'server',
        commands: flatten([server])
      }
    ]
    return {
      fname: basename(path) + '.yml',
      contents: yaml.dump({
        windows: [
          {
            name: basename(path),
            root: path,
            layout: 'even-horizontal',
            panes
          }
        ]
      })
    }
  }
}
