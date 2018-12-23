const fs = require("fs");
const flatten = require("lodash/flattenDeep");
const isArray = require("lodash/isArray");
const isString = require("lodash/isString");
const zip = require("lodash/zip");
const { join, basename } = require("path");
const yaml = require("js-yaml");

const project_types = yaml.safeLoad(fs.readFileSync("./project_types.yaml"));
const CONFIG_DIRECTORY = "~/.itermocil";
const CONFIG_FILE = ".codicil.yaml";
const CONFIG_PATH = join(CONFIG_DIRECTORY, CONFIG_FILE);

gitCommands = ["git pull", "git status"];

function hasGit(path) {
  return (
    fs
      .readdirSync(path, { withFileTypes: true })
      .filter(ent => ent.isDirectory() && ent.name == ".git").length > 0
  );
}

module.exports = function createTermocilProject({ path }) {
  const git = hasGit(path) ? gitCommands : [];
  const edit = ["code ."];
  let server;
  try {
    const packageJsonPath = join(path, "package.json");
    const pckgjson = JSON.parse(fs.readFileSync(packageJsonPath));
    server = pckgjson.scripts.start || "nodemon";
  } catch (error) {
    server = "nodemon";
  }

  const panes = [
    {
      name: "main",
      commands: flatten([git, edit])
    },
    {
      name: "server",
      commands: flatten([server])
    }
  ];
  return {
    windows: [
      {
        name: basename(path),
        root: path,
        layout: "even-horizontal",
        panes
      }
    ]
  };
};
