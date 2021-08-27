const ComponentInit = require("./getPathTree");
const getTxtAndResolveToSingleTxxt = require('./dirToTxt')
const exportMain = require("./exportChm")

let getTree = ComponentInit("\\小说合集"); //这里书文件夹入口 文件夹应与index。js同级  同时文件地址为  \\ 开头
//getTree为解析获取到的JSON书文件


//-----------------------------------------------Start 分析并提取出chm文件的地址数组对象 -------------------------------------------------------

let allChild = getTree.childDir;
let newArray = [];
for (var i in allChild) {
    for (var j = 0; j < allChild[i].childFiles.length; j++) {
        if (allChild[i].childFiles[j].short.indexOf(".chm") > 0) {
            newArray.push(allChild[i].childFiles[j]);
        }
    }
}
//-------------------------------------------------End  最终结果集在 newArray 对象中-----------------------------------------------------
let startNumber = 0
const endNumber = newArray.length

let exportStart = 0
let EndNumbesss = newArray.length


let textStart = 130
let textEnd = newArray.length

// 遍历并定义解压文件名称
function exportChm() {
    if (startNumber < endNumber) {
        let waitExport = newArray[startNumber]
        let chmFile = waitExport.full
        let dir = chmFile.substring(0, chmFile.length - 4) //这里简单的去除 .chm作为文件夹名称
        newArray[startNumber].dirPath = dir

        setTimeout(function() {
            startNumber++
            exportChm()
        }, 10)
    } else {
        EndNumbesss = newArray.length
        chmToDir()

    }
}


exportChm()

// 序列解压缩
function chmToDir() {
    if (exportStart < EndNumbesss) {
        let thisOne = newArray[exportStart]

        exportMain(thisOne.full, thisOne.dirPath) //调用解压
        setTimeout(() => {
            exportStart++
            chmToDir()
        }, 5000);
    } else {
        textEnd = newArray.length
        exportFiles()
    }
}



// 提取txt并合并为一个txt
function exportFiles() {
    if (textStart < textEnd) {
        let thisOne = newArray[textStart]
        console.log(JSON.stringify(thisOne) + '------------' + textStart);

        getTxtAndResolveToSingleTxxt(thisOne.dirPath, './text/' + thisOne.short + '.txt') //调用输出txt文件   统一输出到text文件夹   文件名为原名称.txt
        setTimeout(() => {
            textStart++
            exportFiles()
        }, 3000);
    } else {
        console.log('输出完成');
    }
}