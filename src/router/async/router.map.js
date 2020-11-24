// 视图组件
const view = {
	tabs: () => import('@/layouts/tabs'),
	blank: () => import('@/layouts/BlankView'),
	page: () => import('@/layouts/PageView')
}

// 路由组件注册
const routerMap = {
	login: {
		authority: '*',
		path: '/login',
		component: () => import('@/pages/login')
	},
	root: {
		path: '/',
		name: '首页',
		redirect: '/login',
		component: view.tabs
	},
	exp403: {
		authority: '*',
		name: 'exp403',
		path: '403',
		component: () => import('@/pages/exception/403')
	},
	exp404: {
		name: 'exp404',
		path: '404',
		component: () => import('@/pages/exception/404')
	},
	exp500: {
		name: 'exp500',
		path: '500',
		component: () => import('@/pages/exception/500')
	},
	home: {
		name: '首页',
		path: 'home',
		meta: {
			icon: 'home',
			page: {
				closable: false
			}
		},
		component: () => import('@/views/home/index')
	},
	orderManage: {
		name: '订单管理',
		path: 'orderManage',
		meta: {
			icon: 'profile'
		},
		component: view.page
	},
	orderList: {
		name: '订单管理',
		path: 'orderList',
		component: () => import('@/views/order-manage/order/index')
	},
	comments: {
		path: 'comments',
		name: '评价管理',
		component: () => import('@/views/order-manage/comments/index')
	},
	complaints: {
		path: 'complaints',
		name: '投诉管理',
		component: () => import('@/views/order-manage/complaints/index')
	},
	orderDetail: {
		path: 'orderDetail/:id',
		name: '订单详情',
		meta: {
			invisible: true
		},
		component: () => import('@/views/order-manage/order-detail/index')
	},
	workerManage: {
		path: 'workerManage',
		name: '护工管理',
		meta: {
			icon: 'user'
		},
		component: view.page
	},
	list: {
		path: 'list',
		name: '护工列表',
		component: () => import('@/views/worker/list/index')
	},
	group: {
		path: 'group',
		name: '护工小组',
		component: () => import('@/views/worker/group/index')
	},
	perfectly: {
		path: 'perfectly/:id',
		name: '完善信息',
		meta: {
			invisible: true
		},
		component: () => import('@/views/worker/perfectly/index')
	},
	teamOrders: {
		path: 'teamOrders/:id',
		name: '小组订单',
		meta: {
			invisible: true
		},
		component: () => import('@/views/worker/teamOrders/index')
	},
	deposit: {
		path: 'deposit',
		name: '押金管理',
		component: () => import('@/views/worker/deposit/index')
	},
	disciplinary: {
		path: 'disciplinary',
		name: '护工奖惩记录',
		component: () => import('@/views/worker/disciplinary/index')
	},
	borrow: {
		path: 'borrow',
		name: '借款管理',
		component: () => import('@/views/worker/borrow/index')
	},
	references: {
		path: 'references',
		name: '介绍人报表',
		component: () => import('@/views/worker/references/index')
	},
	basicData: {
		path: 'basicData',
		name: '基础数据管理',
		meta: {
			icon: 'shop'
		},
		component: view.page
	},
	hospital: {
		path: 'hospital',
		name: '医院管理',
		component: () => import('@/views/basic-manage/hospital/index')
	},
	serve: {
		path: 'serve',
		name: '服务管理',
		component: () => import('@/views/basic-manage/serve/index')
	},
	employee: {
		path: 'employee',
		name: '员工管理',
		component: () => import('@/views/basic-manage/employee/index')
	},
	sickbed: {
		path: 'sickbed',
		name: '床位管理',
		component: () => import('@/views/basic-manage/bed/index')
	},
	basicinfo: {
		path: 'basicinfo',
		name: '基本信息设置',
		component: () => import('@/views/basic-manage/basicInfo/index')
	},
	customer: {
		path: 'customer',
		name: '客户管理',
		component: () => import('@/views/basic-manage/customer/index')
	},
	customerDetails: {
		path: 'customerDetails/:id',
		name: '客户详情',
		meta: {
			invisible: true
		},
		component: () => import('@/views/basic-manage/customerDetails/index')
	},
	statistics: {
		path: 'statistics',
		name: '统计分析',
		meta: {
			icon: 'pie-chart'
		},
		component: view.page
	},
	waterTable: {
		path: 'waterTable',
		name: '流水表',
		component: () => import('@/views/statistics/waterTable/index')
	},
	income: {
		path: 'income',
		name: '收入详情',
		component: () => import('@/views/statistics/income/index')
	},
	dispatch: {
		path: 'dispatch',
		name: '派工一览',
		component: () => import('@/views/statistics/dispatch/index')
	},
	department: {
		path: 'department',
		name: '科室统计',
		component: () => import('@/views/statistics/department/index')
	},
	departmentDetails: {
		path: 'departmentDetails/:id',
		name: '科室详情',
		meta: {
			invisible: true
		},
		component: () => import('@/views/statistics/departmentDetails/index')
	},
	settlement: {
		path: 'settlement',
		name: '结算统计',
		component: () => import('@/views/statistics/settlement/index')
	},
	advance: {
		path: 'advance',
		name: '预收统计',
		component: () => import('@/views/statistics/advance/index')
	},
	attendance: {
		path: 'attendance',
		name: '考勤表',
		component: () => import('@/views/statistics/attendance/index')
	},
	dailyReport: {
		path: 'dailyReport',
		name: '日报表',
		component: () => import('@/views/statistics/dailyReport/index')
	},
	fieldWork: {
		path: 'fieldWork',
		name: '现场工作情况',
		component: () => import('@/views/statistics/fieldWork/index')
	},
	collect: {
		path: 'collect',
		name: '分账统计',
		meta: {
			icon: 'shopping-cart'
		},
		component: view.page
	},
	interimSettle: {
		path: 'interimSettle',
		name: '中期结算',
		component: () => import('@/views/collect/interimSettle')
	},
	incomeDetails: {
		path: 'incomeDetails',
		name: '收入明细',
		meta: {
			invisible: true
		},
		component: () => import('@/views/collect/incomeDetails')
	},
	incomeConfirm: {
		path: 'incomeConfirm',
		name: '确认收入预览',
		meta: {
			invisible: true
		},
		component: () => import('@/views/collect/incomeConfirm')
	},
	salary: {
		path: 'salary',
		name: '生成薪资',
		component: () => import('@/views/collect/salary')
	},
	salaryDetails: {
		path: 'salaryDetails/:id/:type', // type: edit修改 view查看 audit审核 pay发放
		name: '薪资明细',
		meta: {
			invisible: true
		},
		component: () => import('@/views/collect/salaryDetails')
	},
	salaryAudit: {
		path: 'salaryAudit',
		name: '薪资审核',
		component: () => import('@/views/collect/salaryAudit')
	},
	payroll: {
		path: 'payroll',
		name: '薪资发放',
		component: () => import('@/views/collect/payroll')
	},
	payback: {
		path: 'payback',
		name: '薪资补发',
		component: () => import('@/views/collect/payback')
	},
	roleManage: {
		path: 'roleManage',
		name: '角色权限管理',
		meta: {
			icon: 'usergroup-add'
		},
		component: view.page
	},
	role: {
		path: 'role',
		name: '角色管理',
		component: () => import('@/views/role-manage/role/index')
	},
	permission: {
		path: 'permission/:id/:type', // add新增 edit编辑
		name: '角色权限',
		meta: {
			invisible: true
		},
		component: () => import('@/views/role-manage/permission/index')
	}
}
export default routerMap

