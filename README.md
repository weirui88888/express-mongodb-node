## express+mongodb+vue实现增删改查-全栈之路
前后端分离实现增删改查




`vue` `element` `mongodb` `express` 

---
## 效果图

![新增数据](https://upload-images.jianshu.io/upload_images/3175257-6546e65c9673312f.gif?imageMogr2/auto-orient/strip)

---

![删除数据](https://upload-images.jianshu.io/upload_images/3175257-ce90f2f00250ed58.gif?imageMogr2/auto-orient/strip)
---

![修改数据](https://upload-images.jianshu.io/upload_images/3175257-3b53bf7e0919c94c.gif?imageMogr2/auto-orient/strip)
---

![查看详情页面](https://upload-images.jianshu.io/upload_images/3175257-95b1df081967a7a2.gif?imageMogr2/auto-orient/strip)





 
## 前言

最近一直想学下node,毕竟会node的前端更有市场。但是光看不练，感觉还是少了点什么，就去github上看别人写的项目，收获颇丰，于是准备自己照葫芦画瓢写一个。

作为程序员，一定要保持不断学习的状态，这样我们才可以在职场中有一席之位。

我相信现在出去面试，被问到的问题一定不限于html、css、javascript、jQuery了，层出不穷的框架（vue、angular、react),服务器语言（java、node），数据库、ES6新特性等都会被提及。

如果你不清楚如何使用`vue-cli`快速快速创建一个项目骨架，可以去看我的这篇文章-[手把手教你用vue-cli、webpack、vue-router、vue-resource构建单页应用](https://www.jianshu.com/p/9ef3fb3576e6)

如果此时你还停留在原地，止步不前的话。那么我敢断言，你快被**out**了。

在深读这篇文章之前，我想告诉你，读完后，你可以有哪些**收获**！


>学习`vue`,你会知道除了jQuery这种结构驱动(操作dom元素)外，还有更加便捷的数据驱动，妈妈再也不用担心我忘记jQuery中那些可怕的选择器了。
学习`node`,你会知道除了java、c、python这些陌生的后台语言外，js既然也可以写后台,你可以定义自己的接口，不在依赖于那些后台糙汉子。
学习`mongodb`，你会知道数据如何存储在数据库中，已经如何进行增删改插。

说了这么多，我想你已经知道了。对！没错，这将是你通向全栈的必经之路。想想都兴奋。那么接下来，让我们进入正文吧。

`建议:`可以去我的github上将我的代码clone一份到本地，跟着我的思路捋一遍，相信看完，你一定会对自己更加有信心。代码中会有**详细注释**，可以解除你的很多疑惑。如果读完这篇文章，你有所收获的话，不要忘记动动你那可爱的小手，给个`star`哦。

---

## 正文

>文章中有许多细节地方，不会说的太细，如果遇到槛的话，可以自行百度，遇到难以理解的地方，我会加以强调。
 
### 开发环境
本地需要安装mongodb、nodejs、vue-cli(脚手架)

### 第一步：初始化项目
通过vue-cli脚手架，我们可以快速搭建一个项目骨架。
```javascript
vue init webpack my-project

cd my-rpoject && npm install

cnpm run dev
```

如果在终端，你看到了下图所示，表示项目已经成功启动。接着在浏览器地址栏中输入`localhost://8080`,如果你看到了vue的欢迎界面，表示你已经完成了第一步。

![第一步：启动项目](https://upload-images.jianshu.io/upload_images/3175257-f283423e50c19d89.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 第二步：把本地的mongodb启动起来

*前提：下载`mongodb`,并且已经配置好了环境变量。*

如果觉得配置环境变量啥麻烦的话，可以用homebrew进行一键安装。

当上述都ok的情况下，你只要进入到mongodb的安装目录（比如我的mongodb安装在/usr/local/bin/目录下）执行`mongo`命令，如果你看到下图所示，表示你已经完成了第二步。

![第二步：启动本地mongodb](https://upload-images.jianshu.io/upload_images/3175257-98d75128883fa699.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



### 第三步：把后台接口写好

*提示：所谓的后台接口，就是通过express建立路由，如果不明白的话可以去看下express介绍（这里放个链接）。*

前提：通过npm安装`express`、`mongoose`、`body-parser`模块

> express模块用来创建路由
mongoose模块用来创建数据库，连接数据库
body-parser模块用来对post请求的请求体进行解析

```javascript
//通过命令行进入项目，执行以下命令安装这三个模块
cnpm install express body-parser mongoose --save
```





在项目根目录建立个`app.js`文件，用来启动express服务
```javascript
//app.js文件

//1.引入express模块
const express = require('express')
//2.创建app对象
const app = express()
//定义简单路由
app.use('/',(req,res) => {
  res.send('Yo!')
})
//定义服务启动端口
app.listen(3000,() => {
    console.log('app listening on port 3000.')
})
```

上述步骤走完后，在命令行执行`node app.js`。通过浏览器访问`localhost:3000`,页面出现res.send（）的内容即表示成功。

### 第四步：创建数据模型

*提示：所谓的数据模型，可以理解为你将来创建的表中，要存什么样的数据片段，数据类型是什么。*

在项目根目录建立一个`models`文件夹，用来存储数据模型，每个模型都是由一个Schema生产，具体的我们不用太在意，如果有兴趣可自行百度。

在`models`文件夹中创建一个`hero.js`文件,内容如下

```javascript
//hero.js文件

//引入mongoose模块
const mongoose = require('mongoose')

//定义数据模型，可以看到，我们下面创建了一个表，表中的数据有name、age、sex等字段，并且这些字段的数据类型也定义了，最后将model导出即可
const heroSchema = mongoose.Schema({
  name :String,
  age : String,
  sex : String,
  address : String,
  dowhat : String,
  imgArr:[],
  favourite:String,
  explain:String
}, { collection: 'myhero'})
//这里mongoose.Schema最好要写上第二个参数，明确指定到数据库中的哪个表取数据，我这里写了myhreo，目的就是为了以后操作数据要去myhreo表中。
这里不写第二个参数的话，后面你会遇到坑。

//导出model模块
const Hero = module.exports = mongoose.model('hero',heroSchema);
```


### 第五步：建立CURD(增删改查)路由接口

在项目根目录创建一个`router`文件夹，文件夹中创建一个`hero.js`文件,内容如下,分别为增删改查、添加图片等路由

```javascript
//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const Hero = require("../models/hero");

// 查询所有英雄信息路由
router.get("/hero", (req, res) => {
  Hero.find({})
    .sort({ update_at: -1 })
    .then(heros => {
      res.json(heros);
    })
    .catch(err => {
      console.log(2);
      res.json(err);
    });
});

// 通过ObjectId查询单个英雄信息路由
router.get("/hero/:id", (req, res) => {
  Hero.findById(req.params.id)
    .then(hero => {
      res.json(hero);
    })
    .catch(err => {
      res.json(err);
    });
});

// 添加一个英雄信息路由
router.post("/hero", (req, res) => {
  //使用Hero model上的create方法储存数据
  Hero.create(req.body, (err, hero) => {
    if (err) {
      res.json(err);
    } else {
      res.json(hero);
    }
  });
});

//更新一条英雄信息数据路由
router.put("/hero/:id", (req, res) => {
  Hero.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        age: req.body.age,
        sex: req.body.sex,
        address: req.body.address,
        dowhat: req.body.dowhat,
        favourite: req.body.favourite,
        explain: req.body.explain
      }
    },
    {
      new: true
    }
  )
    .then(hero => res.json(hero))
    .catch(err => res.json(err));
});

// 添加图片路由
router.put("/addpic/:id", (req, res) => {
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
    .then(hero => res.json(hero))
    .catch(err => res.json(err));
});

//删除一条英雄信息路由
router.delete("/hero/:id", (req, res) => {
  Hero.findOneAndRemove({
    _id: req.params.id
  })
    .then(hero => res.send(`${hero.title}删除成功`))
    .catch(err => res.json(err));
});

module.exports = router;

```

最后将路由应用到`app.js`(也就是在app.js文件中引入上述路由定义)

```javascript
//app.js文件

......
//引入刚才定义的hero路由
const hero = require('./router/hero')
......
app.use('/api',hero)
......
```

这时你可以通过Postman（模拟http请求数据软件）进行查询测试，如果可以查询到数据，代表后台接口已经成功写好了

**注意：在查询之前，你要简单学习下mongodb如何向数据库中对应的表里面任意添加一条数据，否则，你查询出来的数据为空！！！**

比如我上面创建了一个`myhero`表，那我在执行上面查询之前，我会往表中添加一条模拟数据

![添加模拟数据](https://upload-images.jianshu.io/upload_images/3175257-6a82d66e56081bd4.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


```javascript
//db.myhero.insert意思就是向数据库中表名为myhero的表中添加一条数据
db.myhero.insert({
    "imgArr" : [ 
        "http://ossweb-img.qq.com/images/lol/web201310/skin/big157000.jpg", 
        "http://ossweb-img.qq.com/images/lol/web201310/skin/big157001.jpg", 
        "http://ossweb-img.qq.com/images/lol/web201310/skin/big157002.jpg",    
    ],
    "name" : "亚索",
    "age" : "22",
    "sex" : "man",
    "address" : "德玛西亚",
    "dowhat" : "中单、刺客",
    "favourite" : "死亡如风常伴吾身",
    "explain" : "亚索是一个百折不屈的艾欧尼亚人，也是一名身手敏捷的剑客，能够运用风的力量对抗敌人。年少轻狂的他曾为了荣誉而一再地损失珍贵的东西，他的职位、他的导师、最后是他的亲兄弟。他因无法摆脱的嫌疑而身败名裂，如今已是被人通缉的罪犯。亚索在家园的土地上流浪，寻找对过去的救赎。苍茫间，只有疾风指引着他的利剑。",
    })
```

这里进行数据库操作，可以在终端中进行，也可以下载可视化工具`Robo 3T`(链接地址)进行操作，会更加方便。


---

**好了，到这里我们整个功能的复杂部分已经实现。我们回顾下做了哪些准备工作**

 1. 通过`vue-cli`初始化项目
 2. 启动本地mongodb服务
 3. 将后台接口路由写好`app.js`文件
 4. 创建我们存放数据的数据模型`heroSchema.js`文件
 5. 写好增删改查路由接口`hero.js`文件

---

一鼓作气，接下来就是我们擅长的**前端**部分了。现在的你可以稍微松口气了。是不是觉得很刺激，很过瘾～

### 第六步：选择前端开发必要模块

*提示：这里可以自由发挥，我下载的模块中有`element`、`vue-resource`。建议你跟我使用同样的模块，避免后期不必要麻烦，等你回过头来对整个项目了然于心的时候，就可以随心所欲的选择你要用的技术了*,

```javascript
//element-ui是饿了么为我们前端开发者提供的组件化框架，拿来就可以用。好用到没朋友。vue-resource是用来处理请求的，不过vue2.0后好像出现了个axios，不在维护vue-resource,不过我之前一直用vue-resource的，很方便，现在也可以用。
cnpm install element-ui vue-resource --save
```

### 第七步：建立首页和详情页组件

在`src/components`路径下，建立两个页面，分别为`List.vue`(首页)、`Detail.vue`(详情页)。

然后在`src`目录下，建立一个`router`文件夹，文件夹中创建一个`index.js`前端路由文件

前端路由文件`index.js`文件内容如下

```javascript
//路由页面

import Vue from 'vue'

//引入路由模块，看下终端，如果终端提示vue-router模块没有安装，安装即可
import Router from 'vue-router'

//分别引入List、Detail两个组件
import List from '@/components/List'
import Detail from '@/components/Detail'


Vue.use(Router)

//定义路由,这两个路由会被映射到App.vue的<router-view></router-view>视口中
export default new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: List
    },
    {
      path : '/league/:name',
      name : 'Detail',
      component : Detail
    },
  ]
})

```

### 第八步：处理跨域情况

因为我们的`express`服务是在`localhost:3000`端口启动的，而我们的vue-cli创建的项目是在默认端口`8080`启动的，所以肯定会涉及到跨域的情况

好在vue-cli为我们提供了解决跨域的配置入口

找到根目录中`config`目录下面的`index.js`文件，里面有个配置项`proxyTable`,改写这个配置项如下即可
![处理跨域问题](https://upload-images.jianshu.io/upload_images/3175257-d73cf6b69343d638.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


这时，当我们在前端用`vue-resource`访问 `/api` 的时候,就会被代理到 `http://localhost:3000/api`，从而获得需要的数据。说白了，也就是个转换工作。


### 第九步：搭建页面

到这里，所有准备工作已经完成，我们安心写前端代码即可。布局的话,就不多说了。交互方面主要就是在vue中的**methods**选项中定义一系列的方法，并且将方法通过**@click="xxx"**方法绑定到对应的地方，具体方法定义看我写的代码即可。


## 完结

项目写好后，就是打包了，并且将打包的dist文件夹作为express静态文件服务的目录。
```javascript
cnpm run build
```
```javascript
app.use(express.static('dist'))
```

最后看下整个项目的目录结构
![目录结构](https://upload-images.jianshu.io/upload_images/3175257-0350ca9ca13181a7.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


_欢迎小伙伴们提出自己的见解，并且指出文中的错误😊_
_If this article has give you some help . why don't give me a star✨！_

**传送门:**[个人博客](https://github.com/weirui88888/blog)

 


 
