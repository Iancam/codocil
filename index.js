const projects = require("./directories");
const itermocil = require("./itermocil");

const p = projects("~/Developer", { recursive: true });

const i = itermocil(p[1]);

console.log(i);
