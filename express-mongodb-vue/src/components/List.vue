<template lang="html">

  <div class="list">
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
            prop="name"
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
                        {{jungleSex(scope.row.sex)}}
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
            width="150">
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
                <el-button  size="small" type="primary" @click="toDetail(scope.row['_id'])">详情</el-button>
                <el-button  size="small" type="success" @click="modify(scope.row)">修改</el-button>
                <el-button type="danger" size="small" @click="deleteDate(scope.row['_id'])">删除</el-button>
                <el-button type="warning" size="small" @click="addPic(scope.row['_id'])">添加图片</el-button>
            </template>
            </el-table-column>
  </el-table>

    <!-- 新增数据 -->
  <el-dialog title="新增数据" :visible.sync="addFormVisible" class="addArea" modal custom-class="addFormArea" @close="closeAdd">
  <el-form :model="addForm" class="addForm">

    <el-form-item label="英雄" :label-width="formLabelWidth">
      <el-input v-model="addForm.name" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="年龄" :label-width="formLabelWidth">
      <el-input v-model="addForm.age" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="性别" :label-width="formLabelWidth">
      <el-select v-model="addForm.sex" placeholder="请选择性别" class="sexArea">
        <el-option label="汉子" value="man"></el-option>
        <el-option label="妹子" value="woman"></el-option>
      </el-select>
    </el-form-item>

     <el-form-item label="籍贯" :label-width="formLabelWidth">
      <el-input v-model="addForm.address" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="位置" :label-width="formLabelWidth">
      <el-input v-model="addForm.dowhat" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="台词" :label-width="formLabelWidth">
      <el-input v-model="addForm.favourite" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="背景" :label-width="formLabelWidth">
      <el-input v-model="addForm.explain" auto-complete="off"></el-input>
    </el-form-item>


  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addSure">确 定</el-button>
  </div>
</el-dialog>

<!-- 修改数据 -->
  <el-dialog title="修改数据" :visible.sync="modifyFormVisible" class="addArea" modal custom-class="addFormArea">
  <el-form :model="modifyForm" class="addForm">

    <el-form-item label="英雄" :label-width="formLabelWidth">
      <el-input v-model="modifyForm.name" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="年龄" :label-width="formLabelWidth">
      <el-input v-model="modifyForm.age" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="性别" :label-width="formLabelWidth">
      <el-select v-model="modifyForm.sex" placeholder="请选择性别" class="sexArea">
        <el-option label="男" value="man"></el-option>
        <el-option label="女" value="woman"></el-option>
      </el-select>
    </el-form-item>

     <el-form-item label="籍贯" :label-width="formLabelWidth">
      <el-input v-model="modifyForm.address" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="位置" :label-width="formLabelWidth">
      <el-input v-model="modifyForm.dowhat" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="台词" :label-width="formLabelWidth">
      <el-input v-model="modifyForm.favourite" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="背景" :label-width="formLabelWidth">
      <el-input v-model="modifyForm.explain" auto-complete="off"></el-input>
    </el-form-item>


  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="modifyFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="modifySure">确 定</el-button>
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

<el-button type="primary" class="addBtn" @click="add" icon="el-icon-plus">添加</el-button>
  
  </div>
</template>

<script>
export default {
  name: "list",
  data: function() {
    return {
      title: "hello world",
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
        name: "",
        age: "",
        sex: "",
        address: "",
        dowhat: "",
        favourite: "",
        explain: ""
      },
      modifyForm: {
        name: "",
        age: "",
        sex: "",
        address: "",
        dowhat: "",
        favourite: "",
        explain: ""
      },
      formLabelWidth: "120px",
      loading: false
    };
  },
  methods: {
    jungleSex: function(sex) {
      if (sex == "man") {
        return "汉子";
      } else if (sex == "woman") {
        return "妹子";
      } else {
        return "";
      }
    },
    add: function() {
      this.addFormVisible = true;
    },
    addSure: function() {
      var that = this;

      this.addFormVisible = false;
      //调新增接口,在回调函数中刷新一次

      var addObj = this.addForm;

      this.$http.post("/api/hero", addObj).then(
        function(response) {
          if (response.ok) {
            this.$message({
              message: "添加成功",
              type: "success",
              onClose: function() {
                that.getAll();
              }
            });
          }
        },
        function() {
          // this.loading = false;
        }
      );
    },
    // 关闭dialog的函数
    closeAdd: function() {
      this.addForm.name = "";
      this.addForm.age = "";
      this.addForm.sex = "";
      this.addForm.address = "";
      this.addForm.dowhat = "";
      this.addForm.name = "";
      this.addForm.explain = "";
    },
    //修改操作
    modify: function(row) {
      this.modifyFormVisible = true;
      this.modifyForm = Object.assign({}, row);
      this.modifyId = row["_id"];
    },
    modifySure: function() {
      var that = this;
      this.$http
        .put(`/api/hero/${this.modifyId}`, this.modifyForm, {
          emulateJSON: true
        })
        .then(
          function(response) {
            if (response.ok) {
              this.modifyFormVisible = false;
              this.$message({
              message: "修改成功",
              type: "success",
              onClose: function() {
                that.getAll();
              }
            });
            }
          },
          function() {
            // this.loading = false;
          }
        );
    },
    // 删除操作
    deleteDate: function(id) {
      var that = this;
      var deleteId = id;

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.delete(`/api/hero/${deleteId}`).then(
            function(response) {
              if (response.ok) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                that.getAll();
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败!"
                });
              }
            },
            function() {
              // this.loading = false;
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 获取全部数据
    getAll: function() {
      this.loading = true;
      this.$http.get("/api/hero").then(
        function(response) {
          this.loading = false;
          this.tableData = response.body;
        },
        function() {
          this.loading = false;
          console.log("error");
        }
      );
    },
    //跳转至详情页面
    toDetail: function(id) {
      //通过这种方式也可以实现跳转
      this.$router.push(`/league/${id}`);
    },
    addPic: function(id) {
      this.addpicId = id;
      this.addpicVisible = true;
    },
    closePicAdd: function() {
      this.addpicform.url = "";
    },
    addpicSure: function() {
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

      this.$http.put(`/api/addpic/${this.addpicId}`, addObj).then(
        function(response) {
          console.log(response);
          if (response.ok) {
            this.addpicVisible = false;
            this.$notify({
              title: "成功",
              message: "添加图片成功",
              type: "success"
            });
          } else {
            this.$notify.error({
              title: "错误",
              message: "添加图片失败"
            });
          }
        },
        function() {
          // this.loading = false;
        }
      );
    }
  },

  //页面初始化进来查询数据
  mounted: function() {
    this.getAll();
  }
};
</script>

<style lang="css">
.tableHeader {
  color: #000;
}
div.list {
  width: 90%;
  margin: 0 auto;
}
.addBtn {
  margin: 50px auto 0;
  display: block;
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
.addFormArea .el-dialog__header .el-dialog__title {
  text-align: left;
}
</style>
