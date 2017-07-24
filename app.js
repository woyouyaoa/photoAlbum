var ejs = require ("ejs"),
    fs = require ("fs"),
    router = require ("./controller"),
    express = require ("express"),
    app = express();
app.listen(4000);
//app.get("/",function(req,res){res.send("hahah");}); 测试app
app.use(express.static("./public"));//若要一个文件夹可以被直接用地址访问到 使用express.static()方法
app.use(express.static("./upload"));
app.set("view engine","ejs");
app.get("/",router.showIndex);
app.get("/:dirName",router.showPhotos);//添加处理/:dirName
app.get("/uploading",router.showUpPage);//添加上传图片页面
app.get("/multipart",router.showUpMu);// 添加批量上传图片页面
app.get("/add",router.showAdd);//添加文件夹页面
app.post("/uploading",router.doPost);//处理单个图片上传
app.post("/multipart",router.UpMu);//处理批量图片上传
app.post("/add",router.Add);
app.use(function(req,res){//路径错误处理
    res.render("err");
});

