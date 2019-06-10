export default {
  route: {
    dashboard: 'Dashboard',
    introduction: 'Introduction',
    documentation: 'Documentation',
    guide: 'Guide',
    permission: 'Permission',
    pagePermission: 'Page Permission',
    directivePermission: 'Directive Permission',
    icons: 'Icons',
    components: 'Components',
    componentIndex: 'Introduction',
    tinymce: 'Tinymce',
    markdown: 'Markdown',
    jsonEditor: 'JSON Editor',
    dndList: 'Dnd List',
    splitPane: 'SplitPane',
    avatarUpload: 'Avatar Upload',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'CountTo',
    componentMixin: 'Mixin',
    backToTop: 'BackToTop',
    dragDialog: 'Drag Dialog',
    dragSelect: 'Drag Select',
    dragKanban: 'Drag Kanban',
    charts: 'Charts',
    keyboardChart: 'Keyboard Chart',
    lineChart: 'Line Chart',
    mixChart: 'Mix Chart',
    example: 'Example',
    nested: 'Nested Routes',
    menu1: 'Menu 1',
    'menu1-1': 'Menu 1-1',
    'menu1-2': 'Menu 1-2',
    'menu1-2-1': 'Menu 1-2-1',
    'menu1-2-2': 'Menu 1-2-2',
    'menu1-3': 'Menu 1-3',
    menu2: 'Menu 2',
    Table: 'Table',
    dynamicTable: 'Dynamic Table',
    dragTable: 'Drag Table',
    inlineEditTable: 'Inline Edit',
    complexTable: 'Complex Table',
    treeTable: 'Tree Table',
    customTreeTable: 'Custom TreeTable',
    tab: 'Tab',
    form: 'Form',
    createArticle: 'Create Article',
    editArticle: 'Edit Article',
    articleList: 'Article List',
    errorPages: 'Error Pages',
    page401: '401',
    page404: '404',
    errorLog: 'Error Log',
    excel: 'Excel',
    exportExcel: 'Export Excel',
    selectExcel: 'Export Selected',
    uploadExcel: 'Upload Excel',
    zip: 'Zip',
    exportZip: 'Export Zip',
    theme: 'Theme',
    clipboardDemo: 'Clipboard',
    i18n: 'I18n',
    externalLink: 'External Link',
    community: 'Community',
    communityTest: '社区Test',
    communityList: 'Community List',
    communityCreate: 'Create Community',
    administrator: 'Administrator',
    building: 'Building',
    buildingList: 'Building List',
    unitList: 'Unit List',
    proprietor: 'Proprietor',
    propertyAssets: 'Property Assets',
    bulletin: 'Bulletin',
    propertyEvent: 'Property Event',
    propertyReport: 'Property Report',
    arrears: 'Arrears',
    receivedInquiry: 'Received Inquiry',
    prepaidInquiry: 'Prepaid Inquiry',
    costSummary: 'Cost Summary',
    fundFee: 'Charge Project Management',
    unitCharge: 'Unit Charge',
    unitChargeList: 'Unit charge item',
    propertyComplaint: 'Property Complaint',
    visitor: 'Visitor',
    clubhouse: 'Clubhouse',
    placeRecord: 'Location record management',
    advertisement: 'Advertisement',
    statistic: 'Usage statistics'
  },
  navbar: {
    logOut: 'Log Out',
    updatePwd: 'Update PassWord',
    dashboard: 'Dashboard',
    github: 'Github',
    screenfull: 'Screenfull',
    theme: 'Theme',
    size: 'Global Size'
  },
  login: {
    title: 'Login Form',
    logIn: 'Log in',
    username: 'Username',
    password: 'Password',
    any: 'any',
    thirdparty: 'Or connect with',
    thirdpartyTips: 'Can not be simulated on local, so please combine you own business simulation! ! !'
  },
  documentation: {
    documentation: 'Documentation',
    github: 'Github Repository'
  },
  permission: {
    roles: 'Your roles',
    switchRoles: 'Switch roles',
    tips: 'In some cases it is not suitable to use v-permission, such as element Tab component or el-table-column and other asynchronous rendering dom cases which can only be achieved by manually setting the v-if.'
  },
  guide: {
    description: 'The guide page is useful for some people who entered the project for the first time. You can briefly introduce the features of the project. Demo is based on ',
    button: 'Show Guide'
  },
  components: {
    documentation: 'Documentation',
    tinymceTips: 'Rich text editor is a core part of management system, but at the same time is a place with lots of problems. In the process of selecting rich texts, I also walked a lot of detours. The common rich text editors in the market are basically used, and the finally chose Tinymce. See documentation for more detailed rich text editor comparisons and introductions.',
    dropzoneTips: 'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
    stickyTips: 'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1: 'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2: 'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips: 'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.'
  },
  table: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    title: 'Title',
    importance: 'Imp',
    type: 'Type',
    remark: 'Remark',
    search: 'Search',
    add: 'Add',
    export: 'Export',
    reviewer: 'reviewer',
    id: 'ID',
    date: 'Date',
    author: 'Author',
    readings: 'Readings',
    status: 'Status',
    actions: 'Actions',
    detail: 'Detail',
    edit: 'Edit',
    updatePwd: 'Change Password',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm',
    preCharge: 'Pre-charge',
    paymentNotice: 'Payment Notice',
    print: 'Print',
    confirmPay: 'confirmed paid',
    linked: 'Association',
    bindUser: 'Bound owner',
    download: 'download'
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description: 'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction'
  },
  excel: {
    export: 'Export',
    selectedExport: 'Export Selected Items',
    placeholder: 'Please enter the file name(default excel-list)'
  },
  zip: {
    export: 'Export',
    placeholder: 'Please enter the file name(default file)'
  },
  pdf: {
    tips: 'Here we use window.print() to implement the feature of downloading pdf.'
  },
  theme: {
    change: 'Change Theme',
    documentation: 'Theme documentation',
    tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  },
  // 社区
  community: {
    communityNo: 'Property Identification Number',
    communityName: 'Community Name',
    communityAddress: 'Community Address', // 社区全址
    communityArea: 'Total Area', // 总面积(平方米)
    communityCoverArea: 'Coverage Area', // 覆蓋面積(平方米)
    communityNoCoverArea: 'No Coverage Area', // 無覆蓋面積(平方米)
    communityVerticalArea: 'Vertical Footprint', // 垂直佔用空間面積(平方米)
    communityShopsArea: 'Shop Area', // 商舖面積(平方米)
    communityHouseArea: 'Residential Area', // 住宅面積(平方米)
    communityAddressDirectionFirstValue: 'Address Direction 1', // 地址方向1
    communityAddressDirectionSecondValue: 'Address Direction 2', // 地址方向2
    communityAddressDirectionThirdValue: 'Address Direction 3', // 地址方向3
    communityAddressDirectionFourthValue: 'Address Direction 4', // 地址方向4
    communityAddressDirectionFirstTips: 'Address Direction 1 Prompt', // 地址方向1提示
    communityAddressDirectionSecondTips: 'Address Direction 2 Prompt', // 地址方向2提示
    communityAddressDirectionThirdTips: 'Address Direction 3 Prompt', // 地址方向3提示
    communityAddressDirectionFourthTips: 'Address Direction 4 Prompt', // 地址方向4提示
    communityBuildingArea: 'Construction Area', // 建筑面积
    communityCommonArea: 'Common Area', // 公用面积
    communityContacts: 'Contact', // 联系人
    communityContactsPhone: 'Contact Number', // 联系人号码
    communityGarageArea: 'Garage Area', // 车库面积
    communityGarageCount: 'Parking Apace Number', // 车位数量
    communityGreenarea: 'Green Area', // 绿化面积
    communityLocX: 'Community Latitude', // 社区纬度
    communityLocY: 'Community Longitude', // 社区经度
    communityManagementType: 'Management Type', // 管理类型(0普通管理1综合管理)
    communityRemark: 'Remarks', // 备注
    communityRoadArea: 'Road Area', // 道路面积
    communityRoomCount: 'Rooms Number', // 房间总数
    commonPdf: 'Public Part Of The Community', // 社区之公共部分
    communityShopsCount: 'Number of shops'
  },
  // 管理员
  administrator: {
    communityId: 'Community', // 社区id
    email: 'Email', // 邮箱
    managerId: 'id',
    name: 'Name', // 名字
    sex: 'Gender', // 性别0女1男
    type: 'Type', // 类型0普通管理员1超级管理员
    username: 'Username', // 用户名
    password: 'Password', // 密码
    portrait: 'Portrait',
    roleIds: 'Role'
  },
  // 建筑
  building: {
    buildingDirection: 'Building Direction', // 楼宇方向
    buildingId: 'ID', // buildingId
    buildingName: 'Building Name', // 楼宇名字
    buildingNo: 'Building Number', // 楼宇编号
    buildingStruct: 'Building Structure', // 楼宇结构
    communityId: 'Community', // 社区ID
    deleted: 'Logout', // 是否注销
    floorLowNum: 'Several Floors Downstairs', // 楼下几层
    floorUpNum: 'Several Floors Upstairs', // 楼上几层
    fullAddress: 'Building Address', // 楼宇全址
    floorList: 'Building floor',
    commonPdf: 'Public part of the building', // 楼宇之公共部分
    buildingChildList: 'Building subsection', // 楼宇子部分
    rosterPdf: "Owner's roster document",
    managementType: 'Management type' // 管理类型(0简单管理1综合管理)
  },
  // 单位
  unit: {
    unitChildRelativeProportion: 'Relative Parts Of A Hierarchical Building(One percent)', // 分层建筑物之子部分相对比(千分之一)
    buildingId: 'Building', // buildingId
    community: 'Community',
    unitCoveredArea: 'Coverage Area(Unit Square Meter)', // 覆盖面积大小(单位平方米)
    unitName: 'Unit Name', // 单元名字
    unitFullAddress: 'Address', // 全址
    unitId: 'ID', // unitId
    unitNo: 'Unit No', // 单位编号
    unitPosition: 'Position', // 位置(地下,一楼,二楼,三楼,户外.)
    unitPurpose: 'Use', // 用途
    unitRelativeProportion: 'Stratified Building Relative(One percent)', // 分层建筑物相对比(千分之一)
    unitStatus: 'Unit Status', // 单位状态0空置1租赁2装修中3入住
    unitType: 'Unit Type', // 单位类型1商铺2住宅3停车场
    unitTitle: 'Unit ownership',
    additionalCost: 'Additional Charges',
    alculationMethod: 'Calculation',
    billingMode: 'Charging Mode',
    describe: 'Amount',
    formula: 'Calculation Formula',
    itemName: 'Charge Item Name',
    itemNo: 'Charge Item No',
    lateDate: 'Late Gold Days',
    lateFee: 'Late Payment Rate',
    unitPrice: 'Calculate Unit Price',
    owner: 'Is there a main owner'
  },
  // 业主
  proprietor: {
    birthday: 'Birthday', // 出生日期
    communityId: 'Community', // 社区ID
    countryCode: 'Area Aode', // 区号
    createTime: 'Create Time', // 创建时间
    email: 'Email', // 邮编
    englishName: 'English Name', // 英文名字
    deleted: false, // 是否注销
    idCard: 'Identification Number', // 身份证号码
    marriageSystem: 'Marriage System', // 婚姻制度
    mateName: 'Spouse Name', // 配偶名字
    name: 'Name', // 名字
    portrait: 'Profile Picture', // 用户头像
    sex: 'Gender', // 性别(0女1男)
    tel: 'Phone Number', // 手机号
    updateTime: 'Update Time', // 更新时间
    userId: 'UserId', // 用户id
    username: 'Login Account', // 用户登录账号
    password: 'Password', // 密码
    userWithCommunities: 'Associated unit',
    bindCommunities: 'Binding community',
    advanceAmount: 'Advance receipt amount',
    owner: 'owner'
  },
  asset: {
    assetDescribe: 'Description', // 描述
    assetEnglishDescribe: 'Description（English）', // 描述（英文）
    assetEnglishName: 'Asset Name（English）', // 资产名字（英文）
    assetEnglishPosition: 'Location Information（English）', // 位置信息（英文）
    assetId: 'ID', // id
    assetName: 'Asset Name', // 资产名字
    assetPosition: 'Location Information', // 位置信息
    assetTraditionalDescribe: 'Description（Traditional Chinese）', // 描述（繁体）
    assetTraditionalName: 'Asset Name（Traditional Chinese）', // 资产名字（繁体）
    assetTraditionalPosition: 'Location Information（Traditional Chinese）', // 位置信息（繁体）
    assetType: 'Asset Type', // 资产类型：电器、公共设备
    community: 'Community',
    communityId: 'Community ID', // 社区ID
    assetMaintain: 'maintenance',
    assetMaintainRemindCycle: 'Maintenance cycle',
    assetBuyDate: 'Purchase date',
    assetStatus: 'status',
    assetNo: 'Asset Number',
    assetImage: 'Asset photo',
    assetOverdueDate: 'Warranty date'
  },
  notice: {
    buildingId: 'Building', // 建筑id
    communityId: 'Community ID', // 社区ID
    community: 'Community', // 社区ID
    createTime: 'Create Time', // 创建时间
    noticeDetails: 'Detail', // 详情
    noticeEnglishDetails: 'Detail（English）', // 详情英文
    noticeEnglishTitle: 'Bulletin Title（English）', // 公告标题
    noticeId: 'ID', // ID
    noticeImage: 'Image', // 图片
    noticeTitle: 'Bulletin Title', // 公告标题
    noticeTraditionalDetails: 'Detail（Traditional Chinese）', // 详情（繁体）
    noticeTraditionalTitle: 'Bulletin Title（Traditional Chinese）', // 标题
    noticeType: 'Notification Type', // 通知类型
    updateTime: 'Update Time', // 更新时间
    startTime: 'Start Time',
    endTime: 'End date',
    announcementDate: 'Announcement date'
  },
  event: {
    community: 'Community',
    communityId: 'Community ID', // 社区ID
    eventCause: 'Event Cause', // 事件起因
    eventContent: 'Event Content', // 事件内容
    eventDate: 'Event Date', // 事件日期
    eventFinishDate: 'Complete Time', // 完成时间
    eventId: 'ID', // ID
    eventRemark: 'Remark', // 备注
    eventSolve: 'Solution', // 解决方案
    eventStatus: 'Event Progress', // 事件进度
    eventType: 'Event Type', // 事件类型1采购2保养3其他
    eventRemindCycle: 'Reminder Cycle',
    eventChannel: 'Receiving channel',
    reportPdf: 'Event picture',
    reports: 'Report PDF',
    complainClassType: 'Complaint title',
    complainPosition: 'Complaint location',
    complainReply: 'Complaint progress response',
    complainSpecificPosition: 'Specific location',
    complainType: 'Type of complaint',
    assetNo: 'Asset Number'
  },
  adv: {
    adv: 'Advertisement',
    advId: 'ID', // ID
    building: 'Building',
    buildingId: 'Building ID', // 楼宇id
    community: 'Community', // 社区
    communityId: 'communityId', // communityId
    describe: 'Description', // 描述
    residenceTime: 'Play Time',
    title: 'Title', // title
    type: 'Advertisement Type', // 广告类型 0普通图片1视频
    url: 'Resource', // url
    used: 'Used', // 是否使用0否1是
    purpose: 'Announcement type',
    announcementDate: 'Announcement date'
  },
  complain: {
    complain: 'Complaint/Warranty',
    complainClassType: 'Classification', // 类型分类（供电系统，发电机…）
    complainDescribe: 'Description', // 描述
    complainFinishTime: 'Complete Time', // 完成时间
    complainHandler: 'Processing Person', // complainHandler
    community: 'Community',
    complainId: 'id', // complainId
    complainLiaisonsEmail: 'Contact Email',
    complainLiaisonsName: 'Contact', // complainLiaisonsName
    complainLiaisonsSex: 'Contact Gender', // 联络人性别(0女1男)
    complainPosition: 'Position', // complainPosition
    complainStatus: 'Status', // 状态:0发起1收到2处理中3处理完成
    complainType: 'Type', // 类型(土木工程，清洁，保安…)
    complainVoice: 'Voice', // example: E:/XXX/投诉.mp3
    createTime: 'Create Time', // createTime
    images: 'Image', // images 【】
    updateTime: 'Update Time', // updateTime
    userId: 'UserId',
    complainSpecificPosition: 'Specific Location' // complainSpecificPosition
  },
  visitor: {
    building: 'Building',
    buildingId: 'BuildingId', // 楼宇id
    community: 'Community', // 社区
    communityId: 'communityId', // communityId
    createTime: 'Create Time', // createTime
    updateTime: 'Update Time', // updateTime
    visitorCause: 'Access Reason', // visitorCause
    visitorId: 'id', // visitorId
    visitorName: 'Visitor Name', // visitorName
    visitorSex: 'Gender', // 性别0女1男
    visitorPhone: 'Contact Number', // visitorPhone
    visitorImage: 'image'
  },
  clubhouse: {
    community: 'Community',
    createTime: 'Create Time', // createTime
    updateTime: 'Update Time', // updateTime
    images: 'Image', // images 【】
    placeAdvanceOrderDay: 'Days In Advance', // 提前天数
    placeEndTime: 'End Time', // placeEndTime
    placeEnglishIntroduction: 'Introduction(English)', // 简介(英文)
    placeEnglishName: 'Place Name(English)', // 场所名字(英文)
    placeFarthestOrderDay: 'Maximum Number Of Days', // 最大天数
    placeId: 'id', // placeId
    placeIntroduction: 'Introduction(Simplified)',
    placeName: 'Place Name(Simplified)', // 场所名字(简体)
    placeNeedOrder: 'Book', // 需要预定(0否1是)
    placeStartTime: 'Start Time', // 起始时间
    placeStatus: 'Location Status', // 场所状态(0未开放1开放)
    placeTraditionalIntroduction: 'Introduction(Traditional Chinese)', // 简介(简体)
    placeTraditionalName: 'Place Name(Traditional Chinese)', // 场所名字(繁体)
    placeUpperLimit: 'Appointment Time Limit',
    placeIconType: 'Icon Type',
    placeCharge: 'Charge',
    placeAttachCharge: 'Cleaning fee'
  },
  charge: {
    recordActualAmount: 'Actual Amount Charged', // 实际收取金额
    recordAmount: 'Charge Amount', // 收费金额
    recordDate: 'Charge Record Year', // 收费记录年月份(2019-01)
    recordId: '', // recordId
    recordLateDate: 'Late Gold Days', // 滞纳金天数
    recordLateFee: 'Delayed Amount', // 滞纳金额
    recordRemark: 'Remark', // 备注
    recordStatus: 'Status', // 状态0欠费1已付2预支付
    recordTime: 'Charging Time', // 收费时间
    unitItemId: 'Unit Charge Item', // 单位收费项目
    userId: 'User', // 住户
    unitNo: 'Unit number'
  },
  chargeItem: {
    additionalCost: 'Additional Charges(Fund Fee)', // 额外费用(基金费用)
    alculationMethod: 'Calculation', // 计算方式0定额1公式
    billingMode: 'Charging Mode', // 收费模式0周期性1临时性
    communityId: 'Community Id', // 社区id
    community: 'Community', // 社区
    describe: 'Amount', // 金额
    formula: 'Calculation Formula', // 计算公式
    itemId: 'id', // itemId
    itemName: 'Charge Item Name', // 收费项目名字
    itemNo: 'Charge Item No', // 收费项目编号
    lateFee: 'Late Payment Rate', // 滞纳金率(单位:百分之一)
    unitPrice: 'Calculate Unit Price', // 计算单价
    lateDate: 'Days Of Late Start' // 滞纳开始天数
  },
  placeRecord: {
    attachCharge: 'additional fees',
    averageCharge: 'Hourly fee',
    communityId: 'community',
    createTime: 'Create Time', // createTime
    updateTime: 'Update Time', // updateTime
    orderDate: 'scheduled time',
    orderEndTime: 'End Time',
    orderStartTime: 'Start Time',
    place: 'place',
    recordStatus: 'Scheduled state',
    totalCharge: 'Total cost',
    totalHour: 'Total time',
    userId: 'user'
  }
}
