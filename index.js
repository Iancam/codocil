const projects = require("./directories");

const p = projects("~/Developer", { recursive: true });
console.log(p);
