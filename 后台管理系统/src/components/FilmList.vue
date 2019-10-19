<template>
  <div class="user-list">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>电影管理</el-breadcrumb-item>
      <el-breadcrumb-item>电影列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- layout组件 -->
      <el-row :gutter="20">
        <el-col :span="2">
          <el-button type="primary" @click="addFormVisible=!addFormVisible">添加电影</el-button>
        </el-col>
        <el-col :span="10">
          <el-input v-model="queryInfo.film_name" placeholder="请输入电影名">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 表格组件 -->
      <el-table :data="userList" style="width: 100%" border stripe>
        <el-table-column prop="id" label="电影ID"></el-table-column>
        <el-table-column prop="film_name" label="电影名"></el-table-column>
        <el-table-column prop="image_url" label="电影封面"></el-table-column>
        <el-table-column prop="star" label="演员"></el-table-column>
        <el-table-column prop="url" label="电影链接"></el-table-column>
        <el-table-column prop="score" label="评分"></el-table-column>
        <el-table-column prop="director" label="导演"></el-table-column>
        <el-table-column prop="channel" label="片源"></el-table-column>
        <el-table-column prop="type_name" label="影视分类"></el-table-column>
        <el-table-column prop="subtype" label="影视类型"></el-table-column>
        <el-table-column prop="year" label="上映时间"></el-table-column>
        <el-table-column prop="address" label="国家"></el-table-column>
        <el-table-column prop="date" label="操作" width="220">
          <template slot-scope="scop">
            <!--  编辑按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="getUserById(scop.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUser(scop.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 15]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 添加电影弹出框 -->
    <el-dialog title="添加电影" :visible.sync="addFormVisible" width="25%" @close="resetForm">
      <el-form :model="addUser" :rules="addUserRules" ref="addUserRef" label-width="70px">
        <el-form-item label="电影名" prop="film_name">
          <el-input v-model="addUser.film_name"></el-input>
        </el-form-item>
        <el-form-item label="电影封面" prop="image_url">
          <el-input v-model="addUser.image_url"></el-input>
        </el-form-item>
        <el-form-item label="电影链接" prop="url">
          <el-input v-model="addUser.url"></el-input>
        </el-form-item>
        <el-form-item label="评分" prop="score">
          <el-input v-model="addUser.score"></el-input>
        </el-form-item>
        <el-form-item label="演员" prop="star">
          <el-input v-model="addUser.star"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserM">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑电影弹出框 -->
    <el-dialog title="修改信息" :visible.sync="editFormDialog" width="25%">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef">
        <el-form-item label="电影名" prop="film_name">
          <el-input v-model="editForm.film_name"></el-input>
        </el-form-item>
        <el-form-item label="电影封面" prop="image_url">
          <el-input v-model="editForm.image_url"></el-input>
        </el-form-item>
        <el-form-item label="电影链接" prop="url">
          <el-input v-model="editForm.url"></el-input>
        </el-form-item>
        <el-form-item label="评分" prop="score">
          <el-input v-model="editForm.score"></el-input>
        </el-form-item>
        <el-form-item label="演员" prop="star">
          <el-input v-model="editForm.star"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editFormDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import querystring from "querystring";
export default {
  data() {
    return {
      queryInfo: {
        page: 1,
        pageSize: 10
      },
      userList: [],
      total: 0,
      // 添加电影弹框
      addFormVisible: false,
      // 添加电影数据
      addUser: {
        film_name: "",
        image_url: "",
        url: "",
        star: "",
        score: ""
      },
      addUserRules: {
        film_name: [
          {
            required: true,
            message: "请输入电影名",
            trigger: "blur"
          }
        ],
        image_url: [
          {
            required: true,
            message: "请输入电影封面",
            trigger: "blur"
          }
        ],
        url: [
          {
            required: true,
            message: "请输入电影链接",
            trigger: "blur"
          }
        ],
        score: [
          {
            required: true,
            message: "电影是否为会员",
            trigger: "blur"
          }
        ],
        star: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur"
          }
        ]
      },
      // 编辑电影弹出框
      editFormDialog: false,
      // 编辑电影数据对象
      editForm: {
        film_name: "",
        image_url: "",
        url: "",
        star: "",
        score: ""
      },
      // 编辑电影校验规则
      editFormRules: {
        film_name: [
          {
            required: true,
            message: "请输入电影名",
            trigger: "blur"
          }
        ],
        image_url: [
          {
            required: true,
            message: "请输入电影封面",
            trigger: "blur"
          }
        ],
        url: [
          {
            required: true,
            message: "请输入电影链接",
            trigger: "blur"
          }
        ],
        score: [
          {
            required: true,
            message: "电影是否为会员",
            trigger: "blur"
          }
        ],
        star: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur"
          }
        ]
      },
      selectedRoles: ""
    };
  },
  methods: {
    // 获取电影数据
    async getUserList() {
      const { data: res } = await this.$http.get("/films/allinfo", {
        params: this.queryInfo
      });
      console.log(res);
      if (res.code == "200") {
        this.total = res.total;
        this.userList = res.data;
        return this.$message.success("获取电影列表成功");
      }
      return this.$message.error("获取电影列表失败");
    },
    // 处理每页显示多少条数据变化
    handleSizeChange(size) {
      this.queryInfo.per_page = size;
      this.getUserList();
    },
    handleCurrentChange(num) {
      this.queryInfo.page = num;
      this.getUserList();
    },

    async changescore(id, score, data) {
      const { data: res } = await this.$http.put(
        `users/${id}`,
        querystring.stringify(data)
      );
      if (res.code !== "200") {
        data.score = !data.score;
        return this.$message.error("电影状态修改失败");
      } else {
        return this.$message.success("电影状态修改成功");
      }
    },
    resetForm() {
      this.$refs.addUserRef.resetFields();
    },

    addUserM() {
      this.$refs.addUserRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "/users",
          querystring.stringify(this.addUser)
        );
        if (res.code !== "200") {
          this.$message.error("添加电影失败");
        }

        this.getUserList();
        this.$message.success("添加电影成功");
        this.addFormVisible = false;
      });
    },
    async removeUser(id) {
      let result = await this.$confirm("将永久删除该电影", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(error => {
        return error;
      });

      if (result == "confirm") {
        const { data: res } = await this.$http.delete(`/users/${id}`);

        if (res.code !== "200") return this.$message.error("电影删除失败");
        this.getUserList();
        this.$message.success("电影删除成功");
      } else if (result == "cancel") {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      }
    },

    async getUserById(id) {
      this.editFormDialog = true;
      const { data: res } = await this.$http.get(`/users/${id}`);
      if (res.code !== "200") {
        return this.$message.error("获取电影信息失败");
      }
      this.editForm = res.data;
    },
    updateUser() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return false;
        const { data: res } = await this.$http.put(
          `users/${this.editForm.id}`,
          querystring.stringify(this.editForm)
        );
        console.log(res);
        if (res.code !== "200") {
          return this.$message.error("电影信息更新失败");
        }

        this.editFormDialog = false;
        // 更新页面
        this.getUserList();
        this.$message.success("电影信息更新成功");
      });
    }
  },
  created: function() {
    this.getUserList();
  }
};
</script>

<style lang="less" scoped>
.el-card {
  margin-top: 15px;
}

.el-table {
  margin-top: 15px;
}

.el-pagination {
  margin-top: 15px;
}
</style>

