const { join, resolve } = require('path')

// const ignoredDirectories = [
//   'node_modules',
//   '.git',
//   '.vscode',
//   '.idea',
//   '__pycache__',
//   /venv*/,
//   '__snapshots__',
//   '.svn'
// ]

// const project_types = [{ name: 'javascript', id: 'package.json' }]

// todo: handle multiple identifiers on a project root

function shouldIgnore(parsedPath, ignoredDirectories) {
  const ignore = ignoredDirectories.map(pattern => {
    const isString = require('lodash/isString')
    return isString(pattern)
      ? parsedPath.includes(pattern)
      : RegExp(pattern).test(parsedPath)
  })
  const shouldIgnore = ignore.reduce((a, b) => a || b)
  return shouldIgnore
}

module.exports = toolbox => {
  toolbox.getProjects = (pathLike, options = { recursive: false }) => {
    const {
      filesystem,
      config: {
        codocil: { projectTypes, ignoredDirectories }
      }
    } = toolbox

    const parsedPath = resolve(pathLike.replace('~', require('os').homedir()))
    if (shouldIgnore(parsedPath, ignoredDirectories)) return

    const candidates = projectTypes
      .filter(({ id }) => {
        const isArray = require('lodash/isArray')
        return isArray(id)
          ? id.reduce(
              (exists, idel) =>
                exists && filesystem.exists(idel.map(join(parsedPath, idel))),
              true
            )
          : filesystem.exists(join(parsedPath, id))
      })
      .map(({ id }) => ({ path: parsedPath, type: id }))
    if (options.recursive) {
      return candidates.concat(
        filesystem
          .list(parsedPath)
          .map(ent => join(parsedPath, ent.name))
          .map(dir => findProjects(dir, { recursive: true }))
          .filter(dir => dir)
          .reduce((arr, dir) => arr.concat(dir), [])
      )
    }

    // [{ path: parsedPath, type: id }]
    return candidates
  }
}
