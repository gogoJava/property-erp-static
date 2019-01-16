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
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   redirect: '/documentation/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/documentation/index'),
  //       name: 'Documentation',
  //       meta: { title: 'documentation', icon: 'documentation', noCache: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: 'guide', icon: 'guide', noCache: true }
  //     }
  //   ]
  // }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/index',
  //   alwaysShow: true, // will always show the root menu
  //   meta: {
  //     title: 'permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'pagePermission',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'directivePermission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     }
  //   ]
  // },

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
  // 大厦管理
  {
    path: '/building',
    component: Layout,
    redirect: '/building/list',
    name: 'building',
    meta: {
      title: '大厦管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/building/list'),
        name: 'BuildList',
        meta: { title: '大厦列表', icon: 'list', noCache: true }
      },
      {
        path: 'unit',
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
  // 物业管理
  {
    path: '/property',
    component: Layout,
    redirect: '/property/asset/list',
    name: 'Property',
    meta: {
      title: '物业管理',
      icon: 'example'
    },
    children: [
      {
        path: 'asset/list',
        component: () => import('@/views/property/asset/list'),
        name: 'Asset',
        meta: { title: '物业资产', icon: 'money', noCache: true }
      },
      {
        path: 'type',
        component: () => import('@/views/property/type/view.vue'),
        name: 'type',
        meta: { title: '设备类型', icon: 'size' }
      },
      {
        path: 'fault',
        component: () => import('@/views/property/fault/view.vue'),
        name: 'fault',
        meta: { title: '故障记录', icon: 'bug' }
      },
      {
        path: 'outgoing',
        component: () => import('@/views/property/outgoing/view.vue'),
        name: 'outgoing',
        meta: { title: '资产出入库', icon: 'nested' }
      },
      {
        path: 'file',
        component: () => import('@/views/property/file/view.vue'),
        name: 'file',
        meta: { title: '物业档案', icon: 'clipboard' }
      }
    ]
  },
  // 物业事件
  {
    path: '/event',
    component: Layout,
    redirect: '/bulletin',
    name: 'event',
    meta: {
      title: '物业事件',
      icon: 'form'
    },
    children: [
      {
        path: 'bulletin',
        component: () => import('@/views/event/bulletin/view.vue'),
        name: 'Bulletin',
        meta: { title: '公告', icon: 'wechat', noCache: true }
      },
      {
        path: 'purchase',
        component: () => import('@/views/event/purchase/view.vue'),
        name: 'Purchase',
        meta: { title: '物业采购', icon: 'dashboard' }
      },
      {
        path: 'maintenance',
        component: () => import('@/views/event/maintenance/view.vue'),
        name: 'Maintenance',
        meta: { title: '资产保养', icon: 'bug' }
      }
    ]
  },
  // 物业报表
  {
    path: '/report',
    component: Layout,
    redirect: '/report',
    name: 'report',
    meta: {
      title: '物业报表',
      icon: 'excel'
    },
    children: [
      {
        path: 'payment',
        component: () => import('@/views/report/payment/view.vue'),
        name: 'Payment',
        meta: { title: '缴费通知', icon: 'list', noCache: true }
      },
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
      // {
      //   path: 'purchase',
      //   component: () => import('@/views/report/purchase/view.vue'),
      //   name: 'Purchase',
      //   meta: { title: '个人收费明细', icon: 'list' }
      // },
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

  /** When your routing table is too long, you can split it into small modules**/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'example',
  //     icon: 'example'
  //   },
  //   children: [
  //     {
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: { title: 'createArticle', icon: 'edit' }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: { title: 'editArticle', noCache: true },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: { title: 'articleList', icon: 'list' }
  //     }
  //   ]
  // },

  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'Tab',
  //       meta: { title: 'tab', icon: 'tab' }
  //     }
  //   ]
  // },

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'errorPages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/errorPage/401'),
  //       name: 'Page401',
  //       meta: { title: 'page401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/errorPage/404'),
  //       name: 'Page404',
  //       meta: { title: 'page404', noCache: true }
  //     }
  //   ]
  // },

  // 错误日志
  // {
  //   path: '/error-log',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/errorLog/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'errorLog', icon: 'bug' }
  //     }
  //   ]
  // },

  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/exportExcel'),
  //       name: 'ExportExcel',
  //       meta: { title: 'exportExcel' }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/selectExcel'),
  //       name: 'SelectExcel',
  //       meta: { title: 'selectExcel' }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/uploadExcel'),
  //       name: 'UploadExcel',
  //       meta: { title: 'uploadExcel' }
  //     }
  //   ]
  // },

  // zip
  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   meta: { title: 'zip', icon: 'zip' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: () => import('@/views/zip/index'),
  //       name: 'ExportZip',
  //       meta: { title: 'exportZip' }
  //     }
  //   ]
  // },

  // 主题色
  // {
  //   path: '/theme',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'theme', icon: 'theme' }
  //     }
  //   ]
  // },

  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'clipboardDemo', icon: 'clipboard' }
  //     }
  //   ]
  // },

  // 国际化
  // {
  //   path: '/i18n',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/i18n-demo/index'),
  //       name: 'I18n',
  //       meta: { title: 'i18n', icon: 'international' }
  //     }
  //   ]
  // },

  // 外链
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'externalLink', icon: 'link' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]
