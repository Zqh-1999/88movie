<template>
  <div class="user-list">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>历史查询</el-breadcrumb-item>
      <el-breadcrumb-item>历史列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data="historyList" style="width: 100%" border stripe>
        <el-table-column prop="username" label="用户姓名"></el-table-column>
        <el-table-column prop="film_name" label="影片名称"></el-table-column>
        <el-table-column prop="add_time" label="观影时间"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import querystring from "querystring";
export default {
  data() {
    return {
      historyList: [],
    };
  },
  methods: {
    // 获取用户数据列表
    async gethistoryList() {
      const { data: res } = await this.$http.get("/history/all");
      console.log(res);
      if (res.code == "200") {
        this.historyList = res.data;
        return this.$message.success("获取历史列表成功");
      }
      return this.$message.error("获取历史列表失败");
    }
  },
  created: function() {
    this.gethistoryList();
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

