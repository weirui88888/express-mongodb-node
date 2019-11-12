/*
 * @Author: rui.wei 
 * @Date: 2018-12-18 18:35:08 
 * @Last Modified by: rui.wei
 * @Last Modified time: 2018-12-20 11:34:21
 * 该页面记录常见mongodb增删改查sql
 */


// 根据条件查询(查询某个字段包含某个值)
//db.getCollection('myhero').find({heroPosition:/mid/,heroSex:"man"})

// 更改字段名
//db.test.update({}, {$rename : {"abc" : "def"}}, false, true)

// 更新字段值
// db.getCollection('myhero').update({heroName:"亚索"},{$set:{heroSex:"man"}})
// db.getCollection('myhero').update({heroName:"盲僧"},{$set:{heroPosition:["jungle","support"]}})

// 删除某一条数据
// db.getCollection('myhero').remove({address:"约达尔人"})



