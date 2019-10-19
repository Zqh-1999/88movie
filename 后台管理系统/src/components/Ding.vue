<template>
  <div class="user-list">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- layout组件 -->
      <el-row :gutter="20">
        <el-col :span="2">
          <el-button type="primary" @click="addFormVisible=!addFormVisible">添加用户</el-button>
        </el-col>
        <el-col :span="10">
          <el-input v-model="queryInfo.username" placeholder="请输入用户名">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 表格组件 -->
      <el-table :data="userList" style="width: 100%" border stripe>
        <el-table-column prop="id" label="用户ID"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column label="会员">
          <template slot-scope="scop">
            <el-switch
              v-model="scop.row.state"
              @change="changeState(scop.row.id, scop.row.state, scop.row)"
              active-value="1"
              inactive-value="0"
              active-color="#1964ce"
              inactive-color="#c9dcfa"
            ></el-switch>
          </template>
        </el-table-column>
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

    <!-- 添加用户弹出框 -->
    <el-dialog title="添加用户" :visible.sync="addFormVisible" width="25%" @close="resetForm">
      <el-form :model="addUser" :rules="addUserRules" ref="addUserRef" label-width="70px">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="addUser.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUser.password"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="addUser.sex"></el-input>
        </el-form-item>
        <el-form-item label="会员" prop="state">
          <el-input v-model="addUser.state"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="addUser.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserM">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑用户弹出框 -->
    <el-dialog title="修改信息" :visible.sync="editFormDialog" width="25%">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="editForm.sex"></el-input>
        </el-form-item>
        <el-form-item label="会员" prop="state">
          <el-input v-model="editForm.state"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="editForm.phone"></el-input>
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
        username: "",
        page: 1,
        pagenum: 10
      },
      userList: [],
      total: 0,
      // 添加用户弹框
      addFormVisible: false,
      // 添加用户数据
      addUser: {
        username: "",
        password: "",
        sex: "",
        phone: "",
        state: ""
      },
      addUserRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        sex: [
          {
            required: true,
            message: "请输入性别",
            trigger: "blur"
          }
        ],
        state: [
          {
            required: true,
            message: "用户是否为会员",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur"
          }
        ]
      },
      // 编辑用户弹出框
      editFormDialog: false,
      // 编辑用户数据对象
      editForm: {
        username: "",
        password: "",
        sex: "",
        phone: "",
        state: ""
      },
      // 编辑用户校验规则
      editFormRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        sex: [
          {
            required: true,
            message: "请输入性别",
            trigger: "blur"
          }
        ],
        state: [
          {
            required: true,
            message: "用户是否为会员",
            trigger: "blur"
          }
        ],
        phone: [
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
    // 获取用户数据列表
    async getUserList() {
      const { data: res } = await this.$http.get("/users", {
        params: this.queryInfo
      });
      if (res.code == "200") {
        this.total = res.total;
        this.userList = res.data;
        return this.$message.success("获取用户列表成功");
      }
      return this.$message.error("获取用户列表失败");
    },
    // 处理每页显示多少条数据变化
    handleSizeChange(size) {
      this.queryInfo.pagenum = size;
      this.getUserList();
    },
    handleCurrentChange(num) {
      this.queryInfo.page = num;
      this.getUserList();
    },

    async changeState(id, state, data) {
      const { data: res } = await this.$http.put(
        `users/${id}`,
        querystring.stringify(data)
      );
      if (res.code !== "200") {
        data.state = !data.state;
        return this.$message.error("用户状态修改失败");
      } else {
        return this.$message.success("用户状态修改成功");
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
          this.$message.error("添加用户失败");
        }

        this.getUserList();
        this.$message.success("添加用户成功");
        this.addFormVisible = false;
      });
    },
    async removeUser(id) {
      let result = await this.$confirm("将永久删除该用户", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(error => {
        return error;
      });

      if (result == "confirm") {
        const { data: res } = await this.$http.delete(`/users/${id}`);

        if (res.code !== "200") return this.$message.error("用户删除失败");
        this.getUserList();
        this.$message.success("用户删除成功");
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
        return this.$message.error("获取用户信息失败");
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
          return this.$message.error("用户信息更新失败");
        }

        this.editFormDialog = false;
        // 更新页面
        this.getUserList();
        this.$message.success("用户信息更新成功");
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

