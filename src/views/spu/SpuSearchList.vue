<template>
	<div class=" mt-10 py-10">
		<div id="spu-list">
			<div class="containner">
				<div class="py-10 px-20 box-shadow rounded text-md">
					<!-- i就是你要选择的属性的下标，0个选择6gb-->
					搜索结果：
				</div>
			</div>
			<div class="containner mt-20 flex wrap item-start">
				<template v-for="(spu,si) in Spu.spu_list">
					<spu :spu="spu" @click="godetail(spu.spu_id)"></spu>
				</template>
			</div><!-- <input type="button" value="下一页" @click="nextPage()"> -->
		</div>
	</div>
</template>

<script>
	import Spu from '../../components/Spu.vue'
	import {mapState,mapMutations,mapActions} from 'vuex'
	export default {
		components:{Spu},
		data:function(){
			return{
				p:{}
			}
		},
		computed:{
			...mapState(['Spu'])
		},
		methods:{
			//跳转到详情页
			godetail(spu_id){
				this.$router.push("/spudetail/"+spu_id)
			},
			...mapMutations({set_SParams:'Spu/set_SParams'}),
			...mapActions({get_spu_list2:'Spu/get_spu_list_action2'}),
			// 滚动加载
			scrollload:function(){
				window.onscroll=()=>{
					// 滚动条滚动式距离顶部的距离
					var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
					// 变量windowHeight是可视区的高度
					var windowHeight = document.documentElement.clientHeight || document.body.clientHeight
					// 变量scrollHeight是滚动条的高度
					var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
					if(scrollTop+windowHeight>scrollHeight-1){
						// 滚动到底部获取下一页的内容
						let xstart = this.Spu.sparams.start+10
						// 获取当前的参数
						let p = this.Spu.sparams
						p.start = xstart
						// 重新设置参数
						this.set_SParams(p)
						this.get_spu_list2(p)
					}
				}
			}
		},
		mounted() {
			// 调用滚动加载
			this.scrollload()
		},
		created() {
			// 页面一创建就加载结果
			let searchparams={spu_name:this.search,start:0}
			this.set_SParams(searchparams)
			this.get_spu_list2(searchparams)
		}
	}
</script>

<style scoped="scoped">
	.spu-filter-name {
		width: 130px;
	}
	.spu-filter-group {
		width: 1000px;
		}
	.spu-filter-item.active,
	.spu-filter-item:hover {
		color: #e1251b;
	}
</style>
