const projects = require('./directories')
const itermocil = require('./itermocil')
const fs = require('fs')
const { resolve, join } = require('path')
const { expandTilde } = require('./utils')
const { exec } = require('child_process')

const args = ['init', 'update']

const activity = process.argv[2]
  ? args.find(x => x === process.argv[2])
  : 'init'

const directory = expandTilde(process.cwd())
const CODOCIL_DIRECTORY = '~/.itermocil/codocil'

//[{ path: parsedPath, type: id }]
const p = projects(directory, { recursive: true })

const itermocil = p.map(itermocil)

itermocil.forEach(({ fname, contents }) => {
  const path = resolve(join(expandTilde(CODOCIL_DIRECTORY), fname))
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, contents)
  }
})

const projectCmd = ['itermocil', '~/.itermocil/codocil/', project]
const initCmd = exec(``, (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    return
  }

  // the *entire* stdout and stderr (buffered)
  console.log(`stdout: ${stdout}`)
  console.log(`stderr: ${stderr}`)
})

// write to disk
//deal with edge cases
// - name collision resolution
// make the things configurable
// - git commands
// - editor
// - panes
// default runner
// write language plugin architecture

// write tests, lols
//
