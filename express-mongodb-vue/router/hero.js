
//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const Hero = require("../models/heroSchema");

//登录接口
router.post('/login', function(req, res, next){
  //用户名、密码、验证码
  var username = req.body.username;
  var password = req.body.password;

  if(username === 'ruiwei88888@163.com' && password === '123456'){
      res.cookie('user',username);
      return res.send({
          status: "success",
          info:"欢迎来到德莱联盟"
      });
  }

  return res.send({
      status: "fail",
      info: '账号或密码错误'
  });
});

// 查询所有英雄信息路由
router.post("/getHeroList", (req, res) => {
  var heroPosition = new RegExp(req.body.heroPosition),
      heroSex = req.body.heroSex,
      heroName = req.body.heroName,
      pageNumber = req.body.pageNumber,
      pageRow = req.body.pageRow;

  // 根据查询入参个数，动态生成sql查询语句
  var sqlObj = {};

  if(heroPosition){
    sqlObj.heroPosition = heroPosition;
  }
  if(heroSex){
    sqlObj.heroSex = heroSex;
  }
  if(heroName){
    sqlObj.heroName = heroName;
  }

  
  var heroList = Hero.find(sqlObj);

      //对查询的结果进行筛选，skip跳过结果集中的前多少
      heroList.skip((pageNumber - 1)*pageRow);
      //对剩下来的数据进行限制返回个数
      heroList.limit(pageRow)



    // 实现分页的关键步骤
    heroList.exec(function(err,result){
        if(err){
          res.json({
            status:"fail",
            error:err
          });
        }else{
          Hero.find(sqlObj,function(err,heros){
            res.json({
              status:"success",
              heroList:result,
              total:heros.length
            });
          })
        }
    })
});

// 通过ObjectId查询单个英雄信息路由
router.get("/getHeroDetail/:id", (req, res) => {
  Hero.findById(req.params.id)
    .then(hero => {
      res.json(hero);
    })
    .catch(err => {
      res.json(err);
    });
});

// 添加一个英雄信息路由
router.post("/addHero", (req, res) => {
  // 使用Hero model上的create方法储存数据
  console.log(req)
  Hero.create(req.body, (err, hero) => {
    if (err) {
      res.json({
        status:"fail",
        error:err
      });
    } else {
      res.json({
        status:"success",
        message:"新增成功"
      });
    }
  });

  console.log(req.body)
});

//更新一条英雄信息数据路由
router.put("/modifyHero/:id", (req, res) => {
  console.log(req.params)
  Hero.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        heroName: req.body.heroName,
        age: req.body.age,
        heroSex: req.body.heroSex,
        address: req.body.address,
        heroPosition: req.body.heroPosition,
        favourite: req.body.favourite,
        explain: req.body.explain
      }
    },
    {
      new: true
    }
  )
    .then(hero => res.json({
      status:"success",
      message:"修改成功"
    }))
    .catch(err => res.json({
      status:"fail",
      error:"修改失败"
    }));
});

// 添加图片路由
router.put("/addHeroPic/:id", (req, res) => {
  Hero.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: {
        imgArr: req.body.url
      }
    },
    {
      new: true
    }
  )
    .then(hero => res.json({
      status:"success",
      message:"新增图片成功"
    }))
    .catch(err => res.json({
      status:"fail",
      message:"新增图片失败"
    }));
});

//删除一条英雄信息路由
router.delete("/deleteHero/:id", (req, res) => {
  Hero.findOneAndRemove({
    _id: req.params.id
  })
    .then(hero => res.json({
      status:"success",
      message:"删除成功"
    }))
    .catch(err => res.json({
      status:"fail",
      message:"删除失败"
    }));
});

module.exports = router;




















