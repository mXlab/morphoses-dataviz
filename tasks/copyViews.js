const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");

// directory paths
const srcDir = path.join(__dirname, "../views");
const destDir = path.join(__dirname, "../dist/public");


// copy function
function copyDir() {
    console.log("copying views...");
    // copy
    fse.copySync(srcDir, destDir, { overwrite: true });
    console.log("done copying views!");
}


// watch for changes
fs.watch(srcDir, (event, filename) => copyDir());
copyDir();
