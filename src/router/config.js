import TabsView from '@/layouts/tabs/TabsView'
// import BlankView from '@/layouts/BlankView'
import PageView from '@/layouts/PageView'

// 路由配置
const options = {
	routes: [{
		path: '/login',
		name: '登录页',
		component: () => import('@/pages/login')
	}, {
		path: '/register',
		name: 'register',
		component: () => import('@/views/register/index')
	}, {
		path: '*',
		name: '404',
		component: () => import('@/pages/exception/404'),
	}, {
		path: '/403',
		name: '403',
		component: () => import('@/pages/exception/403'),
	}, {
		path: '/',
		name: '首页',
		component: TabsView,
		redirect: '/login',
		children: [{
			path: 'home',
			name: 'home',
			meta: {
				icon: 'home',
				page: {
					closable: false
				}
			},
			component: () => import('@/views/home/index')
		}, {
			path: 'orderManage',
			name: '订单管理',
			meta: {
				icon: 'profile'
			},
			component: PageView,
			children: [{
				path: 'orderList',
				name: '订单管理',
				component: () => import('@/views/order-manage/order/index')
			}, {
				path: 'comments',
				name: '评价管理',
				component: () => import('@/views/order-manage/comments/index')
			}, {
				path: 'complaints',
				name: '投诉管理',
				component: () => import('@/views/order-manage/complaints/index')
			}, {
				path: 'orderDetail/:id',
				name: '订单详情',
				meta: {
					invisible: true
				},
				component: () => import('@/views/order-manage/order-detail/index')
			}]
		}, {
			path: 'workerManage',
			name: '护工管理',
			meta: {
				icon: 'user'
			},
			component: PageView,
			children: [{
				path: 'list',
				name: '护工列表',
				component: () => import('@/views/worker/list/index')
			}, {
				path: 'group',
				name: '护工小组',
				component: () => import('@/views/worker/group/index')
			}, {
				path: 'perfectly/:id',
				name: '完善信息',
				meta: {
					invisible: true
				},
				component: () => import('@/views/worker/perfectly/index')
			}, {
				path: 'teamOrders/:id',
				name: '小组订单',
				meta: {
					invisible: true
				},
				component: () => import('@/views/worker/teamOrders/index')
			}, {
				path: 'deposit',
				name: '押金管理',
				component: () => import('@/views/worker/deposit/index')
			}, {
				path: 'disciplinary',
				name: '护工奖惩记录',
				component: () => import('@/views/worker/disciplinary/index')
			}, {
				path: 'borrow',
				name: '借款管理',
				component: () => import('@/views/worker/borrow/index')
			}, {
				path: 'references',
				name: '介绍人报表',
				component: () => import('@/views/worker/references/index')
			}]
		}, {
			path: 'basicData',
			name: '基础数据管理',
			meta: {
				icon: 'shop'
			},
			component: PageView,
			children: [{
				path: 'hospital',
				name: '医院管理',
				component: () => import('@/views/basic-manage/hospital/index')
			}, {
				path: 'serve',
				name: '服务管理',
				component: () => import('@/views/basic-manage/serve/index')
			}, {
				path: 'employee',
				name: '员工管理',
				component: () => import('@/views/basic-manage/employee/index')
			}, {
				path: 'sickbed',
				name: '床位管理',
				component: () => import('@/views/basic-manage/bed/index')
			}, {
				path: 'basicinfo',
				name: '基本信息设置',
				component: () => import('@/views/basic-manage/basicInfo/index')
			}, {
				path: 'customer',
				name: '客户管理',
				component: () => import('@/views/basic-manage/customer/index')
			}, {
				path: 'customerDetails/:id',
				name: '客户详情',
				meta: {
					invisible: true
				},
				component: () => import('@/views/basic-manage/customerDetails/index')
			}]
		}, {
			path: 'statistics',
			name: '统计分析',
			meta: {
				icon: 'pie-chart'
			},
			component: PageView,
			children: [{
				path: 'waterTable',
				name: '流水表',
				component: () => import('@/views/statistics/waterTable/index')
			}, {
				path: 'income',
				name: '收入详情',
				component: () => import('@/views/statistics/income/index')
			}, {
				path: 'dispatch',
				name: '派工一览',
				component: () => import('@/views/statistics/dispatch/index')
			}, {
				path: 'department',
				name: '科室统计',
				component: () => import('@/views/statistics/department/index')
			}, {
				path: 'departmentDetails/:id',
				name: '科室详情',
				meta: {
					invisible: true
				},
				component: () => import('@/views/statistics/departmentDetails/index')
			}, {
				path: 'settlement',
				name: '结算统计',
				component: () => import('@/views/statistics/settlement/index')
			}, {
				path: 'advance',
				name: '预收统计',
				component: () => import('@/views/statistics/advance/index')
			}, {
				path: 'attendance',
				name: '考勤表',
				component: () => import('@/views/statistics/attendance/index')
			}, {
				path: 'dailyReport',
				name: '日报表',
				component: () => import('@/views/statistics/dailyReport/index')
			}, {
				path: 'fieldWork',
				name: '现场工作情况',
				component: () => import('@/views/statistics/fieldWork/index')
			}]
		}, {
			path: 'collect',
			name: '分账统计',
			meta: {
				icon: 'shopping-cart'
			},
			component: PageView,
			children: [{
				path: 'interimSettle',
				name: '中期结算',
				component: () => import('@/views/collect/interimSettle')
			}, {
				path: 'incomeDetails',
				name: '收入明细',
				meta: {
					invisible: true
				},
				component: () => import('@/views/collect/incomeDetails')
			}, {
				path: 'incomeConfirm',
				name: '确认收入预览',
				meta: {
					invisible: true
				},
				component: () => import('@/views/collect/incomeConfirm')
			}, {
				path: 'salary',
				name: '生成薪资',
				component: () => import('@/views/collect/salary')
			}, {
				path: 'salaryDetails/:id/:type', // type: edit修改 view查看 audit审核 pay发放
				name: '薪资明细',
				meta: {
					invisible: true
				},
				component: () => import('@/views/collect/salaryDetails')
			}, {
				path: 'salaryAudit',
				name: '薪资审核',
				component: () => import('@/views/collect/salaryAudit')
			}, {
				path: 'payroll',
				name: '薪资发放',
				component: () => import('@/views/collect/payroll')
			}, {
				path: 'payback',
				name: '薪资补发',
				component: () => import('@/views/collect/payback')
			}]
		}, {
			path: 'roleManage',
			name: '角色权限管理',
			meta: {
				icon: 'usergroup-add'
			},
			component: PageView,
			children: [{
				path: 'role',
				name: '角色管理',
				component: () => import('@/views/role-manage/role/index')
			}, {
				path: 'permission/:id/:type', // add新增 edit编辑
				name: '角色权限',
				meta: {
					invisible: true
				},
				component: () => import('@/views/role-manage/permission/index')
			}]
		}
		// {
		// 	name: '示例',
		// 	path: 'demo',
		// 	meta: {
		// 		icon: 'windows'
		// 	},
		// 	component: () => import('@/views/demo/index')
		// }
	]
	}]
}

export default options
