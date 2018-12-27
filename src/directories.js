const fs = require('fs')
const { join, resolve } = require('path')

const ignoredDirectories = [
  'node_modules',
  '.git',
  '.vscode',
  '.idea',
  '__pycache__',
  /venv*/,
  '__snapshots__',
  '.svn'
]

const project_types = [{ name: 'javascript', id: 'package.json' }]

// todo: handle multiple identifiers on a project root

function shouldIgnore(parsedPath) {
  const ignore = ignoredDirectories.map(pattern => {
    const isString = require('lodash/isString')
    return isString(pattern)
      ? parsedPath.includes(pattern)
      : RegExp(pattern).test(parsedPath)
  })
  const shouldIgnore = ignore.reduce((a, b) => a || b)
  return shouldIgnore
}

module.exports = function findProjects(
  pathLike,
  options = { recursive: false }
) {
  const parsedPath = resolve(pathLike.replace('~', require('os').homedir()))
  if (shouldIgnore(parsedPath)) return

  const candidates = project_types
    .filter(({ id }) => {
      const isArray = require('lodash/isArray')
      return isArray(id)
        ? id.reduce(
            (exists, idel) =>
              exists && fs.existsSync(idel.map(join(parsedPath, idel))),
            true
          )
        : fs.existsSync(join(parsedPath, id))
    })
    .map(({ id }) => ({ path: parsedPath, type: id }))
  if (options.recursive) {
    return candidates.concat(
      fs
        .readdirSync(parsedPath, { withFileTypes: true })
        .filter(ent => ent.isDirectory())
        .map(ent => join(parsedPath, ent.name))
        .map(dir => findProjects(dir, { recursive: true }))
        .filter(dir => dir)
        .reduce((arr, dir) => arr.concat(dir), [])
    )
  }

  // [{ path: parsedPath, type: id }]
  return candidates
}
