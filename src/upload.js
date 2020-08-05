const express = require('express');
const route = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const crearNFT = require('../app');

route.get('/', (req, res) => {
  res.render('upload');
})

route.post('/uploadimg', (req, res) => {
  var path, newpath;
  var form = new formidable.IncomingForm();
  //Thiết lập thư mục chứa file trên server
  form.uploadDir = "./public/image/";
  //xử lý upload
  form.parse(req, function (err, fields, file) {
    //path tmp trên server
    path = file.files.path;
    //thiết lập path mới cho file
    newpath = form.uploadDir + file.files.name;
    crearNFT(newpath);
    fs.rename(path, newpath, function (err) {
      if (err) throw err;
      res.end('Upload Thanh cong!');
    });
  });

})

module.exports = route;