<template>
	<div class="search-bar containner flex justify-between item-center mt-20">
		<router-link to="/">
			<img src="../assets/img/logo.png" style="width: 140px;">
		</router-link>
		<div class="search-bar-center">
			<div class="flex item-center justify-center">
				<div class="flex item-center">
					<input type="text" placeholder="商品名称、品牌、分类、规格属性……" class="search-bar-input" v-model="search">
					<button class="search-bar-btn hand" @click="sousou">搜索</button>
				</div>
				<button class="search-bar-cart hand ml-20" @click="gocart()">我的购物车</button>
			</div>
			<div class="search-bar-keywords flex justify-around item-center mt-10">
				<div class="hand hover-red red text-sm">春日环游记</div>
				<div class="hand hover-red gray text-sm">iphone 12</div>
				<div class="hand hover-red gray text-sm">小米</div>
				<div class="hand hover-red gray text-sm">榴莲尝鲜</div>
				<div class="hand hover-red gray text-sm">生鲜五折</div>
				<div class="hand hover-red gray text-sm">品质家电</div>
				<div class="hand hover-red gray text-sm">新品激光</div>
				<div class="hand hover-red gray text-sm">春茶</div>
				<div class="hand hover-red gray text-sm">正品农贸</div>
				<div class="hand hover-red gray text-sm">嗨9购了</div>
				<div class="hand hover-red gray text-sm">鱼人节好物</div>
			</div>
			<div class="flex justify-between item-center mt-20">
				<div class="hand hover-red red text-lg">秒杀</div>
				<div class="hand hover-red gray text-lg">优惠券</div>
				<div class="hand hover-red gray text-lg">学掌门会员</div>
				<div class="hand hover-red gray text-lg">品牌闪购</div>
				<div class="hand hover-red gray text-lg">拍卖</div>
				<div class="hand hover-red gray text-lg">家电数码</div>
				<div class="hand hover-red gray text-lg">超市日用</div>
				<div class="hand hover-red gray text-lg">蔬果生鲜</div>
				<div class="hand hover-red gray text-lg">国际好货</div>
				<div class="hand hover-red gray text-lg">潮流服饰</div>
			</div>
		</div>
		<div class="search-bar-right"></div>
	</div>
</template>

<script>
import {mapActions,mapState,mapMutations} from 'vuex'
export default {
	data:function(){
		return{
			search:''
		}
	},
	computed:{
		...mapState(['Spu'])
	},
	methods:{
		gocart:function(){
			this.$router.push("/pri/customer/cart")
		},
		sousou:function(){
			// 获取搜索的标题
			this.Spu.spu_list=[]
			// 根据搜索的标题进行查询
			let searchparams={spu_name:this.search,start:0}
			this.set_SParams(searchparams)
			this.get_spu_list2(searchparams)
			this.$router.push("/spusearch")
		},
		...mapActions({get_spu_list2:'Spu/get_spu_list_action2'}),
		...mapMutations({set_SParams:'Spu/set_SParams'})
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="scoped">
/*  搜索栏部分样式  */
	.search-bar-right{width:140px;}
	.search-bar-center{ width:780px;}
	.search-bar-input{padding:8px 15px; border:1px solid #e1251b; outline:none; border-radius:6px 0px 0px 6px; width:425px; color:#999;}
	.search-bar-btn{ width:58px; height:33px; background-color:#e1251b; border-radius:0px 6px 6px 0px; outline:none; border:0px; color:#fff;}
	.search-bar-btn:hover{background-color:#ef452b;}
	.search-bar-cart{width:128px; height:31px;  border-radius:6px; outline:none; border:1px solid #ddd; color:#ef452b; background-color:transparent;}
	.search-bar-cart:hover{border:1px solid #e1251b; color:#ef452b}
	.search-bar-keywords{width:640px;}
</style>
