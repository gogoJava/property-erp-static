export default {
  route: {
    dashboard: '首頁',
    introduction: '簡述',
    documentation: '文檔',
    guide: '引導頁',
    permission: '權限測試頁',
    pagePermission: '頁面權限',
    directivePermission: '指令權限',
    icons: '圖標',
    components: '組件',
    componentIndex: '介绍',
    tinymce: '富文本編輯器',
    markdown: 'Markdown',
    jsonEditor: 'JSON編輯器',
    dndList: '列表拖拽',
    splitPane: 'Splitpane',
    avatarUpload: '头像上传',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'CountTo',
    componentMixin: '小組件',
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
    inlineEditTable: 'Table内編輯',
    complexTable: '综合Table',
    treeTable: '树形表格',
    customTreeTable: '自定义树表',
    tab: 'Tab',
    form: '表单',
    createArticle: '创建文章',
    editArticle: '編輯文章',
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
    externalLink: '外链',
    community: '社區管理',
    communityTest: '社区',
    communityList: '社區列表',
    communityCreate: '創建社區',
    administrator: '社區物業管理員',
    building: '建築管理',
    buildingList: '建築列表',
    unitList: '單位列表',
    proprietor: '業主管理',
    propertyAssets: '物業資產',
    bulletin: '公告',
    propertyEvent: '物業事件',
    propertyReport: '物業報表',
    arrears: '欠費查詢',
    receivedInquiry: '已收款查詢',
    prepaidInquiry: '預支付查詢',
    costSummary: '費用匯總',
    fundFee: '收費項目管理',
    unitCharge: '單元收費管理',
    unitChargeList: '單元收費項目',
    propertyComplaint: '物業投訴',
    visitor: '訪客登記',
    clubhouse: '會所管理',
    placeRecord: '場所記錄管理',
    advertisement: '廣告管理',
    statistic: '使用統計'
  },
  navbar: {
    logOut: '退出登錄',
    updatePwd: '修改密碼',
    dashboard: '首頁',
    github: '项目地址',
    screenfull: '全屏',
    theme: '换肤',
    size: '布局大小'
  },
  login: {
    title: '系統登錄',
    logIn: '登錄',
    username: '賬號',
    password: '密碼',
    any: '隨便填',
    thirdparty: '第三方登錄',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  documentation: {
    documentation: '文檔',
    github: 'Github 地址'
  },
  permission: {
    roles: '你的权限',
    switchRoles: '切换权限',
    tips: '在某些情况下，不适合使用 v-permission。例如：Element-UI 的 Tab 組件或 el-table-column 以及其它动态渲染 dom 的场景。你只能通过手动设置 v-if 来实现。'
  },
  guide: {
    description: '引導頁对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于',
    button: '打开引导'
  },
  components: {
    documentation: '文檔',
    tinymceTips: '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
    dropzoneTips: '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
    stickyTips: '当页面滚动到预设的位置会吸附在顶部',
    backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
    backToTopTips2: '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    imageUploadTips: '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
  },
  table: {
    dynamicTips1: '固定表頭, 按照表頭順序排序',
    dynamicTips2: '不固定表頭, 按照點擊順序排序',
    dragTips1: '默認順序',
    dragTips2: '拖拽後順序',
    title: '標題',
    importance: '重要性',
    type: '類型',
    remark: '点评',
    search: '搜索',
    add: '添加',
    export: '導出',
    reviewer: '審核人',
    id: '序號',
    date: '時間',
    author: '作者',
    readings: '閱讀數',
    status: '狀態',
    actions: '操作',
    detail: '詳情',
    edit: '編輯',
    updatePwd: '修改密碼',
    publish: '發布',
    draft: '草稿',
    delete: '删除',
    cancel: '取消',
    confirm: '确定',
    preCharge: '預收費',
    paymentNotice: '付款通知書',
    print: '打印',
    confirmPay: '確認收款',
    linked: '關聯',
    bindUser: '綁定業主',
    download: '下載',
    importUnit: '導入單元',
    importUser: '導入業主'
  },
  errorLog: {
    tips: '请点击右上角bug小圖標',
    description: '现在的管理后台基本都是spa的形式了，它增强了用戶体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文檔介绍'
  },
  excel: {
    export: '導出',
    selectedExport: '導出已选择项',
    placeholder: '请输入文件名(默认excel-list)'
  },
  zip: {
    export: '導出',
    placeholder: '请输入文件名(默认file)'
  },
  pdf: {
    tips: '这里使用   window.print() 来实现下载pdf的功能'
  },
  theme: {
    change: '换肤',
    documentation: '换肤文檔',
    tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文檔。'
  },
  tagsView: {
    refresh: '刷新',
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  // 社區
  community: {
    communityNo: '物業標示編號',
    communityName: '社區名字',
    communityAddress: '社區全址', // 社區全址
    communityArea: '總面積', // 總面積(平方米)
    communityCoverArea: '覆蓋面積', // 覆蓋面積(平方米)
    communityNoCoverArea: '無覆蓋面積', // 無覆蓋面積(平方米)
    communityVerticalArea: '垂直佔用空間面積', // 垂直佔用空間面積(平方米)
    communityShopsArea: '商舖面積', // 商舖面積(平方米)
    communityHouseArea: '住宅面積', // 住宅面積(平方米)
    communityAddressDirectionFirstValue: '地址方向1', // 地址方向1
    communityAddressDirectionSecondValue: '地址方向2', // 地址方向2
    communityAddressDirectionThirdValue: '地址方向3', // 地址方向3
    communityAddressDirectionFourthValue: '地址方向4', // 地址方向4
    communityAddressDirectionFirstTips: '地址方向1提示', // 地址方向1提示
    communityAddressDirectionSecondTips: '地址方向2提示', // 地址方向2提示
    communityAddressDirectionThirdTips: '地址方向3提示', // 地址方向3提示
    communityAddressDirectionFourthTips: '地址方向4提示', // 地址方向4提示
    communityBuildingArea: '建築面積', // 建築面积
    communityCommonArea: '公用面積', // 公用面积
    communityContacts: '聯繫人', // 聯繫人
    communityContactsPhone: '聯繫人號碼', // 聯繫人號碼
    communityGarageArea: '车库面积', // 车库面积
    communityGarageCount: '車位數量', // 车位数量
    communityGreenarea: '綠化面積', // 绿化面积
    communityLocX: '社區緯度', // 社區纬度
    communityLocY: '社區經度', // 社區经度
    communityManagementType: '管理類型', // 管理類型(0普通管理1综合管理)
    communityRemark: '備註', // 備註
    communityRoadArea: '道路面積', // 道路面積
    communityRoomCount: '房間總數', // 房间总数
    commonPdf: '建築之公共部分', // 社區之公共部分
    communityShopsCount: '商舖數量'
  },
  // 管理员
  administrator: {
    communityId: '社區', // 社區id
    email: '郵箱', // 郵箱
    managerId: 'id',
    name: '名字', // 名字
    sex: '性别', // 性别0女1男
    type: '類型', // 類型0普通管理员1超级管理员
    username: '用戶名', // 用戶名
    password: '密碼', // 密碼
    portrait: '頭像',
    roleIds: '角色'
  },
  // 建築
  building: {
    buildingDirection: '建築方向', // 建築方向
    buildingId: 'ID', // buildingId
    buildingName: '建築名稱', // 建築名稱
    buildingNo: '建築編號', // 建築編號
    buildingStruct: '建築結構', // 建築結構
    communityId: '社區', // 社區ID
    deleted: '是否註銷', // 是否註銷
    floorLowNum: '層數', // 樓下幾層
    floorUpNum: '樓上幾層', // 樓上幾層
    fullAddress: '建築全址', // 建築全址
    floorList: '建築樓層',
    commonPdf: '建築之公共部分', // 楼宇之公共部分
    buildingChildList: '建築子部分', // 楼宇子部分
    layersList: '層數內容',
    rosterPdf: '業主花名冊文件',
    managementType: '管理類型' // 管理类型(0简单管理1综合管理)
  },
  // 单位
  unit: {
    unitChildRelativeProportion: '分層建築物之子部分相對比(百分之一)', // 分層建築物之子部分相對比(千分之一)
    buildingId: '建築', // buildingId
    community: '社區',
    unitCoveredArea: '覆蓋面積大小(單位平方米)', // 覆蓋面積大小(單位平方米)
    unitName: '單位名字', // 单元名字
    unitFullAddress: '全址', // 全址
    unitId: 'ID', // unitId
    unitNo: '單位編號', // 單位編號
    unitPosition: '位置', // 位置(地下,一楼,二楼,三楼,户外.)
    unitPurpose: '用途', // 用途
    unitRelativeProportion: '分層建築物相對比(百分之一)', // 分層建築物相對比(千分之一)
    unitStatus: '單位狀態', // 單位狀態0空置1租赁2装修中3入住
    unitType: '單位類型', // 单位類型1商铺2住宅3停车场
    unitTitle: '單位業權',
    additionalCost: '額外費用',
    alculationMethod: '計算方式',
    billingMode: '收費模式',
    describe: '金額',
    formula: '計算公式',
    itemName: '收費項目名字',
    itemNo: '收費項目編號',
    lateDate: '滯納金天數',
    lateFee: '滯納金率',
    unitPrice: '計算單價',
    owner: '是否有主業主'
  },
  // 业主
  proprietor: {
    birthday: '出生日期', // 出生日期
    communityId: '社區', // 社區ID
    countryCode: '區號', // 區號
    createTime: '創建時間', // 創建時間
    email: '電郵', // 邮编
    englishName: '英文名字', // 英文名字
    deleted: false, // 是否註銷
    idCard: '身份證號碼', // 身份證號碼
    marriageSystem: '婚姻制度', // 婚姻制度
    mateName: '配偶名字', // 配偶名字
    name: '名字', // 名字
    portrait: '用戶頭像', // 用戶頭像
    sex: '性别', // 性别(0女1男)
    tel: '手機號', // 手機號
    updateTime: '更新日期', // 更新時間
    userId: '用戶ID', // 用戶id
    username: '用戶登錄賬號', // 用戶登錄賬號
    password: '密碼', // 密碼
    userWithCommunities: '關聯單位',
    bindCommunities: '綁定社區',
    advanceAmount: '預收金額',
    owner: '是否為業主',
    title: '業權'
  },
  asset: {
    assetDescribe: '描述', // 描述
    assetEnglishDescribe: '描述（英文）', // 描述（英文）
    assetEnglishName: '資產名字（英文）', // 資產名字（英文）
    assetEnglishPosition: '位置信息（英文）', // 位置信息（英文）
    assetId: 'ID', // id
    assetName: '資產名字', // 資產名字
    assetPosition: '位置信息', // 位置信息
    assetTraditionalDescribe: '描述（繁体）', // 描述（繁体）
    assetTraditionalName: '資產名字（繁体）', // 資產名字（繁体）
    assetTraditionalPosition: '位置信息（繁体）', // 位置信息（繁体）
    assetType: '資產類型', // 資產類型：电器、公共设备
    community: '社區',
    communityId: '社區ID', // 社區ID
    buildingId: '建築', // buildingId
    assetMaintain: '保養',
    assetMaintainRemindCycle: '保養週期',
    assetBuyDate: '購入日期',
    assetStatus: '狀態',
    assetNo: '資產編號',
    assetImage: '資產相片',
    assetOverdueDate: '保固日期'
  },
  notice: {
    buildingId: '建築', // 建築id
    communityId: '社區ID', // 社區ID
    community: '社區', // 社區ID
    createTime: '創建時間', // 創建時間
    noticeDetails: '詳情', // 詳情
    noticeEnglishDetails: '詳情（英文）', // 詳情英文
    noticeEnglishTitle: '公告標題（英文）', // 公告標題
    noticeId: 'ID', // ID
    noticeImage: '圖片', // 圖片
    noticeTitle: '公告標題', // 公告標題
    noticeTraditionalDetails: '詳情（繁体）', // 詳情（繁体）
    noticeTraditionalTitle: '公告標題（繁体）', // 標題
    noticeType: '通知類型', // 通知類型
    updateTime: '更新時間', // 更新時間
    startTime: '開始日期',
    endTime: '結束日期',
    announcementDate: '公佈日期'
  },
  event: {
    community: '社區',
    communityId: '社區ID', // 社區ID
    eventCause: '事件起因', // 事件起因
    eventContent: '事件內容', // 事件內容
    eventDate: '事件日期', // 事件日期
    eventFinishDate: '完成時間', // 完成時間
    eventId: 'ID', // ID
    eventRemark: '備註', // 備註
    eventSolve: '解決方案', // 解決方案
    eventStatus: '事件進度', // 事件進度
    eventType: '事件類型', // 事件類型1采购2保养3其他
    eventRemindCycle: '提醒週期',
    eventChannel: '接收渠道',
    reportPdf: '事件圖片',
    reports: '報告PDF',
    complainClassType: '投訴標題',
    complainPosition: '投訴位置',
    complainReply: '投訴進度回复',
    complainSpecificPosition: '具體位置',
    complainType: '投訴類型',
    assetNo: '資產編號'
  },
  adv: {
    adv: '廣告',
    advId: 'ID', // ID
    building: '建築',
    buildingId: '建築id', // 建築id
    community: '社區', // 社區
    communityId: 'communityId', // communityId
    describe: '描述', // 描述
    residenceTime: '播放時間',
    title: '標題', // title
    type: '廣告類型', // 廣告類型 0普通圖片1视频
    url: '資源', // url
    used: '是否使用', // 是否使用0否1是
    purpose: '公告類型',
    announcementDate: '公佈日期'
  },
  complain: {
    complain: '投訴/保修',
    complainClassType: '分類', // 類型分類（供电系统，发电机…）
    complainDescribe: '描述', // 描述
    complainFinishTime: '完成時間', // 完成時間
    complainHandler: '處理人', // complainHandler
    community: '社區',
    complainId: 'id', // complainId
    complainLiaisonsEmail: '聯絡人電郵',
    complainLiaisonsName: '聯絡人', // complainLiaisonsName
    complainLiaisonsSex: '聯絡人性别', // 聯絡人性别(0女1男)
    complainPosition: '位置', // complainPosition
    complainStatus: '狀態', // 狀態:0发起1收到2处理中3处理完成
    complainType: '類型', // 類型(土木工程，清洁，保安…)
    complainVoice: '聲音', // example: E:/XXX/投诉.mp3
    createTime: '創建時間', // createTime
    images: '圖片', // images 【】
    updateTime: '更新時間', // updateTime
    userId: '用戶id',
    complainSpecificPosition: '具體位置' // complainSpecificPosition
  },
  visitor: {
    building: '建築',
    buildingId: '建築id', // 建築id
    community: '社區', // 社區
    communityId: 'communityId', // communityId
    createTime: '創建時間', // createTime
    updateTime: '更新時間', // updateTime
    visitorCause: '訪問事由', // visitorCause
    visitorId: 'id', // visitorId
    visitorName: '訪問者名字', // visitorName
    visitorSex: '性别', // 性别0女1男
    visitorPhone: '聯繫號碼', // visitorPhone
    visitorImage: '圖片'
  },
  clubhouse: {
    community: '社區',
    createTime: '創建時間', // createTime
    updateTime: '更新時間', // updateTime
    images: '圖片', // images 【】
    placeAdvanceOrderDay: '提前天數', // 提前天數
    placeEndTime: '結束時間', // placeEndTime
    placeEnglishIntroduction: '簡介(英文)', // 簡介(英文)
    placeEnglishName: '場所名字(英文)', // 場所名字(英文)
    placeFarthestOrderDay: '最大天數', // 最大天數
    placeId: 'id', // placeId
    placeIntroduction: '簡介(简体)',
    placeName: '場所名字(简体)', // 場所名字(简体)
    placeNeedOrder: '是否預定', // 需要预定(0否1是)
    placeStartTime: '起始時間', // 起始時間
    placeStatus: '場所狀態', // 場所狀態(0未开放1开放)
    placeTraditionalIntroduction: '簡介(繁体)', // 簡介(繁体)
    placeTraditionalName: '場所名字(繁体)', // 場所名字(繁体)
    placeUpperLimit: '預約時間上限',
    placeIconType: '圖標類型',
    placeCharge: '收費',
    placeAttachCharge: '清潔費用'
  },
  charge: {
    recordActualAmount: '實際收取金額', // 實際收取金額
    recordAmount: '收費金額', // 收費金額
    recordDate: '收費記錄年月份', // 收費記錄年月份(2019-01)
    recordId: '', // recordId
    recordLateDate: '滯納金天數', // 滯納金天數
    recordLateFee: '滯納金額', // 滯納金額
    recordRemark: '備註', // 備註
    recordStatus: '狀態', // 狀態0欠费1已付2预支付
    recordTime: '收費時間', // 收費時間
    unitItemId: '單位收費項目', // 單位收費項目
    userId: '住戶', // 住戶
    unitNo: '單元編號'
  },
  chargeItem: {
    additionalCost: '額外費用(基金費用)', // 額外費用(基金費用)
    alculationMethod: '計算方式', // 計算方式0定额1公式
    billingMode: '收費模式', // 收费模式0周期性1临时性
    communityId: '社區id', // 社區id
    community: '社區', // 社區
    describe: '金額', // 金額
    formula: '計算公式', // 計算公式
    itemId: 'id', // itemId
    itemName: '收費項目名字', // 收費項目名字
    itemNo: '收費項目編號', // 收費項目編號
    lateFee: '滯納金率', // 滯納金率(单位:百分之一)
    unitPrice: '計算單價', // 計算單價
    lateDate: '滯納開始天數' // 滯納開始天數
  },
  placeRecord: {
    attachCharge: '附加費用',
    averageCharge: '每小時費用',
    communityId: '社區',
    createTime: '創建時間', // createTime
    updateTime: '更新時間', // updateTime
    orderDate: '預定時間',
    orderEndTime: '結束時間',
    orderStartTime: '開始時間',
    place: '場所',
    recordStatus: '預定狀態',
    totalCharge: '總費用',
    totalHour: '總時間',
    userId: '用户ID'
  }
}
