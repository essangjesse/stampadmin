import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: {auth: true},
  },
  {
    path: "/broadcast",
    name: "Broadcast",
    component: () =>
      import(/* webpackChunkName: "broadcast" */ "@/views/Broadcast.vue"),
    meta: {auth: true},
  },
  {
    path: "/corps-members",
    name: "CorpsMembers",
    component: () =>
      import(/* webpackChunkName: "corps-members" */ "@/views/CorpsMembers.vue"),
    meta: {auth: true},
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
    meta: {auth: false},
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () =>
      import(/* webpackChunkName: "forgot-password" */ "@/views/ForgotPassword.vue"),
    meta: {auth: false},
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: () =>
      import(/* webpackChunkName: "reset-password" */ "@/views/ResetPassword.vue"),
    meta: {auth: false},
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  api_base: "http://67.207.69.246/api/v1/gateway",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.auth)) {
    if (store.getters.isAuthenticated) {
      next()
      return
    }
    next("/login");
  } else {
    next();
  }
});

router.afterEach((to) => {
  if(to.matched.some((record) => record.meta.auth)){
    if((Date.now() - store.getters.tokenExpiresIn) > store.getters.loggedInAt){
      if(!store.getters.isRemembered){
        store.dispatch("LogOut")
        router.push({name: "Login"})
      }else{
        fetch(router.options.api_base + "/token/refresh", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Client-Public": 2,
                "Client-Secret": "ibTVTRz6TdUi6Byc9tWvQAE4GDz8wAzS9GDvMBkk",
                "Refresh-Token": store.getters.refreshToken 
            }
        })
        .then(res => res.json())
        .then(res => {
          if(res.status){
            store.dispatch('SetToken', res.token)
            store.dispatch('SetLogInTime')
          }else{
            store.dispatch("LogOut")
            router.push({name: "Login"})
          }
        })
        .catch(err => console.log(err));
      }
    }
    return
  }
});

export default router;
