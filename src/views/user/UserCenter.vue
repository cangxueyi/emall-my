<template>
	<h1>用户中心</h1>
	<div class=" mt-10 py-10">
		<h2>用户电话：{{User.loginuser.user_phone}}</h2>
		<h2>用户昵称：{{User.loginuser.user_name}}</h2>
		<h2>创建时间：{{User.loginuser.createtime}}</h2>
	</div>
</template>

<script>
	import {mapState,mapActions} from 'vuex'
	export default {
		computed:{
			...mapState(['User'])
		},
		methods:{
			...mapActions({get_loginuser:'User/get_loginuser'})
		},
		created(){
			this.get_loginuser()
		}
		
	}
</script>

<style>
</style>
