const postCollection = require("../config/mongoDbConnection").getCollection("driver");
const { ObjectId } = require("mongodb");


exports.save = async (post) => {
    try {
        const col = await postCollection();
        const result = await col.insertOne(post);
        return result.ops && result.ops[0];
    } catch (error) {
        throw "添加到数据库出错"
    }
}

exports.findAll = async () => {
    try {
        const col = await postCollection();
        return col.find({}).toArray();
    } catch (error) {
        throw "查询出错"
    }
}

exports.findAllName = async () => {
    try {
        const col = await postCollection();
        return col.find({name:'xiaobai'}).toArray();
    } catch (error) {
        throw "查询出错"
    }
}



exports.Update = async (id, post) => {
    try {
        const col = await postCollection();
        const result = await col.findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set: post },
            { returnOriginal: false }
        );
        return result.value;
    } catch (error) {
        throw "更新出错"
    }
}
// exports.UpdateAdminByUser = async (id, post) => {
//     try {
//         const col = await postCollection();
//         const result = await col.findOneAndUpdate(
//             { _id: ObjectId(id) },
//             { $set: post },
//             { returnOriginal: false }
//         );
//         return result.value;
//     } catch (error) {
//         throw "更新出错"
//     }
// }


exports.delete = async (id) => {
    try {
        const col = await postCollection();
        await col.deleteOne({ _id: ObjectId(id) });
    } catch (error) {
        throw "删除出错"
    }
}


// exports.deleteGoodsByUser = async (postId, goodsnum) => {
//     try {
//         const col = await postCollection();
//         await col.updateOne(
//             { _id: ObjectId(postId) },
//             {$pull:{goodslist:{goodsnum}}}
//         )
//     } catch (error) {
//         throw "删除货物出错"
//     }
// }