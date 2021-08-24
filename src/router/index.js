import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


import Main from './bin/main';

import PostList from '../views/community/post-list.vue';

import Article from '../views/community/article.vue';

import Login from '../views/login.vue';

import MainVc from '../views/main.vue';


const routes = [
  {
    path: '/',
    redirect: '/community'
  },
  {
    path: '/main',
    component: MainVc,
    children: Main
  }, {
    path: '/post/list/:categoryID',
    component: PostList,
    name: 'postList'
  }, {
    path: '/post/article/:postID',
    component: Article,
    name: 'article',
    props: function (route) {
      return {
        postID: route.params.postID
      }
    }
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
});


router.beforeEach(function (to, from, next) {

  const loginStatus = window.localStorage.getItem('loginStatus');

  if (to.path === '/login' && loginStatus === '1') {
    next('/space');
  } else {
    next();
  }

});

export default router
