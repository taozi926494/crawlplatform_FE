import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getUsername, getRoles, removeAllCookies } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = ['/login']// no redirect whitelist
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  // 取用户名
  if (getUsername()) {
    // 取路由
    if (store.getters.routerState === 'setted') {
      next()
    } else {
      // 取角色
      const roles = getRoles()
      // 有角色，构造路由
      if (roles.length > 0) {
        store.dispatch('GenerateRoutes', roles).then(() => { // 根据roles权限生成可访问的路由表
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          store.commit('SET_ROUTER_STATE', 'setted')
          next({ ...to, replace: true })
        })
      } else {
        // 没有角色，重定向到首页
        Message.info('未获取到角色信息，请登录！')
        removeAllCookies()
        window.location = process.env.BACKEND_URL
      }
    }
  } else {
    // 没有取到用户名，清除cookie，重定向到首页
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      Message.info('未获取到登录信息，请登录！')
      removeAllCookies()
      window.location = process.env.BACKEND_URL
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
// router.beforeEach((to, from, next) => {
//   NProgress.start() // start progress bar

//   if (getToken()) { // determine if there has token
//     /* has token*/
//     if (to.path === '/login') {
//       next({ path: '/' })
//       NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
//     } else {
//       if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
//         store.dispatch('GetInfo').then(res => { // 拉取user_info
//           console.log(res.data.roles)
//           const roles = res.data.roles // note: roles must be a array! such as: ['editor','develop']
//           store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
//             router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
//             next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
//           })
//         }).catch((err) => {
//           store.dispatch('FedLogOut').then(() => {
//             Message.error(err || 'Verification failed, please login again')
//             next({ path: '/' })
//           })
//         })
//       } else {
//         next()
//       }
//     }
//   } else {
//     /* has no token*/
//     if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
//       next()
//     } else {
//       next('/login') // 否则全部重定向到登录页
//       NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
//     }
//   }
// })
// router.afterEach(() => {
//   NProgress.done() // finish progress bar
// })
