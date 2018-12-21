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

const EXAMPLE_CONFIGS = {
  devDirectory: "~/Developer"
};

const ignoredDirectories = [
  "node_modules",
  ".git",
  ".vscode",
  ".idea",
  /venv*/,
  "__snapshots__",
  ".svn"
];
//todo: normalize pathy paths
//todo: handle multiple identifiers on a project root
//ignore nodemodules and others when searching

const getConfigs = (config_path = CONFIG_PATH) => {
  return yaml.safeLoad(fs.readFileSync(config_path));
};

module.exports = function findProjects(
  pathLike,
  options = { recursive: false }
) {
  const parsedPath = path.resolve(
    pathLike.replace("~", require("os").homedir())
  );
  const ignore = ignoredDirectories.map(pattern => {
    return isString(pattern)
      ? parsedPath.includes(pattern)
      : RegExp(pattern).test(parsedPath);
  });
  const shouldIgnore = ignore.reduce((a, b) => a || b);

  if (shouldIgnore) {
    console.log(
      zip(ignoredDirectories, ignore).filter(([dir, ign]) => ign),
      parsedPath
    );
    return;
  }
  // console.log(parsedPath);

  const candidates = Object.values(project_types)
    .filter(({ id }) =>
      isArray(id)
        ? id.reduce((exists, idel) => exists && fs.existsSync(idel), true)
        : fs.existsSync(id)
    )
    .map(type => ({ path, type }));
  if (options.recursive) {
    const dirs = fs
      .readdirSync(parsedPath, { withFileTypes: true })
      .filter(ent => ent.isDirectory())
      .map(ent => path.join(parsedPath, ent.name));
    return [
      ...candidates,
      ...dirs.map(dir => findProjects(dir, { recursive: true }))
    ];
  }
  return candidates;
};
