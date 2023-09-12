import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register'
import Login from '../views/Login'
import Info from '../views/Info'
import Comment from '../views/Comment'
import About from '../views/About'
import axios from "axios";
import Advice from "../views/Advice";
import myPost from "../views/myPost";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/editInfo',
    name: 'editInfo',
    component: Info
  },  {
    path: '/comment',
    name: 'comment',
    component: Comment
  },{
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/advice',
    name: 'advice',
    component: Advice
  }, {
    path: '/mypost',
    name: 'mypost',
    component: myPost
  },

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), //真傻逼啊 为什么不写注释 你妈的
  routes
})

//全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用  要改的
/*router.beforeEach((to,from,next)=>{
    console.log("前置路由")
    var item = JSON.parse(window.localStorage.getItem('access-admin'));
    if(item){
        axios({
            method:'get',
            url:'http://192.168.2.148:9090/user_sys/checkToken',
            headers:{
                authorization:item.data.token
            }
        }).then((resp) => {
            if (resp.data){
                next()
            }
        },(error) => {
            this.$message.error('错了哦，这是一条错误消息');
            next({
                name:"login"
            })
        })
        }else{
        console.log("跳转啊")
            next()
        }
})*/

export default router
