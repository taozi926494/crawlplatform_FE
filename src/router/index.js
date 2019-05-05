import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/visual', component: () => import('@/views/visual'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'root',
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '',
    component: Layout,
    name: 'dashboard',
    children: [{
      path: 'dashboard',
      name: '爬虫运行状态',
      meta: { title: '爬虫运行状态', icon: 'spider', roles: ['leader'] },
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/project',
    component: Layout,
    redirect: '/project/all',
    name: '爬虫项目管理',
    meta: { title: '爬虫项目管理', icon: 'project_manage' },
    children: [
      {
        path: 'all',
        name: '所有项目',
        component: () => import('@/views/project/index'),
        meta: { title: '所有项目', icon: 'list', roles: ['leader'] }
      },
      {
        path: 'addproject',
        name: '添加项目',
        component: () => import('@/views/project/addproject'),
        meta: { title: '添加项目', icon: 'add_project', roles: ['leader'] }
      },
      {
        path: 'info/:name',
        name: '项目详情',
        hidden: true,
        component: () => import('@/views/project/info'),
        meta: { title: '项目详情', icon: 'eye', roles: ['leader'] }
      }
    ]
  },
  {
    path: '/machine',
    component: Layout,
    redirect: '/machine/all',
    name: '参数配置',
    meta: { title: '参数配置', icon: 'param' },
    children: [
      {
        path: 'all',
        name: '服务器',
        component: () => import('@/views/machine/index'),
        meta: { title: '服务器', icon: 'server', roles: ['leader'] }
      },
      {
        path: 'developer',
        name: '开发人员',
        component: () => import('@/views/developers/index'),
        meta: { title: '开发人员', icon: 'add_deverper', roles: ['leader'] }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'user',
        component: () => import('@/views/user/index'),
        meta: { title: '个人中心', icon: 'user', roles: ['leader'] }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
