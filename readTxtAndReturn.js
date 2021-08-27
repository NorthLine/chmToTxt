const { resolve } = require('dns');
const fs = require('fs');
const iconv = require("iconv-lite")
let readString = ''
let baseArray = []
let nextP = `

`
let StartNum = 0
let EndSum = 0

function readFile() {
    if (StartNum < EndSum) {
        let path = baseArray[StartNum].full
        let name = baseArray[StartNum].short
        fs.readFile(path, (err, data) => {
            if (err) throw err;
            var buff = new Buffer.from(data, "binary");
            var strr = iconv.decode(buff, 'gbk');
            strr = strr.substring(10)
            strr = strr.substring(strr.indexOf('document.write'))
            strr = strr.replace(/\'\)/g, nextP)
            strr = strr.replace(/<\/font>/g, nextP)

            strr = strr.replace(/document.write \(\'/g, nextP)
            strr = strr.replace(/<p>/g, nextP)
            strr = strr.replace(/<\/p>/g, nextP)
            strr = nextP + '第' + name + '篇' + nextP + strr
            console.log(nextP + '第' + name + '篇' + nextP);
            StartNum++
            readString += strr
            readFile()

        })
    } else {
        return ''
    }

}


function readByArray(array) {
    baseArray = array
    EndSum = baseArray.length
    StartNum = 0
    readString = ''
    readFile()
    return new Promise((resolve) => {
        setInterval(() => {
            if (StartNum == EndSum) {
                resolve(readString)
            }
        }, 1000);
    });


}


async function fnreadByArray(array) {
    readString = ''
        // getPromise会返回一个Promise
    const data = await readByArray(array);
    // fn运行在这停顿，这里会停1秒，最后输出data
    // 要wait等待getPromise()这个异步操作返回结果

    // 最后返回data，当然你要是处理完业务也可以不返回
    // 视场景而定了，只是想告诉你async会返回一个promise，而这个data在then里面拿到
    return data;
}

module.exports = fnreadByArray