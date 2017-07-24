var fs = require ("fs");
exports.getDirNames = function(callback){
    fs.readdir("./upload",function(err,files){
        if(err){
            throw err;
        }
        var dirNames = [];
        (function iterator(i){
            if(i==files.length){
                //console.log("file",dirNames);
                callback(dirNames);
                return dirNames;
            }
            fs.stat("./upload/"+files[i],function(err,stats){
                if(stats.isDirectory()){
                    dirNames.push(files[i]);
                }
            iterator(i+1);
            });
        })(0);
    });
};
exports.getAllPhotoByDirNames = function(dirName,callback){
    fs.readdir("./upload/"+dirName,function(err,files){
        if(err){
            callback("没有找到该路径下文件夹",null);
            return;
        }
        var allps = [];
        (function iterator(i){
            if(i==files.length){
                callback(null,allps);
                return;
            }
            fs.stat("./upload/"+dirName+"/"+files[i],function(err,stats){
                if(err){
                    callback("该文件不存在"+files[i],null);
                    return;
                }
                if(stats.isFile()){
                    allps.push(files[i]);
                }
                iterator(i+1);
            });
        })(0);
    });
};