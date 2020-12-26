var express = require('express');
var router = express.Router();



require("dotenv").config();
const fs = require("fs");

let allFiles = [];
let dirs = [];
let o = new Object();

//get files in dir
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

//get file contents
for (let i = 0; i < allFiles.length; i++) {
    let arr = []//clear the array for the next group
    for (let j = 0; j < allFiles[i].length; j++) {
        /*console.log(process.env.filePath+dirs[i]+"/"+allFiles[i][j])
        console.log(i+dirs[i])
        console.log(allFiles[i][j])*/
        arr.push(JSON.parse(fs.readFileSync(process.env.filePath+dirs[i]+"/"+allFiles[i][j], "utf-8")))
        o[dirs[i]] = arr;//save it
        
    }
    //console.log(allFiles[i])
}
//console.log(o["fishing"][0]);


/*for (let i = 0; i < o["fishing"].length; i++) {
    for (let j = 0; j < o["fishing"][i].spawnInfos.length; j++) {
      rarities.push(o["fishing"][i].spawnInfos[j]["rarity"]);
      raritiesNames.push(o["fishing"][i].spawnInfos[j]["spec"].name)
      raritiesColours.push("rgb("+Math.random()*255+","+Math.random()*255+","+Math.random()*255+")")
      //console.log(o["fishing"][i].spawnInfos[j]["rarity"])
      //console.log(o["fishing"][i].spawnInfos[j]["spec"].name)
    }
    
}
*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { o: o });
});

module.exports = router;
