import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  }
]

export const asyncRouterMap = [

  // 社区管理
  {
    path: '/community',
    component: Layout,
    redirect: '/community/list',
    name: 'Community',
    meta: {
      title: '社区管理',
      icon: 'table'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/community/view'),
        name: 'List',
        meta: { title: '社区列表', icon: 'list', noCache: true }
      },
      {
        path: 'create',
        component: () => import('@/views/community/create'),
        name: 'CreateCommunity',
        meta: { title: '创建社区', icon: 'edit' }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/community/edit'),
        name: 'EditCommunity',
        meta: { title: '编辑社区', noCache: true },
        hidden: true
      },
      {
        path: 'detail/:id',
        component: () => import('@/views/community/detail'),
        name: 'DetailCommunity',
        meta: { title: '社区详情', noCache: true },
        hidden: true
      }
    ]
  },
  // 物业管理员
  {
    path: '/administrator',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/administrator/view'),
        name: 'administrator',
        meta: { title: '社区物业管理员', icon: 'user', noCache: true }
      }
    ]
  },
  // 建筑管理
  {
    path: '/building',
    component: Layout,
    redirect: '/building/list',
    name: 'building',
    meta: {
      title: '建筑管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/building/list'),
        name: 'BuildList',
        meta: { title: '建筑列表', icon: 'list', noCache: true }
      },
      {
        path: 'unitlist',
        component: () => import('@/views/building/unit'),
        name: 'UnitList',
        meta: { title: '单位列表', icon: 'excel' }
      }
    ]
  },
  // 业主管理
  {
    path: '/proprietor',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/views/proprietor/list'),
        name: 'proprietor',
        meta: { title: '业主管理', icon: 'peoples', noCache: true }
      }
    ]
  },
  // 物业资产
  {
    path: '/asset',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/views/property/asset/list'),
        name: 'asset',
        meta: { title: '物业资产', icon: 'money', noCache: true }
      }
    ]
  },
  // 物业管理
  // {
  //   path: '/property',
  //   component: Layout,
  //   redirect: '/property/asset/list',
  //   name: 'Property',
  //   meta: {
  //     title: '物业管理',
  //     icon: 'example'
  //   },
  //   children: [
  //     {
  //       path: 'asset/list',
  //       component: () => import('@/views/property/asset/list'),
  //       name: 'Asset',
  //       meta: { title: '物业资产', icon: 'money', noCache: true }
  //     },
  //     {
  //       path: 'type',
  //       component: () => import('@/views/property/type/view.vue'),
  //       name: 'type',
  //       meta: { title: '设备类型', icon: 'size' }
  //     },
  //     {
  //       path: 'fault',
  //       component: () => import('@/views/property/fault/view.vue'),
  //       name: 'fault',
  //       meta: { title: '故障记录', icon: 'bug' }
  //     },
  //     {
  //       path: 'outgoing',
  //       component: () => import('@/views/property/outgoing/view.vue'),
  //       name: 'outgoing',
  //       meta: { title: '资产出入库', icon: 'nested' }
  //     },
  //     {
  //       path: 'file',
  //       component: () => import('@/views/property/file/view.vue'),
  //       name: 'file',
  //       meta: { title: '物业档案', icon: 'clipboard' }
  //     }
  //   ]
  // },
  // 物业公告
  {
    path: '/bulletin',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/views/event/notice/view.vue'),
        name: 'Bulletin',
        meta: { title: '公告', icon: 'wechat', noCache: true }
      }
    ]
  },
  // 物业事件
  {
    path: '/event',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/views/event/purchase/view.vue'),
        name: 'event',
        meta: { title: '物业事件', icon: 'form' }
      }
    ]
  },
  // 物业报表
  {
    path: '/report',
    component: Layout,
    redirect: '/arrears',
    name: 'report',
    meta: {
      title: '物业报表',
      icon: 'excel'
    },
    children: [
      // {
      //   path: 'payment',
      //   component: () => import('@/views/report/payment/view.vue'),
      //   name: 'Payment',
      //   meta: { title: '缴费通知', icon: 'list', noCache: true }
      // },
      {
        path: 'arrears',
        component: () => import('@/views/report/arrears/view.vue'),
        name: 'Arrears',
        meta: { title: '欠费查询', icon: 'list' }
      },
      {
        path: 'charged',
        component: () => import('@/views/report/charged/view.vue'),
        name: 'Charged',
        meta: { title: '已收款查询', icon: 'list' }
      },
      {
        path: 'prepayment',
        component: () => import('@/views/report/prepayment/view.vue'),
        name: 'Prepayment',
        meta: { title: '预支付查询', icon: 'list' }
      },
      {
        path: 'summary',
        component: () => import('@/views/report/summary/view.vue'),
        name: 'Summary',
        meta: { title: '费用汇总', icon: 'list' }
      },
      {
        path: 'fund',
        component: () => import('@/views/report/fund/view.vue'),
        name: 'Fund',
        meta: { title: '基金费用管理', icon: 'list' }
      },
      {
        path: 'unit',
        component: () => import('@/views/report/unit/view.vue'),
        name: 'Unittext',
        meta: { title: '单元收费管理', icon: 'list' }
      }
    ]
  },
   // 物业投诉
   {
    path: '/complaint',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/views/complaint/list'),
        name: 'Complaint',
        meta: { title: '物业投诉', icon: 'email', noCache: true }
      }
    ]
  },
  // 访客登记
  {
    path: '/visitor',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/views/visitor/list'),
        name: 'Visitor',
        meta: { title: '访客登记', icon: 'edit', noCache: true }
      }
    ]
  },
  // 会所管理
  {
    path: '/clubhouse',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/views/clubhouse/list'),
        name: 'Clubhouse',
        meta: { title: '会所管理', icon: 'drag', noCache: true }
      }
    ]
  },
  // 广告管理
  {
    path: '/adv',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/views/adv/list'),
        name: 'Clubhouse',
        meta: { title: '广告管理', icon: 'bug', noCache: true }
      }
    ]
  },

  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/svg-icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRouterMap, ...asyncRouterMap]
})
