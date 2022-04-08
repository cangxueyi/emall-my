<template>
	<div class="navbar">
		<div class="containner flex item-center justify-between">
			<div class="navbar-left flex item-center text-sm">
				<router-link to="/" aria-current="page" 
					class="router-link brand red router-link-exact-active router-link-active">学掌门商城</router-link>
			</div>
			<div class="navbar-right flex item-center justify-end">
				<router-link v-if="!User.loginuser.user_name" to="/login" class="router-link text-sm gray hover-red">你好，请登录 </router-link>
				<span v-if="User.loginuser.user_name">
					欢迎你{{User.loginuser.user_name}}
					<a href="#" class="router-link text-sm gray hover-red" @click.prevent="exit">退出</a>
				</span>
				<div class="navbar-seperate"></div><router-link to="/regist" class="router-link text-sm red">免费注册</router-link>
				<div class="navbar-seperate"></div><router-link to="/pri/customer/order" class="router-link text-sm gray hover-red">我的订单</router-link>
				<div class="navbar-seperate"></div><router-link to="/pri/usercenter" class="router-link text-sm gray hover-red">我的会员</router-link>
				<div class="navbar-seperate"></div><router-link to="/pri/customer/address" class="router-link text-sm gray hover-red">收货信息</router-link>
				<div class="navbar-seperate"></div><router-link to="" class="router-link text-sm gray hover-red">客户服务</router-link>
				<div class="navbar-seperate"></div><router-link to="" class="router-link text-sm gray hover-red">网站导航</router-link>
				<div class="navbar-seperate"></div><router-link to="/" class="router-link text-sm gray hover-red">手机学掌门</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		computed:{
			...mapState(['User'])
		},
		methods:{
			...mapMutations({
				set_loginuser: "User/set_loginuser"
			}),
			exit:function(){
				// sessionStorage清空
				window.sessionStorage.clear()
				// vuex登录信息清空
				this.set_loginuser({})
				// 跳到登录页面
				this.$router.push('/login')
			}
		},
		mounted:function() {
			// 如果sessionStorage中有值
			let username=window.sessionStorage.getItem('user_name')
			let uu = {user_name:username}
			this.set_loginuser(uu)
		}
	}
</script>

<style scoped="scoped">
	/*  导航栏部分样式  */
	.navbar{background-color:#e3e4e5; padding: 4px 0px;}
	.brand{margin-left:20px; font-size:16px; font-weight:600;}
	.navbar-seperate{width:1px; background-color:#ccc; height:10px; margin:0px 10px;}
	
</style>
