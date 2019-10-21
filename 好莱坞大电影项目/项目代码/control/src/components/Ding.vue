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
        <el-col :span="10">
          <el-input v-model="queryInfo.keyWords" placeholder="请输入用户名">
            <el-button slot="append" icon="el-icon-search" @click="getDingList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 表格组件 -->
      <el-table :data="orderList" style="width: 100%" border stripe>
        <el-table-column prop="id" label="订单ID"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="order_num" label="订单编号"></el-table-column>
        <el-table-column prop="money" label="人民币"></el-table-column>
        <el-table-column label="开通时间">
          <template slot-scope="scope">{{scope.row.start_time | setTime}}</template>
        </el-table-column>
        <el-table-column label="过期时间">
          <template slot-scope="scope">{{scope.row.end_time | setTime}}</template>
        </el-table-column>
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
        keyWords: "",
        page: 1,
        pagenum: 10
      },
      orderList: [],
      total: 0
    };
  },
  methods: {
    // 获取用户数据列表
    async getDingList() {
      const { data: res } = await this.$http.get("/order", {
        params: this.queryInfo
      });
      console.log(res);
      if (res.code == "200") {
        this.total = res.total;
        this.orderList = res.data;
        console.log(this.orderList);
        return this.$message.success("获取用户列表成功");
      }
      return this.$message.error("获取用户列表失败");
    },
    // 处理每页显示多少条数据变化
    handleSizeChange(size) {
      this.queryInfo.pagenum = size;
      this.getDingList();
    },
    handleCurrentChange(num) {
      this.queryInfo.page = num;
      this.getDingList();
    }
  },
  created: function() {
    this.getDingList();
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

