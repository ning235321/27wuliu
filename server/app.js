const express = require("express");
const routes = require("./routes")
var multer = require('multer');
var upload = multer();
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

// session
var session = require('express-session');
app.use(session({
  secret: 'classweb0731', // 设置session签名
  name: 'classweb',
  cookie: {maxAge: 60 * 1000 * 60 * 24}, // 存储时间 24 小时
  resave: false, // 每次请求都重新设置session
  saveUninitialized: true
}))
//----------------------

routes(app);
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
})