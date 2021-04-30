const httpclient = require("./http")
module.exports = app => {
    app.use("/",httpclient)
}



