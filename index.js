const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;

const upload = require('./src/upload');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');
// app.use('/', (req, res) => {
//   res.sendFile(path.join(__dirname+'/public/index.html'))
// })
app.use('/upload', upload)



const options = {
    key: fs.readFileSync('./cert.key'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: '7762119'//Mat khau da tao
  };

https.createServer(options, app).listen(port, ()=>{
    console.log("app listen port: "+port);
})