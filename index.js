const projects = require("./directories");
const itermocil = require("./itermocil");
const fs = require("fs");
const { resolve, join } = require("path");

const { expandTilde } = require("./utils");

const directory = expandTilde(process.argv[2] || process.cwd());
const ITERMOCIL_DIRECTORY = "~/.itermocil";
const CODOCIL_PREFIX = "COD_";

const p = projects(directory, { recursive: true });

p.map(itermocil).forEach(({ fname, contents }) => {
  const path = resolve(
    join(expandTilde(ITERMOCIL_DIRECTORY), CODOCIL_PREFIX + fname)
  );
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, contents);
  }
});

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
