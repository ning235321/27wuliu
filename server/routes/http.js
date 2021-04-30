const express = require("express")
var crypto = require('crypto'); 
var route = express.Router();


//设置跨域访问
route.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS,PATCH");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
 


const goodsModel = require("../models/goods")
const userModel = require("../models/user")
const driverModel = require("../models/driver")

//-----------------用户-------------------------------

route.get("/user", async (req,res) => {
    try {
        const posts = await userModel.findAll();
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(404).send();
    }
})
route.post("/user/:id", async (req,res) => {
    try {
        const posts = await userModel.findOne(req.params.id);
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(404).send();
    }
})





route.post("/user", async (req, res) => {
    try {
        console.log(req.body);
        const newPost = await userModel.save(req.body);
        
    res.status(201).json(newPost);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
})

route.put("/user/:id", async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.params);
        const updatedPost = await userModel.Update(req.params.id, req.body);
        res.json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
   
});
route.patch("/user/:id/isadmin", async (req, res) => {
    try {
        const updatedPost = await userModel.Update(req.params.id, req.body);
        res.json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
   
});


route.delete("/user/:id", async (req, res) => {
    try {
    await userModel.delete(req.params.id);
    res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
})


route.delete("/user/:id/goodslist", async (req, res) => {
    try {
        console.log(req.params.id,req.body.goodsnum);
        await userModel.deleteGoodsByUser(req.params.id, req.body.goodsnum);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
})


route.post("/user/:id/goodslist", async (req, res) => {
    try {
        await userModel.addGoodsByUser(req.params.id, req.body.goodslist);
        console.log(req.body);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
})


//-------------------下面是goods---------------------------------------------------------------------------------------


route.get("/goods", async (req,res) => {
    try {
        const posts = await goodsModel.findAll();
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(404).send();
    }
})

route.post("/goods", async (req, res) => {
    try {
        const newPost = await goodsModel.save(req.body);
    res.status(201).json(newPost);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
})

route.put("/goods/:id", async (req, res) => {
    try {
        const updatedPost = await goodsModel.Update(req.params.id, req.body);
        res.json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
   
});


route.delete("/goods/:id", async (req, res) => {
    try {
    await goodsModel.delete(req.params.id);
    res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
})

//-----------司机---------------------------------------------------

route.get("/driver", async (req,res) => {
    try {
        const posts = await driverModel.findAll();
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(404).send();
    }
})



route.post("/driver", async (req, res) => {
    try {
        console.log(req.body);
        const newPost = await driverModel.save(req.body);
        
    res.status(201).json(newPost);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
})

route.put("/driver/:id", async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.params);
        const updatedPost = await driverModel.Update(req.params.id, req.body);
        res.json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
   
});
// route.patch("/driver/:id/isadmin", async (req, res) => {
//     try {
//         const updatedPost = await userModel.Update(req.params.id, req.body);
//         res.json(updatedPost);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send();
//     }
   
// });


route.delete("/driver/:id", async (req, res) => {
    try {
    await driverModel.delete(req.params.id);
    res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
})


// route.delete("/user/:id/goodslist", async (req, res) => {
//     try {
//         await userModel.deleteGoodsByUser(req.params.id, req.body.goodsnum);
//         res.status(204).send();
//     } catch (error) {
//         console.error(error);
//         res.status(500).send();
//     }
// })

module.exports = route;