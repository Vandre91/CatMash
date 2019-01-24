import Vue from 'vue'
import Router from 'vue-router'
import CatMash from '@/components/CatMash'
import CatStatistic from '@/components/CatStatistic'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CatMash',
      component: CatMash
    },
    {
      path: '/CatStatistic',
      name: 'CatStatistic',
      component: CatStatistic
    }
  ]
})
