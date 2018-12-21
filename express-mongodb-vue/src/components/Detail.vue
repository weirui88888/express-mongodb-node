<template>
  <div class="detail">
    <el-button type="success" class="goback" icon="el-icon-arrow-left" @click="goback">返回上一页</el-button>
    <el-carousel :interval="2000" type="card" height="300px" indicator-position="outside">
      <el-carousel-item v-for="(item, index) in imgArr" :key="index">
        <img :src="item" alt class="imgClass">
      </el-carousel-item>
    </el-carousel>
    <main class="clearfix">
      <section class="main-left">
        <h3 class="detail-title">召唤师名称：</h3>
        <p class="detail-introduct">{{name}}</p>
        <h3 class="detail-title">背景介绍：</h3>
        <p class="detail-introduct ">{{explain}}</p>
      </section>
      <section class="main-right">
          <h3 class="detail-title nomargin">个人介绍:<span class="email">邮箱:ruiwei88888@163.com</span></h3>
          <section id="echartArea">

          </section>
      </section>
    </main>
  </div>
</template>

<script>
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
require('echarts/lib/chart/pie');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');


import request from "@/utils/request";
export default {
  name: "detail",
  data: function() {
    return {
      title: "欢迎来到得来联盟",
      imgArr: [],
      getHeroDetailUrl: "./getHeroDetail",
      name: "",
      flag: "",
      explain: ""
    };
  },
  methods: {
    getMessage(id) {
      request({
        url: `${this.getHeroDetailUrl}/${id}`,
        method: "get",
      })
        .then(response => {
            console.log(response)
              this.imgArr = response.data.imgArr;
              this.name = response.data.heroName;
              this.flag = response.data.favourite;
              this.explain = response.data.explain
        })
        .catch(error => {
        });
    },
    goback() {
      this.$router.go(-1);
    }
  },
  mounted: function() {
    this.getMessage(this.$route.params.id);

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echartArea'));

    console.log(myChart)
    // 绘制图表
    myChart.setOption({
      backgroundColor: '#2c343c',

    title: {
        text: 'technology stack（个人技术栈）',
        left: 'center',
        top: 10,
        textStyle: {
            color: '#ccc'
        },
        subtext:"👆个人GitHub地址👆",
        sublink:"https://github.com/weirui88888",
        subtextStyle:{
            color: '#fff',
            fontSize:15,
            fontFamily:'monospace',
            fontStyle:"italic",
            align:"right",
        }
    },

    tooltip : {
        trigger: 'item',
        formatter: "{b}"
    },

    visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series : [
        {
            name:'',
            type:'pie',
            radius : '60%',
            center: ['50%', '50%'],
            data:[
                {value:3, name:'CSS'},
                {value:3, name:'Vue全家桶'},
                {value:3, name:'原生Javascript'},
                {value:1, name:'Node.js（express）'},
                {value:2, name:'Jquery'},
                {value:2, name:'ES6'},
                {value:2, name:'HTTP'},
                {value:2, name:'前端性能优化'}
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
                normal: {
                    textStyle: {
                        color: 'rgba(255,255,255,1)',
                        fontSize:20
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                }
            },
            itemStyle: {
                normal: {
                    color: 'yellow',
                    shadowBlur: 200,
                    shadowColor: 'rgba(255, 0, 0, 0.5)'
                }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
    });
  }
};
</script>

<style lang="scss">
.detail {
  width: 80%;
  margin: 50px auto;
}
.imgClass {
  width: 100%;
}
.heroName {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  font-style: italic;
}
.goback {
  margin-bottom: 30px;
}

main{
  padding: 50px 0;
  .main-left{
    width: 40%;
    float: left;
  }
  .main-right{
    width: 50%;
    float: right;
    .nomargin{
        margin-bottom: 0;
    }
    .email{
      float: right;
    }
  }
  .detail-title{
    background: #ccc;
    padding: 10px 20px;
  }
  .detail-introduct{
    line-height: 30px;
    font-size: 20px;
    font-style: italic;
    text-indent: 2em;
  }

  #echartArea{
    width: 100%;
    height: 500px;
  }
}
</style>


