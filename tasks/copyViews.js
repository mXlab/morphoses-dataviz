// imports
const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");

// directory paths
const viewsDir = path.join(__dirname, "../views");
const assetsDir = path.join(__dirname, "../assets");
const destDir = path.join(__dirname, "../dist/public");


// copy functions
function copyDir(src, dest) {
    console.log(`copying ${src}...`);
    // copy
    fse.copySync(src, dest, { overwrite: true });
    console.log("done copying!");
}

// watch for changes
fs.watch(viewsDir, (event, filename) => copyDir(viewsDir, destDir));
fs.watch(assetsDir, (event, filename) => copyDir(assetsDir, destDir));

// execute once
copyDir(viewsDir, destDir);
copyDir(assetsDir, destDir);
