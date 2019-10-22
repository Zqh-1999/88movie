<template>
  <div class="login">
    <el-card class="card">
      <div class="hou">后台管理系统</div>
      <el-form class="form" :model="loginForm" :rules="loginFormRules" ref="loginFromRef">
        <el-form-item prop="admin_name">
          <el-input v-model="loginForm.admin_name">
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>

        <el-form-item prop="admin_password">
          <el-input v-model="loginForm.admin_password">
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>

        <div class="clearfix">
          <el-button type="primary" @click="handleLogin">登录</el-button>
          <el-button type="info" class="button-reset" @click="handleReset">重置</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import querystring from "querystring";
export default {
  data() {
    return {
      loginForm: {
        admin_name: "admin111",
        admin_password: "123123"
      },
      loginFormRules: {
        admin_name: [
          {
            required: true,
            message: "请输入您的用户名",
            trigger: "blur"
          },
          {
            min: 3,
            max: 18,
            message: "用户名的长度在 3 到 18 个字符之间",
            trigger: "blur"
          }
        ],
        admin_password: [
          {
            required: true,
            message: "请输入您的密码",
            trigger: "blur"
          },
          {
            min: 3,
            max: 18,
            message: "密码的长度在 3 到 18 个字符之间",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 表单重置方法
    handleReset() {
      this.$refs.loginFromRef.resetFields();
    },
    //登录方法
    handleLogin() {
      this.$refs.loginFromRef.validate(async valid => {
        if (!valid) return false;
        //如果校验成功 那么发起ajax请求
        let { data: res } = await this.$http.post(
          "/admin/login",
          querystring.stringify(this.loginForm)
        );
        console.log(res);
        if (res.code == 400) {
          window.sessionStorage.removeItem("token");
          return this.$message.error(res.msg);
        }

        if (res.code == 200) {
          // 保存令牌
          window.sessionStorage.setItem("token", res.token);
          this.$router.push("/home");
          //登录成功提示
          return this.$message.success(res.msg);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
// 嵌套深度不能超过三层
.login {
  width: 100%;
  height: 100%;
  background-image: url(../assets/image/1.jpg);

  .card {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    width: 450px;
    height: 304px;
    background-color: rgba(95, 204, 199, 0.5);
    border-radius: 4px;
    overflow: initial;
    .hou {
      width: 50%;
      font-size: 32px;
      font-weight: 700;
      margin: 0 auto;
      -webkit-line-clamp: 2;
      font-family: 'Courier New', Courier, monospace;
      background-image: -webkit-linear-gradient(
        rgb(247, 40, 3),
        rgb(241, 100, 5),
        rgb(243, 139, 2)
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .form {
      margin-top: 40px;
    }

    .button-reset {
      float: right;
    }
  }
}
</style>
