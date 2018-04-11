var QrCode = require('qrcode-reader')
var Jimp = require('jimp')
var fs = require('fs')

var qr = new QrCode()

qr.callback = function(err, result) {
    if(err) throw err
    else {
        console.log(result)
    }
}
var file = fs.readFileSync('/home/anhquoctran/Pictures/qrcode.png')
Jimp.read(file, function(err, img) {
    if(err) throw err
    else {
        qr.decode(img.bitmap)
    }
})