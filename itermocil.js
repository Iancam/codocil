const fs = require("fs");
const isArray = require("lodash/isArray");
const isString = require("lodash/isString");
const zip = require("lodash/zip");
const path = require("path");
const yaml = require("js-yaml");
const project_types = yaml.safeLoad(fs.readFileSync("./project_types.yaml"));
const CONFIG_DIRECTORY = "~/.itermocil";
const CONFIG_FILE = ".codicil.yaml";
const CONFIG_PATH = path.join(CONFIG_DIRECTORY, CONFIG_FILE);

gitCommands = {
  commands: ["git pull", "git status"]
};

function handleSingleWindow({ path, type }) {
  const hasGit = hasGit(path);
  const server = project_types[type];

  return {};
}

function toItermocilDocument(project) {
  if (isArray(project)) {
  } else {
  }
}
