<template>
  <el-container class="home">
    <el-header class="header">
      <div id="img">
        <div></div>
      </div>

      <el-button type="info" class="logout" @click="handleLogOut">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="collapse?'64px':'200px'" class="aside">
        <div class="toggle-aside" @click="collapse=!collapse">|||</div>
        <el-menu
          text-color="#fff"
          active-text-color="#409eff"
          :unique-opened="true"
          :collapse="collapse"
          :collapse-transition="false"
          :router="true"
        >
          <el-submenu :index="item.id + ''" item.index v-for="(item, index) in menuList" :key="item.id">
            <template slot="title">
              <i :class="iconList[index]"></i>
              <span>{{item.mun_name}}</span>
            </template>
            <el-menu-item :index="item.path">
            <i class="el-icon-menu"></i>
            <span>{{item.numes_name}}</span>
          </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      iconList: [
        "el-icon-user-solid",
        "el-icon-star-on",
        "el-icon-date",
        "el-icon-edit-outline",
        "el-icon-folder-opened",
        "el-icon-notebook-2",
        "el-icon-chat-dot-square"
      ],
      collapse: false
    };
  },
  methods: {
    handleLogOut: function() {
      window.sessionStorage.removeItem("token");
      this.$router.push("/login");
    },
    // 获取左侧菜单数据
    handleLeftMenu: async function() {
      let { data: res } = await this.$http.get("/search");
      if (res.code == "200") {
        // 渲染菜单列表
        return this.menuList = res.data;;
      }
      this.$message.error("获取菜单列表失败");
    }
  },
  created: function() {
    this.handleLeftMenu();
  }
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
}

.header {
  position: relative;
  background-color: #c9dcfa;
  user-select: none;
  #img {
    width: 100%;
    height: 100%;
    background-color: #c9dcfa;
  }
  #img div {
    width: 100%;
    height: 100%;
    background-image: url(../assets/image/a.png);
    background-size: 90px;
  }
  .logout {
    float: right;
    margin-top: 10px;
  }
}

.aside {
  background-color: #c9dcfa;
  .toggle-aside {
    color: #fff;
    background-color: #c9dcfa;
    text-align: center;
    height: 22px;
    line-height: 20px;
    font-size: 12px;
    letter-spacing: 1px;
    user-select: none;
    cursor: pointer;
  }
  .el-menu {
    border-right: none;
  }
}
.el-menu .el-menu-item{
  background-color: #d2e0f8;
}
.el-menu {
    background-color: #c9dcfa;
}
.main {
  background-color: #e0e8f5;
}
</style>
