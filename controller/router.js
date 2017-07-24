var file = require ("../models/file.js"),
    fs = require ("fs"),
    sd = require ("silly-datetime"),
    formidable = require ("formidable"),
    path = require ("path");
var form = new formidable.IncomingForm();
    form.uploadDir = "./upload/";
    form.keepExtensions = true;
    form.multiples = true;
var time = sd.format(new Date(),'YYYYMMDDHHmmss'),
    ran =parseInt(Math.random()*12345+100000);
exports.showIndex = function(req,res){
    file.getDirNames(function(names){
        res.render("index",{"names":names});
    });
};
exports.showPhotos = function(req,res,next){
    var dirName = req.params.dirName;//获取相册名
    file.getAllPhotoByDirNames(dirName,function(err,photos){//根据相册名称，读取对应路径下的内容
        if(err){
            next();
            return;
        }
        res.render("photos",{"photos":photos,"dirName":dirName});
    });
};
exports.showUpPage = function(req,res){
    file.getDirNames(function(names){
        res.render("uploading",{"names":names});
    });
};
exports.showUpMu = function(req,res){
    file.getDirNames(function(names){
        res.render("multipart",{"names":names});
    });
};
exports.showAdd = function(req,res){ res.render("add");};
exports.doPost = function(req,res){
    form.parse(req,function(err,fields,files){
        var fname = path.extname(files.picture.name);
        var newpath = "upload/"+fields.dirName+"/"+time+ran+fname;
        fs.rename(files.picture.path,newpath,function(err){
            if(err){
                res.send("上传失败");
            }
            res.redirect(fields.dirName);
        });
    });
};
exports.UpMu = function(req,res) {
    var ff=[];
    form.on("file",function (field,file) {
        ff.push(file);
    });
    form.parse(req,function(err,fields,files){
        (function iterator(i){
            if(i==ff.length){
                res.redirect(fields.dirName);
                return;
            }
            var fname = path.extname(ff[i].name);
            var newpath = "upload/"+fields.dirName+"/"+time+ran+fname;
            fs.rename(ff[i].path,newpath,function(err){
                if(err){
                    res.send("上传失败");
                    return;
                }
                iterator(i+1);
            });
        })(0);
    });
};
exports.Add = function(req,res){
    form.parse(req,function(err,fields,files){
        fs.mkdir("./upload/"+fields.newfile,function(err){
            res.redirect("/");
        });
    });
};