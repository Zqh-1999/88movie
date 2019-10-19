import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      children: [
        {
          path: '/home',
          redirect: '/shouye'
        },
        // 欢迎首页
        {
          path: '/shouye',
          component: () => import("@/components/ShouYe.vue")
        },
        // 用户列表
        {
          path: '/users',
          component: () => import("@/components/UserList.vue")
        },
        // 会员列表
        {
          path: '/hui',
          component: () => import("@/components/HuiList.vue")
        },
        // 历史记录列表
        {
          path: "/history",
          component: () => import("@/components/History.vue")
        },
        // 管理员列表
        {
          path: "/admin",
          component: () => import("@/components/Admin.vue")
        },
        // 影视列表
        {
          path: "/film",
          component: () => import("@/components/FilmList.vue")
        },
        // 订单管理
        {
          path: "/ding",
          component: () => import("@/components/Ding.vue")
        },
        {
          path: "/ping",
          component: () => import("@/components/Ping.vue")
        }

      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue")
    }
  ]
});

// 路由导航守卫
// router.beforeEach((to, from, next) => {
  // 判断是否是login这个路由是这个路由放行
  // if (to.path == "/login") return next();

  // 获取有没有令牌 如果没有令牌 去login
  // const token = window.sessionStorage.getItem("token");
  // if (!token) {
  //   window.sessionStorage.removeItem("token");
  //   return next("/login");
  // }

  // 如果登录了 那么就放行
//   next();
// });

export default router;
