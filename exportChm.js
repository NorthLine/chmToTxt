var cp = require("child_process");

function unZIP(winRarPath, password, zipFilePath, unZipFolder) {
    return new Promise(async(resolve, reject) => {
        cp.execFile(winRarPath, ["x", zipFilePath, '-o' + unZipFolder], function(err, stdout, stderr) {
            if (err) {
                reject(err)
            }
            resolve(stdout)
        })
    })
}
async function exportMain(filepath, fileName) {
    console.log('filepath:' + filepath);
    console.log('fileName:' + fileName);
    try {
        let result = await unZIP("C:\\Program Files\\2345Soft\\HaoZip\\HaoZipC.exe", '', filepath, fileName);
        console.log(fileName + '解压成功')
    } catch (error) {
        console.log(error)
    }
}


module.exports = exportMain