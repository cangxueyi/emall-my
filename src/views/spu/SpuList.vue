<template>
	<h2>商品列表</h2>
	<div class=" mt-10 py-10">
		<div id="spu-list">
			<div class="containner">
				<div class="py-10 px-20 box-shadow rounded text-md">
					<template v-for="(key,i) in Spu.spuAttrList">
						<div class="spu-filter-row flex item-start my-10">
							<div class="spu-filter-name gray text-right">{{key.key_name}}：</div>
							<div class="spu-filter-group flex item-center wrap">
								<div class="spu-filter-item ml-10 gray hand" @click="shaixuan(i,null)" 
									:class="Spu.sx_value_list[i]==null?'active':''">全部</div>
								<template v-for="(val,j) in key.spuAttrValueList">
									<div class="spu-filter-item ml-20 gray hand" @click="shaixuan(i,val.id)" 
										:class="Spu.sx_value_list[i]==val.id?'active':''"> {{val.value_name}} </div>
								</template>
							</div>
						</div>
					</template>
				</div>
			</div>
			<div class="containner mt-20 flex wrap item-start">
					<template v-for=" (spu,si) in Spu.spu_list">
						<spu :spu="spu" @click="godetail(spu.spu_id)"></spu>
					</template>
			</div><!-- <input type="button" value="下一页" @click="nextPage()" /> -->
		</div>
	</div>
</template>

<script>
	import Spu from '../../components/Spu.vue'
	import {mapState,mapActions,mapMutations} from 'vuex'
	export default {
		data:function(){
			return{
				p:{}
			}
		},
		components:{Spu},
		props: ['cate_id'],
		computed: {
			//将spu模块的数据映射到当前的计算属性，等于我们当前组件中有计算属性
			...mapState(['Spu'])
		},
		methods: {
			//将Spu这个模块中的actions映射到当期的函数中来，起个名字叫get_spu_list
			//就相当于是当期的methods中有一个函数get_spu_list
			// 获取滚动列表
			...mapActions({get_spu_list: 'Spu/get_spu_list_action'}),
			...mapActions({get_spu_list2:'Spu/get_spu_list_action2'}),
			...mapActions({get_spu_attrlist: 'Spu/get_spu_attrlist'}),
			//当前的methods中也有get_spu_attrlist这个方法
			//当前有个函数叫set_params 对应就是Spu模块中的那个set_Paramsmutation
			...mapMutations({set_params: 'Spu/set_Params'}),
			...mapMutations({set_spulist_null:'Spu/set_spulist_null'}),
			shaixuan:function(i,value_id){
				// 重新搜索要清空数据
				this.Spu.spu_list = []
				// 更新数组，下标i改为value_id
				this.Spu.sx_value_list[i] = value_id
				let valueList = ''
				for(let v of this.Spu.sx_value_list){
					if(v!=null){
						valueList+=','+v
					}
				}
				valueList = valueList.substr(1)
				// 调用获取所有的结果
				this.p = {
					cate_id:this.cate_id,
					start:0,
					valueList:valueList
				}
				// 获取一次结果
				this.get_spu_list2(this.p)
			},
			// 跳转详情页
			godetail(spu_id){
				this.$router.push("/spudetail/"+spu_id)
			}
			// nextPage:function(){
			// 	// 下一页 将起始位置+长度10(每页显示10条)
			// 	let xstart = this.Spu.params.start+10
			// 	let p = {cate_id:this.cate_id,start:xstart}
			// 	this.set_params(p)
			// 	// 再次调用 获取下一页的商品列表
			// 	this.get_spu_list(this.Spu.params)
			// }
		},
		mounted:function(){
			window.onscroll=()=>{
				//滚动条滚动的时候距离顶部的距离
				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
				//变量windowHeight是可视区的高度
				var windowHeight = document.documentElement.clientHeight || document.body.clientHeight
				//变量scrollHeight是滚动条的总高度
				var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
				if(scrollTop+windowHeight>scrollHeight-1){
					// 到底部，重新获取下一页的
					let xstart = this.Spu.params.start+10
					this.p.start = xstart
					this.set_params(this.p)
					this.get_spu_list2(this.Spu.params)
				}
			}
		},
		created: function() {
			//一进页面 我就想获取商品列表及筛选信息
			//封装当前要的参数
			let canshu = {
				cate_id: this.cate_id,
				start: 0
			}
			//因为参数保存在了模块中，所以我们将模块值设置一下
			this.set_params(canshu)
			// console.log(this.Spu.params)
			//根据参数获取商品列表
			this.get_spu_list2(this.Spu.params)
			let p2 = {
				cate_id: this.cate_id,
				key_issku: 0,
				key_ishigh: 0
			}
			this.set_spulist_null()
			this.get_spu_attrlist(p2)
			//获取筛选属性列表
		},
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
