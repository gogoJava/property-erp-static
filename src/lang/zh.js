export default {
  route: {
    dashboard: '首页',
    introduction: '简述',
    documentation: '文档',
    guide: '引导页',
    permission: '权限测试页',
    pagePermission: '页面权限',
    directivePermission: '指令权限',
    icons: '图标',
    components: '组件',
    componentIndex: '介绍',
    tinymce: '富文本编辑器',
    markdown: 'Markdown',
    jsonEditor: 'JSON编辑器',
    dndList: '列表拖拽',
    splitPane: 'Splitpane',
    avatarUpload: '头像上传',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'CountTo',
    componentMixin: '小组件',
    backToTop: '返回顶部',
    dragDialog: '拖拽 Dialog',
    dragSelect: '拖拽 Select',
    dragKanban: '可拖拽看板',
    charts: '图表',
    keyboardChart: '键盘图表',
    lineChart: '折线图',
    mixChart: '混合图表',
    example: '综合实例',
    nested: '路由嵌套',
    menu1: '菜单1',
    'menu1-1': '菜单1-1',
    'menu1-2': '菜单1-2',
    'menu1-2-1': '菜单1-2-1',
    'menu1-2-2': '菜单1-2-2',
    'menu1-3': '菜单1-3',
    menu2: '菜单2',
    Table: 'Table',
    dynamicTable: '动态Table',
    dragTable: '拖拽Table',
    inlineEditTable: 'Table内编辑',
    complexTable: '综合Table',
    treeTable: '树形表格',
    customTreeTable: '自定义树表',
    tab: 'Tab',
    form: '表单',
    createArticle: '创建文章',
    editArticle: '编辑文章',
    articleList: '文章列表',
    errorPages: '错误页面',
    page401: '401',
    page404: '404',
    errorLog: '错误日志',
    excel: 'Excel',
    exportExcel: 'Export Excel',
    selectExcel: 'Export Selected',
    uploadExcel: 'Upload Excel',
    zip: 'Zip',
    exportZip: 'Export Zip',
    theme: '换肤',
    clipboardDemo: 'Clipboard',
    i18n: '国际化',
    externalLink: '外链'
  },
  navbar: {
    logOut: '退出登录',
    updatePwd: '修改密码',
    dashboard: '首页',
    github: '项目地址',
    screenfull: '全屏',
    theme: '换肤',
    size: '布局大小'
  },
  login: {
    title: '系统登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  documentation: {
    documentation: '文档',
    github: 'Github 地址'
  },
  permission: {
    roles: '你的权限',
    switchRoles: '切换权限',
    tips: '在某些情况下，不适合使用 v-permission。例如：Element-UI 的 Tab 组件或 el-table-column 以及其它动态渲染 dom 的场景。你只能通过手动设置 v-if 来实现。'
  },
  guide: {
    description: '引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于',
    button: '打开引导'
  },
  components: {
    documentation: '文档',
    tinymceTips: '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
    dropzoneTips: '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
    stickyTips: '当页面滚动到预设的位置会吸附在顶部',
    backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
    backToTopTips2: '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    imageUploadTips: '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
  },
  table: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    title: '标题',
    importance: '重要性',
    type: '类型',
    remark: '点评',
    search: '搜索',
    add: '添加',
    export: '导出',
    reviewer: '审核人',
    id: '序号',
    date: '时间',
    author: '作者',
    readings: '阅读数',
    status: '状态',
    actions: '操作',
    detail: '详情',
    edit: '编辑',
    updatePwd: '修改密码',
    publish: '发布',
    draft: '草稿',
    delete: '删除',
    cancel: '取消',
    confirm: '确定'
  },
  errorLog: {
    tips: '请点击右上角bug小图标',
    description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍'
  },
  excel: {
    export: '导出',
    selectedExport: '导出已选择项',
    placeholder: '请输入文件名(默认excel-list)'
  },
  zip: {
    export: '导出',
    placeholder: '请输入文件名(默认file)'
  },
  pdf: {
    tips: '这里使用   window.print() 来实现下载pdf的功能'
  },
  theme: {
    change: '换肤',
    documentation: '换肤文档',
    tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
  },
  tagsView: {
    refresh: '刷新',
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  // 社区
  community: {
    communityNo: '社区编号',
    communityName: '社区名字',
    communityAddress: '社区全址', // 社区全址
    communityArea: '总面积', // 总面积(平方米)
    communityBuildingArea: '建筑面积', // 建筑面积
    communityCommonArea: '公用面积', // 公用面积
    communityContacts: '联系人', // 联系人
    communityContactsPhone: '联系人号码', // 联系人号码
    communityGarageArea: '车库面积', // 车库面积
    communityGarageCount: '车位数量', // 车位数量
    communityGreenarea: '绿化面积', // 绿化面积
    communityLocX: '社区纬度', // 社区纬度
    communityLocY: '社区经度', // 社区经度
    communityManagementType: '管理类型', // 管理类型(0普通管理1综合管理)
    communityRemark: '备注', // 备注
    communityRoadArea: '道路面积', // 道路面积
    communityRoomCount: '房间总数' // 房间总数
  },
  // 管理员
  administrator: {
    communityId: '社区', // 社区id
    email: '邮箱', // 邮箱
    managerId: 'id',
    name: '名字', // 名字
    sex: '性别', // 性别0女1男
    type: '类型', // 类型0普通管理员1超级管理员
    username: '用户名', // 用户名
    password: '密码' // 密码
  },
  // 大厦
  building: {
    buildingDirection: '楼宇方向', // 楼宇方向
    buildingId: 'ID', // buildingId
    buildingName: '楼宇名字', // 楼宇名字
    buildingNo: '楼宇编号', // 楼宇编号
    buildingStruct: '楼宇结构', // 楼宇结构
    communityId: '社区', // 社区ID
    deleted: '是否注销', // 是否注销
    floorLowNum: '楼下几层', // 楼下几层
    floorUpNum: '楼上几层', // 楼上几层
    fullAddress: '楼宇全址' // 楼宇全址
  },
  // 单位
  unit: {
    unitChildRelativeProportion: '分层建筑物之子部分相对比(千分之一)', // 分层建筑物之子部分相对比(千分之一)
    buildingId: '大厦', // buildingId
    unitCoveredArea: '覆盖面积大小(单位平方米)', // 覆盖面积大小(单位平方米)
    unitName: '单位名字', // 单元名字
    unitFullAddress: '全址', // 全址
    unitId: 'ID', // unitId
    unitNo: '单位编号', // 单位编号
    unitPosition: '位置', // 位置(地下,一楼,二楼,三楼,户外.)
    unitPurpose: '用途', // 用途
    unitRelativeProportion: '分层建筑物相对比(千分之一)', // 分层建筑物相对比(千分之一)
    unitStatus: '单位状态', // 单位状态0空置1租赁2装修中3入住
    unitType: '单位类型' // 单位类型1商铺2住宅3停车场
  },
  // 业主
  proprietor: {
    birthday: '出生日期', // 出生日期
    communityId: '社区', // 社区ID
    countryCode: '区号', // 区号
    createTime: '创建时间', // 创建时间
    email: '电邮', // 邮编
    englishName: '英文名字', // 英文名字
    deleted: false, // 是否注销
    idCard: '身份证号码', // 身份证号码
    marriageSystem: '婚姻制度', // 婚姻制度
    mateName: '配偶名字', // 配偶名字
    name: '名字', // 名字
    portrait: '用户头像', // 用户头像
    sex: '性别', // 性别(0女1男)
    tel: '手机号', // 手机号
    updateTime: '更新日期', // 更新时间
    userId: '用户ID', // 用户id
    username: '用户登录账号', // 用户登录账号
    password: '密码' // 密码
  },
  asset: {
    assetDescribe: '描述', // 描述
    assetEnglishDescribe: '描述（英文）', // 描述（英文）
    assetEnglishName: '资产名字（英文）', // 资产名字（英文）
    assetEnglishPosition: '位置信息（英文）', // 位置信息（英文）
    assetId: 'ID', // id
    assetName: '资产名字', // 资产名字
    assetPosition: '位置信息', // 位置信息
    assetTraditionalDescribe: '描述（繁体）', // 描述（繁体）
    assetTraditionalName: '资产名字（繁体）', // 资产名字（繁体）
    assetTraditionalPosition: '位置信息（繁体）', // 位置信息（繁体）
    assetType: '资产类型', // 资产类型：电器、公共设备
    communityId: '社区ID' // 社区ID
  },
  notice: {
    buildingId: '建筑', // 建筑id
    communityId: '社区ID', // 社区ID
    createTime: '创建时间', // 创建时间
    noticeDetails: '详情', // 详情
    noticeEnglishDetails: '详情（英文）', // 详情英文
    noticeEnglishTitle: '场所标题（英文）', // 场所标题
    noticeId: 'ID', // ID
    noticeImage: '图片', // 图片
    noticeTitle: '场所标题', // 场所标题
    noticeTraditionalDetails: '详情（繁体）', // 详情（繁体）
    noticeTraditionalTitle: '标题（繁体）', // 标题
    noticeType: '通知类型', // 通知类型
    updateTime: '更新时间' // 更新时间
  },
  event: {
    communityId: '社区ID', // 社区ID
    eventCause: '事件起因', // 事件起因
    eventContent: '事件内容', // 事件内容
    eventDate: '事件日期', // 事件日期
    eventFinishDate: '完成时间', // 完成时间
    eventId: 'ID', // ID
    eventRemark: '备注', // 备注
    eventSolve: '解决方案', // 解决方案
    eventStatus: '事件进度', // 事件进度
    eventType: '事件类型' // 事件类型1采购2保养3其他
  }
}
