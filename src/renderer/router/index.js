import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: require('@/views/Home').default
    },
    {
      path: '/info',
      name: 'about-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/install',
      name: 'install-page',
      component: require('@/views/Install').default
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
