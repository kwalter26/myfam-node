var fs = require('fs');
var path = require('path');

module.exports = {
    newCloud: function(dir){
        fs.mkdirSync('./public/uploads/'+ dir,0744);
    },
    newPicture: function(dir,file){

    }
}