<template>
  <div class="detail">
    <el-button type="success" class="goback" icon="el-icon-arrow-left" @click="goback">返回上一页</el-button>
    <el-carousel :interval="2000" type="card" height="300px" indicator-position="outside">
      <el-carousel-item v-for="(item, index) in imgArr" :key="index">
        <img :src="item" alt class="imgClass">
      </el-carousel-item>
    </el-carousel>
    <p class="heroName">{{name}}●{{flag}}</p>

    <div>{{explain}}</div>
  </div>
</template>

<script>
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
              this.name = response.data.name;
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
  }
};
</script>

<style scoped>
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
</style>


