<template lang="html">

  <div class="list">
      <header>
        <label for="" class="formLabelCss">英雄:</label>
        <el-input v-model="heroName"  class="formInputCss" clearable placeholder="请输入英雄名称"></el-input>

        <label for="" class="formLabelCss">位置:</label>
        <el-select v-model="heroPosition" class="formInputCss">
            <el-option
              v-for="item in heroPositions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>

        <label for="" class="formLabelCss">性别:</label>
        <el-select v-model="heroSex" class="formInputCss">
            <el-option
              v-for="item in heroSexs"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>

        <el-button type="primary" class="searchBtn" icon="el-icon-search" @keyup.enter.native="search"  @click="search">查询</el-button>
			  <el-button type="text" @click="clear">清空</el-button>

      </header>

      <nav>
        <el-button type="primary" class="addBtn" @click="add" icon="el-icon-plus">添加</el-button>
      </nav>

        
      <main>
        <el-table
        :data="tableData"
        stripe
        element-loading-text="拼命加载中"
        header-row-class-name="tableHeader"
        v-loading.fullscreen.lock="loading"
        empty-text="亲，暂时没有数据哦"
        border
        style="width: 100%">
            <el-table-column
            fixed
            prop="heroName"
            label="英雄"
            align="center"
            width="120">
            </el-table-column>
            <el-table-column
            prop="age"
            label="年龄"
            align="center"
            width="100">
            </el-table-column>
            <el-table-column
            label="性别"
            align="center"
            width="100">
                    <template slot-scope="scope">
                        <i class="iconfont myIcon-man" v-if="scope.row.heroSex=='man'"></i>
                        <i class="iconfont myIcon-woman" v-if="scope.row.heroSex=='woman'"></i>
                        {{jungleSex(scope.row.heroSex)}}
                    </template>
            </el-table-column>
            <el-table-column
            prop="address"
            label="籍贯"
            align="center"
            width="150">
            </el-table-column>
            
            <el-table-column
            prop="dowhat"
            label="位置"
            align="center"
            width="163">
                    <template slot-scope="scope">{{junglePosition(scope.row.heroPosition)}}</template>
            </el-table-column>
            <el-table-column
            prop="favourite"
            label="台词"
            align="center"
            width="301">
            </el-table-column>
            <el-table-column
            label="操作"
            align="center"
            width="360">
            <template slot-scope="scope">
  <el-button size="small" type="primary" @click="toDetail(scope.row['_id'])">详情</el-button>
  <el-button size="small" type="success" @click="modify(scope.row)">修改</el-button>
  <el-button type="danger" size="small" @click="deleteHero(scope.row['_id'])">删除</el-button>
  <el-button type="warning" size="small" @click="addPic(scope.row['_id'])">添加图片</el-button>
</template>
            </el-table-column>
          </el-table>

          <el-pagination
            v-if="paginationShow"
            class="pagination"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="3"
            layout="total, prev, pager, next, jumper"
            :total="length">
            </el-pagination>
      </main>

    <!-- 新增数据 -->
  <el-dialog title="新增数据" :visible.sync="addFormVisible" class="addArea" modal custom-class="addFormArea" @close="closeAdd('addForm')">
  <el-form :model="addForm" class="addForm" :rules="rules" status-icon ref="addForm">

    <el-form-item label="英雄:" :label-width="formLabelWidth" prop="heroName">
      <el-input v-model="addForm.heroName" auto-complete="off" placeholder="请输入英雄名称"></el-input>
    </el-form-item>

    <el-form-item label="年龄:" :label-width="formLabelWidth" prop="age">
      <el-input v-model.number="addForm.age" auto-complete="off" placeholder="请输入英雄年龄"></el-input>
    </el-form-item>

    <el-form-item label="性别:" :label-width="formLabelWidth" prop="heroSex">
      <el-select v-model="addForm.heroSex" class="sexArea" placeholder="请输入英雄性别">
        <el-option label="汉子" value="man"></el-option>
        <el-option label="妹子" value="woman"></el-option>
      </el-select>
    </el-form-item>

     <el-form-item label="籍贯:" :label-width="formLabelWidth" prop="address">
      <el-input v-model="addForm.address" auto-complete="off" placeholder="请输入英雄籍贯"></el-input>
    </el-form-item>

    <el-form-item label="位置:" :label-width="formLabelWidth" prop="heroPosition">
      <el-select v-model="addForm.heroPosition" placeholder="请选择英雄位置" class="sexArea" multiple>
        <el-option label="上单" value="miss"></el-option>
        <el-option label="打野" value="jungle"></el-option>
        <el-option label="中单" value="mid"></el-option>
        <el-option label="ADC" value="ad"></el-option>
        <el-option label="辅助" value="support"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="台词:" :label-width="formLabelWidth" prop="favourite">
      <el-input v-model="addForm.favourite" auto-complete="off" placeholder="请输入英雄性别"></el-input>
    </el-form-item>

    <el-form-item label="背景:" :label-width="formLabelWidth" prop="explain">
      <el-input v-model="addForm.explain" auto-complete="off" type="textarea" :rows="6" resize="none" placeholder="请输入英雄背景"></el-input>
    </el-form-item>


  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addSure('addForm')">确 定</el-button>
  </div>
</el-dialog>

<!-- 修改数据 -->
  <el-dialog title="修改数据" :visible.sync="modifyFormVisible" class="addArea" modal custom-class="addFormArea" @close="closeModify('modifyForm')">
  <el-form :model="modifyForm" class="addForm" :rules="rules" status-icon ref="modifyForm">

    <el-form-item label="英雄:" :label-width="formLabelWidth" prop="heroName">
      <el-input v-model="modifyForm.heroName" auto-complete="off" placeholder="请输入英雄名称"></el-input>
    </el-form-item>

    <el-form-item label="年龄:" :label-width="formLabelWidth" prop="age">
      <el-input v-model.number="modifyForm.age" auto-complete="off" placeholder="请输入英雄年龄"></el-input>
    </el-form-item>

    <el-form-item label="性别:" :label-width="formLabelWidth" prop="heroSex">
      <el-select v-model="modifyForm.heroSex" placeholder="请选择英雄性别" class="sexArea">
        <el-option label="汉子" value="man"></el-option>
        <el-option label="妹子" value="woman"></el-option>
      </el-select>
    </el-form-item>

     <el-form-item label="籍贯:" :label-width="formLabelWidth" prop="address">
      <el-input v-model="modifyForm.address" auto-complete="off" placeholder="请输入英雄籍贯"></el-input>
    </el-form-item>

    <el-form-item label="位置:" :label-width="formLabelWidth" prop="heroPosition">
      <el-select v-model="modifyForm.heroPosition" placeholder="请选择英雄位置" class="sexArea" multiple>
        <el-option label="上单" value="miss"></el-option>
        <el-option label="打野" value="jungle"></el-option>
        <el-option label="中单" value="mid"></el-option>
        <el-option label="ADC" value="ad"></el-option>
        <el-option label="辅助" value="support"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="台词:" :label-width="formLabelWidth" prop="favourite">
      <el-input v-model="modifyForm.favourite" auto-complete="off" placeholder="请输入英雄台词"></el-input>
    </el-form-item>

    <el-form-item label="背景:" :label-width="formLabelWidth" prop="explain">
      <el-input v-model="modifyForm.explain" auto-complete="off" type="textarea" :rows="6" resize="none" placeholder="请输入英雄背景"></el-input>
    </el-form-item>


  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="modifyFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="modifySure('modifyForm')">确 定</el-button>
  </div>
</el-dialog>


<!-- 添加图片 -->
<el-dialog title="添加图片" :visible.sync="addpicVisible" class="addPicArea" @close="closePicAdd">
  <el-form :model="addpicform">
    <el-form-item label="图片地址" :label-width="formLabelWidth">
      <el-input v-model="addpicform.url" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addpicVisible = false">取 消</el-button>
    <el-button type="primary" @click="addpicSure">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "list",
  data: function() {
    return {
      title: "hello world",
      paginationShow: true,
      heroName: "",
      heroPosition: "",
      heroPositions: [
        {
          label: "请选择",
          value: ""
        },
        {
          label: "中单",
          value: "mid"
        },
        {
          label: "上单",
          value: "miss"
        },
        {
          label: "辅助",
          value: "support"
        },
        {
          label: "AD-Carry",
          value: "ad"
        },
        {
          label: "打野",
          value: "jungle"
        }
      ],
      heroSex: "",
      heroSexs: [
        {
          label: "请选择",
          value: ""
        },
        {
          label: "汉子",
          value: "man"
        },
        {
          label: "妹子",
          value: "woman"
        }
      ],
      // 校验规则
      rules: {
        heroName: [
          { required: true, message: "请输入英雄名称", trigger: "blur" }
        ],
        age: [
          { required: true, message: "请输入英雄年龄", trigger: "blur" },
          { type: "number", message: "年龄必须为数字值" }
        ],
        heroSex: [
          { required: true, message: "请选择英雄性别", trigger: "change" },
          { required: true, message: "请选择英雄性别", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入英雄籍贯", trigger: "blur" }
        ],
        heroPosition: [
          {
            required: true,
            message: "至少选择一个英雄位置",
            trigger: "change"
          },
          { required: true, message: "至少选择一个英雄位置", trigger: "blur" }
        ],
        favourite: [
          { required: true, message: "请输入英雄台词", trigger: "blur" }
        ],
        explain: [
          { required: true, message: "请输入英雄背景", trigger: "blur" }
        ]
      },
      currentPage: 1, //当前页数
      pageNumber: 1, //第几页
      pageRow: 3, //每页多少条
      length: 0, //共有多少条
      searchUrl: "./getHeroList",
      addUrl: "./addHero",
      modifyUrl: "./modifyHero",
      deleteUrl: "./deleteHero",
      updetePicUrl: "./addHeroPic",
      tableData: [],
      addFormVisible: false,
      modifyFormVisible: false,
      addpicVisible: false,
      modifyId: "",
      addpicId: "",
      addpicform: {
        url: ""
      },
      addForm: {
        heroName: "",
        age: "",
        heroSex: "",
        address: "",
        heroPosition: [],
        favourite: "",
        explain: ""
      },
      modifyForm: {
        heroName: "",
        age: "",
        heroSex: "",
        address: "",
        heroPosition: [],
        favourite: "",
        explain: ""
      },
      formLabelWidth: "120px",
      loading: false
    };
  },
  methods: {
    // 清除查询条件
    clear() {
      this.heroName = "";
      this.heroPosition = "";
      this.heroSex = "";
    },

    //查询
    search() {
      this.paginationShow = false;

      var searchParmas = {
        heroName: this.heroName,
        heroPosition: this.heroPosition,
        heroSex: this.heroSex,
        pageNumber: this.pageNumber,
        pageRow: this.pageRow
      };
      this.loading = true;

      request({
        url: this.searchUrl,
        method: "post",
        data: searchParmas
      })
        .then(response => {
          this.$nextTick(function() {
            this.paginationShow = true;
          });
          this.loading = false;
          if (response.data.status == "success") {
            this.tableData = response.data.heroList;
            this.length = response.data.total;
          } else {
            this.tableData = [];
            this.$message({
              message: "查询出错，请重试!",
              type: "error"
            });
          }
        })
        .catch(error => {
          this.$nextTick(function() {
            this.paginationShow = true;
          });
          console.log(error);
        });

      //每次查询删除本地缓存
      sessionStorage.removeItem("queryParmas");
    },

    //页数改变时出发的函数
    handleCurrentChange: function(val) {
      this.pageNumber = `${val}`;
      this.search();
    },

    // 转换性别
    jungleSex(sex) {
      if (sex == "man") {
        return "汉子";
      } else if (sex == "woman") {
        return "妹子";
      } else {
        return "";
      }
    },

    // 转换位置
    junglePosition(position) {
      var heroPositionQuery = {
        jungle: "打野",
        mid: "中单",
        miss: "上单",
        support: "辅助",
        ad: "ADC"
      };

      var heroPositionName = [];

      position.forEach(function(elem, index) {
        heroPositionName.push(heroPositionQuery[elem]);
      });

      return heroPositionName.toString();
    },

    // 添加
    add() {
      this.addFormVisible = true;
    },

    // 关闭添加页面
    closeAdd: function(formName) {
      this.$refs[formName].resetFields();
    },
    // 确认添加
    addSure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var that = this;
          this.addFormVisible = false;
          //调新增接口,在回调函数中刷新一次
          var addObj = this.addForm;

          request({
            url: this.addUrl,
            method: "post",
            data: addObj
          })
            .then(response => {
              this.loading = false;
              if (response.data.status == "success") {
                this.$message({
                  message: response.data.message,
                  type: "success",
                  onClose: function() {
                    that.search();
                  }
                });
              } else {
                this.$message({
                  message: "新增失败",
                  type: "error"
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 关闭dialog的函数
    closeModify: function(formName) {
      this.$refs[formName].resetFields();
    },

    //修改操作
    modify(row) {
      this.modifyFormVisible = true;
      this.modifyForm = Object.assign({}, row);
      this.modifyId = row["_id"];
    },

    // 确认修改
    modifySure(formName) {
      var that = this;
      this.$refs[formName].validate((valid) => {
          if (valid) {
            request({
        url: `${this.modifyUrl}/${this.modifyId}`,
        method: "put",
        data: this.modifyForm
      })
        .then(response => {
          this.modifyFormVisible = false;
          if (response.data.status == "success") {
            this.$message({
              message: response.data.message,
              type: "success",
              onClose: function() {
                that.search();
              }
            });
          } else {
            console.log(response.data.error);
            this.$message({
              message: "修改失败",
              type: "error",
              onClose: function() {
                that.search();
              }
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },

    // 删除操作
    deleteHero(id) {
      var that = this;
      var deleteId = id;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          request({
            url: `${this.deleteUrl}/${deleteId}`,
            method: "delete"
          })
            .then(response => {
              if (response.data.status == "success") {
                this.$message({
                  message: "删除成功",
                  type: "success",
                  onClose: function() {
                    that.search();
                  }
                });
              } else {
                this.$message({
                  message: "删除失败",
                  type: "error",
                  onClose: function() {
                    that.search();
                  }
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //跳转至详情页面
    toDetail: function(id) {
      // 通过本地缓存实现页面之前切换时，保存查询条件
      var queryParmas = {
        heroName: this.heroName,
        heroPosition: this.heroPosition,
        heroSex: this.heroSex,
        currentPage: this.currentPage
      };

      sessionStorage.queryParmas = JSON.stringify(queryParmas);

      this.$router.push(`/league/${id}`);
    },

    //添加图片
    addPic: function(id) {
      this.addpicId = id;
      this.addpicVisible = true;
    },

    // 关闭图片新增
    closePicAdd: function() {
      this.addpicform.url = "";
    },

    //确认新增图片
    addpicSure: function() {
      var that = this;
      //如果没有填入图片地址的话，提示报错
      if (!this.addpicform.url.trim()) {
        this.$notify.error({
          title: "错误",
          message: "请输入正确的图片地址"
        });
        return;
      }

      var addObj = {
        url: this.addpicform.url
      };

      request({
        url: `${this.updetePicUrl}/${this.addpicId}`,
        method: "put",
        data: addObj
      })
        .then(response => {
          this.addpicVisible = false;
          if (response.data.status == "success") {
            this.$notify({
              title: "成功",
              message: "添加图片成功",
              type: "success",
              onClose: function() {
                that.search();
              }
            });
          } else {
            this.$notify({
              title: "失败",
              message: "添加图片失败",
              type: "error",
              onClose: function() {
                that.search();
              }
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  //页面初始化进来查询数据
  mounted: function() {
    // 进入页面判断是否存在缓存
    var sessionObj = sessionStorage.getItem("queryParmas");
    if (sessionObj) {
      var queryParmas = JSON.parse(sessionObj);
      this.heroName = queryParmas.heroName;
      this.heroPosition = queryParmas.heroPosition;
      this.heroSex = queryParmas.heroSex;
      // this.currentPage = queryParmas.currentPage;
      var pagenow = queryParmas.currentPage;
      this.handleCurrentChange(pagenow);
      this.currentPage = queryParmas.currentPage;
    }
  }
};
</script>

<style lang="scss">
// header
header {
  padding: 50px 0;
  .formInputCss {
    width: 220px;
    margin-right: 20px;
  }
  .formLabelCss {
    padding: 0 10px;
  }
  .searchBtn {
    margin-left: 30px;
  }
}

// nav
nav {
  padding: 30px 0;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  margin-bottom: 50px;
}

// main
main {
  .pagination {
    float: right;
    padding: 30px 0;
  }
}
.tableHeader {
  color: #000;
}

div.list {
  width: 90%;
  margin: 0 auto;
}

.addArea .el-input {
  width: 200px;
}
.addPicArea .el-input {
  width: 500px;
}
.addForm {
  overflow: hidden;
}
.addForm .el-form-item {
  float: left;
}
.sexArea {
  width: 200px;
}
.addFormArea {
  .el-dialog__body {
    height: 350px;
  }
  .el-dialog__header .el-dialog__title {
    text-align: left;
  }
}
</style>
