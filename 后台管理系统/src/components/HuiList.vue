<template>
  <div class="user-list">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>会员查询</el-breadcrumb-item>
      <el-breadcrumb-item>会员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data="huiList" style="width: 100%" border stripe>
        <el-table-column prop="id" label="用户ID"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="order_num" label="会员编号"></el-table-column>
        <el-table-column prop="start_time" label="会员开通"></el-table-column>
        <el-table-column prop="end_time" label="会员过期"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import querystring from "querystring";
export default {
  data() {
    return {
      huiList: [],
    };
  },
  methods: {
    // 获取用户数据列表
    async gethuiList() {
      const { data: res } = await this.$http.get("/recharge/all");
      console.log(res);
      if (res.code == "200") {
        this.huiList = res.data;
        return this.$message.success("获取会员列表成功");
      }
      return this.$message.error("获取会员列表失败");
    }
  },
  created: function() {
    this.gethuiList();
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

