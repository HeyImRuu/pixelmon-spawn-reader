require("dotenv").config();
const fs = require("fs");

let allFiles = [];
let dirs = [];
let o = new Object();

function getDirs() {
    dirs = fs.readdirSync(process.env.filePath,"utf8")
    for (let i = 0; i < dirs.length; i++) {
        allFiles.push(fs.readdirSync(process.env.filePath+dirs[i],"utf8"))
    }
    //remove loot folders
    for (let i = 0; i < allFiles.length; i++) {
        for (var j = allFiles[i].length - 1; j >= 0; j--) {
            if (allFiles[i][j] === "loot") {
                allFiles[i].splice(j, 1);
            }
        }
    }
    allFiles.splice(dirs.indexOf("unimplemented"),1)

}
getDirs();



for (let i = 0; i < allFiles.length; i++) {
    let arr = []
    for (let j = 0; j < allFiles[i].length; j++) {
        /*console.log(process.env.filePath+dirs[i]+"/"+allFiles[i][j])
        console.log(i+dirs[i])
        console.log(allFiles[i][j])*/
        arr.push(JSON.parse(fs.readFileSync(process.env.filePath+dirs[i]+"/"+allFiles[i][j], "utf-8")))
        o[dirs[i]] = arr;
        
    }
    //console.log(allFiles[i])
}
console.log(o["fishing"]);

for (let i = 0; i < o["fishing"].length; i++) {
    o["fishing"][i].spawnInfos
    
}