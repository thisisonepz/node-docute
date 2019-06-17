//读取文件
let fs = require("fs");
//监控文件
let watch= require("watch");
//path模块，可以生产相对和绝对路径
let path = require("path");
//获取当前目录绝对路径，这里resolve()不传入参数
let baser_filePath=path.resolve();
//设置读取位置为doc文件夹
let filePath =path.join(baser_filePath,'public','doc') ;
//读取文件存储数组
let fileArr = [];
//读取文件目录
function getFileList(){
  fileArr=[];
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.log(err);
      return;
    }
    files.forEach(function (filename,index) {
      fs.stat(path.join(filePath, filename), function (err, stats) {
        if (err) throw err;
        //如果是文件夹
        if (stats.isDirectory()) {
          fileArr[index]={
            title:filename,
            collapsable:true,
            children:[]
          };
          readFile(path.join(filePath, filename), filename);
        }
      });
    });
  });
}
getFileList();
//监听doc文件的变化
watch.createMonitor('./public/doc', function (monitor) {
  monitor.on("created", function (f, stat) {
    // Handle new files
    getFileList()
  });
  monitor.on("changed", function (f, curr, prev) {
    // Handle file changes
    getFileList()
  });
  monitor.on("removed", function (f, stat) {
    // Handle removed files
    getFileList()
  });

});

//获取文件数组
function readFile(readurl, name) {
  let names = name;
  fs.readdir(readurl, function (err, files) {
    if (err) {
      console.log(err);
      return;
    }
    files.forEach(function (filename) {
      fs.stat(path.join(readurl, filename), function (err, stats) {
        if (err) throw err;
        //是文件
        if (stats.isFile()) {
          //文件名作为路由
          let newUrl ='/doc/'+ names + '/' + filename;
          //去掉.md 对文件匹配的做路由
          for (let i=0;i<fileArr.length;i++){
            if(names===fileArr[i].title){
              fileArr[i].children.push({
                link:newUrl.replace('.md',''),
                title:filename.replace('.md','')
              });
            }
          }
          writeFile(fileArr)
        }
      });
    });
  });
}

// 写入到user.json文件
function writeFile(data) {
  fs.writeFile(baser_filePath+"/routes/"+"user.json",JSON.stringify(data)+'\n',function(err){
    if(err) throw err;
  });
}

