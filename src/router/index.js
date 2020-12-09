import Vue from "vue";
import Router from "vue-router";
import home from "@/views/home";
import battery from "@/views/batteryWarning/battery";
import portrait from "@/views/batteryPortrait/portrait";
import failure from "@/views/faultStatistics/failure";
import historical from "@/views/historicalSources/historical";
import system from "@/views/systemManagement/system";
import top from "@/components/header";
// import toph from '@/components/top'
import login from "@/views/login";
import retrievePassword from "@/views/retrievePassword";
import map from "@/views/map";
import signal from "@/views/batteryPortrait/signal";
import pack from "@/views/batteryPortrait/pack";
import core from "@/views/batteryPortrait/cellCore";
import journal from "@/views/systemManagement/journal";
import news from "@/views/systemManagement/news";
import role from "@/views/systemManagement/role";
import user from "@/views/systemManagement/user";
import packgl from "@/views/systemManagement/packgl";
import model from "@/views/systemManagement/model";
import systemCar from "@/views/systemManagement/systemCar";
import early from "@/views/batteryWarning/early";
import {
  defaults
} from "autoprefixer";
Vue.use(Router);

const router = new Router({
  routes: [{
      path: "/",
      name: "home",
      component: home
    },
    {
      path: "/home",
      name: "home",
      component: home
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/retrievePassword",
      name: "retrievePassword",
      component: retrievePassword
    },
    {
      path: "/battery",
      name: "battery",
      component: battery
    },
    {
      path: "/portrait",
      name: "portrait",
      component: portrait
    },
    {
      path: "/signal",
      name: "signal",
      component: signal
    },
    {
      path: "/pack",
      name: "pack",
      component: pack
    },
    {
      path: "/core",
      name: "core",
      component: core
    },
    {
      path: "/failure",
      name: "failure",
      component: failure
    },
    {
      path: "/historical",
      name: "historical",
      component: historical
    },
    {
      path: "/system",
      name: "system",
      component: system
    },
    {
      path: "/map",
      name: "map",
      component: map
    },
    {
      path: "/journal",
      name: "journal",
      component: journal
    },
    {
      path: "/news",
      name: "news",
      component: news
    },
    {
      path: "/role",
      name: "role",
      component: role
    },
    {
      path: "/user",
      name: "role",
      component: user
    },
    {
      path: "/vehicle",
      name: "vehicle",
      component: () => import("@/views/vehicle/index")
    },
    {
      path: "/packgl",
      name: "model",
      component: packgl
    },
    {
      path: "/model",
      name: "model",
      component: model
    },
    {
      path: "/systemCar",
      name: "systemCar",
      component: systemCar
    },
    {
      path: "/early",
      name: "early",
      component: early
    },

  ]
});

//挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next()
//   if (to.path === '/retrievePassword') return next()
//   //获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login')
// })

export default router;
