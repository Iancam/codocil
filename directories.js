const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const intersect = require("lodash/intersection");

const project_types = yaml.safeLoad(fs.readFileSync("./project_types.yaml"));
// read config file for directory to watch
// watch directory for new directories

const CONFIG_DIRECTORY = "~/.itermocil";
const CONFIG_FILE = ".codicil.yaml";
const CONFIG_PATH = path.join(CONFIG_DIRECTORY, CONFIG_FILE);

const EXAMPLE_CONFIGS = {
  devDirectory: "~/Developer"
};

//todo: normalize pathy paths

const getConfigs = (config_path = CONFIG_PATH) => {
  return yaml.safeLoad(fs.readFileSync(config_path));
};

function findProjects(root = EXAMPLE_CONFIGS.devDirectory) {
  const contents = fs.readdirSync(root, { withFileTypes: true });
  const [files, dirs] = contents.reduce(
    ([files, dirs], f) =>
      f.isDirectory() ? dirs.push(f.name) : files.push(f.name),
    [[], []]
  );
  const projectPaths = intersect(files, Object.keys(project_types))
    .map(proj => path.join(root, proj))
    .concat(dirs.map(dir => findProjects(dir, newPaths)));
  return projectPaths;
}

//try makeItermocilFile
// else keep watching for file changes until we get a known project type
//

//how do we tell if the file is live?
