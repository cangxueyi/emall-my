import {
	createRouter,
	createWebHistory
} from 'vue-router'
import Index from '../views/Index.vue'
import SpuList from '../views/spu/SpuList.vue'
import SpuSearchList from '../views/spu/SpuSearchList.vue'
import SpuDetail from '../views/spu/SpuDetail.vue'
import Login from '../views/user/Login.vue'
import Regist from '../views/user/Regist.vue'
import UserCenter from '../views/user/UserCenter.vue'
import Address from '../views/user/Address.vue'
import Cart from '../views/other/Cart.vue'
import CommitOrder from '../views/other/CommitOrder.vue'
import OrderList from '../views/other/OrderList.vue'
import OrderDetail from '../views/other/OrderDetail.vue'
const routes = [{
		path: '/',
		component: Index
	},
	{
		path: '/spulist/:cate_id',
		component: SpuList,
		props: true
	},
	{
		path: '/spusearch',
		component: SpuSearchList
	},
	{
		path: '/spudetail/:spu_id',
		component: SpuDetail,
		props: true
	},
	{
		path: '/login',
		component: Login
	},
	{
		path: '/regist',
		component: Regist
	},
	// 需要登录的页面都加上pri
	{
		path: '/pri/usercenter',
		component: UserCenter
	},
	{
		path:'/pri/customer/address',
		component:Address
	},
	{
		path:'/pri/customer/cart',
		component:Cart
	},
	{
		path:'/pri/customer/comorder',
		component:CommitOrder
	},
	{
		path:'/pri/customer/order',
		component:OrderList
	},
	{
		path:'/pri/customer/orderdetail/:oid',
		component:OrderDetail,
		props:true
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach((to, from, next) => {
	//这个位置 过滤能否访问某些页面
	//获取sessionStorage中的值
	let token = window.sessionStorage.getItem('token')
	//如果是登录页面，就正常访问
	//当前你准备访问的路径to.path
	let path = to.path
	// console.log(path=='/login')
	//如果访问的路径是login的话 就直接放行
	//当前页面是login的话 就正常访问login页面
	if (path.indexOf('/pri/')>=0) {
		if(!token){
			alert("请先登录")
			return next('/login')
		}
	}
	//如果是其他页面，全部都需要登录
	// console.log(token)
	//token为空的话就是没有登录 没有登陆就跳转到登录页面

	//没有token !token
	/* if(token==null){
		return next("/login")
	} */
	//代表token中没有值 就跳到登录页面
	
	// console.log(token)
	//正常访问
	next()
})
export default router
