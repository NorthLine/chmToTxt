const ComponentInit = require("./getPathTree");
const fnreadByArray = require('./readTxtAndReturn')
const path = require("path")
const fs = require('fs');


function getTxtAndResolveToSingleTxxt(dirPath, name) {
    let getFilse = ComponentInit(dirPath, true)
    let getTxtArray = []

    getFilse.childDir.txt.childFiles.forEach(item => {
        debugger
        console.log(item.short);
        if (item.short.indexOf('.txt') > 0) {
            debugger
            getTxtArray.push(item)
        }
    })
    fnreadByArray(getTxtArray).then(res => {
        let getAllTxt = res

        fs.writeFileSync(name, getAllTxt, (error, data) => {
            console.log(error, data);
        })
    })

}

// let thisObj = {
//     "short": "《迷情都市三部曲》（未删节全本作者：幻想.chm",
//     "full": "D:\\workspace\\frontEnd\\chmToTxt\\小说合集\\files (100)\\《迷情都市三部曲》（未删节全本作者：幻想.chm",
//     "dirPath": "D:\\workspace\\frontEnd\\chmToTxt\\小说合集\\files (100)\\《迷情都市三部曲》（未删节全本作者：幻想"
// }


// getTxtAndResolveToSingleTxxt(thisObj.dirPath, thisObj.short + '.txt')
module.exports = getTxtAndResolveToSingleTxxt;