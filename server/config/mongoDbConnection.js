const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "mybishe"
let _db = null;

async function connectDb() {
    if (!_db) {
        try {
            const client = new MongoClient(url, { /* useNewUrlParser: true,  */useUnifiedTopology: true });
        await client.connect();
        _db = await client.db(dbName)
        } catch (error) {
            console.log("数据库连接出错");
        }
    }
    return _db;
}

exports.getCollection = (collection) => {
    let _col = null;
    return async () => {
        if (!_col) {
        try {
        const db = await connectDb();
        _col = await db.collection(collection);
        } catch (error) {
            throw "选择collection出错"
        }
        }
        return _col;
    }
}