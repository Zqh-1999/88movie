<template>
  <div class="user-list">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>评论管理</el-breadcrumb-item>
      <el-breadcrumb-item>评论列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- layout组件 -->
      <el-row :gutter="20">
        <el-col :span="2">
          <el-button type="primary" @click="addFormVisible=!addFormVisible">添加评论</el-button>
        </el-col>
        <el-col :span="10">
          <el-input v-model="queryInfo.username" placeholder="请输入评论名">
            <el-button slot="append" icon="el-icon-search" @click="getpingList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 表格组件 -->
      <el-table :data="pingList" style="width: 100%" border stripe>
        <el-table-column prop="id" label="评论ID"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="content" label="评论"></el-table-column>
        <el-table-column prop="add_time" label="评论时间"></el-table-column>
        <el-table-column prop="film_id" label="影片ID"></el-table-column>
        <el-table-column prop="date" label="操作" width="220">
          <template slot-scope="scop">
            <!--  编辑按钮 -->
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
  </div>
</template>

<script>
import querystring from "querystring";
export default {
  data() {
    return {
      queryInfo: {
        // username: "",
        page: 1,
        pagenum: 10
      },
      pingList: [],
      total: 0,
    };
  },
  methods: {
    // 获取评论数据列表
    async getpingList() {
      const { data: res } = await this.$http.get("/message");
      if (res.code == "200") {
        this.total = res.total;
        this.pingList = res.data;
        // console.log(res.data, res.total)
        return this.$message.success("获取评论列表成功");
      }
      return this.$message.error("获取评论列表失败");
    },
    // 处理每页显示多少条数据变化
    handleSizeChange(size) {
      this.queryInfo.pagenum = size;
      this.getpingList();
    },
    handleCurrentChange(num) {
      this.queryInfo.page = num;
      this.getpingList();
    },

    async removeUser(id) {
      let result = await this.$confirm("将永久删除该评论", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(error => {
        return error;
      });

      if (result == "confirm") {
        const { data: res } = await this.$http.delete(`/users/${id}`);

        if (res.code !== "200") return this.$message.error("评论删除失败");
        this.getpingList();
        this.$message.success("评论删除成功");
      } else if (result == "cancel") {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      }
    },
  },
  created: function() {
    this.getpingList();
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