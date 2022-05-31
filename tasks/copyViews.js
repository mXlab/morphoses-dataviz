const fse = require("fs-extra");
const path = require("path");

const srcDir = path.join(__dirname, "../views");
const destDir = path.join(__dirname, "../dist/public");

fse.copySync(srcDir, destDir, { overwrite: true });

console.log("done copying views...");