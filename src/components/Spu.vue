<template>
	<div class="spu">
		<img :src="'http://127.0.0.1:8001/img/'+spu.attrKeyList[0].attrValueList[curr_i].value_images[0]" 
			class="hand" style="width: 220px; height: 220px;">
		<div class="flex item-start mt-10 spu-xxx">
			<button type="button" @click="nextPage()" class="spuxxxbtn">&lt;</button>
			<template v-for="(v,i) in spu.attrKeyList[0].attrValueList" :key="i">
				<img :src="'http://127.0.0.1:8001/img/'+v.value_images[0]" class="spu-sku hand" 
				:class="curr_i==i?'active':''" style="width: 25px; height: 25px;" @mouseover="qie(i)">
			</template>
		</div>
		<div class="mt-10 red text-xl text-left weight"> ￥{{spu.skuList[0].sku_price}} </div>
		<div class="mt-10 dark text-xs text-left hand hover-red"> {{spu.spu_name}} </div>
	</div>
</template>

<script>
	import $ from 'jquery'
	export default {
		props:['spu'],
		data:function(){
			return{
				curr_i:0 ,//当期默认选中的第几个规格的图
				page:0,//默认动了0次
			}
		},
		methods:{
			qie:function(i){
				// console.log(i)
				this.curr_i=i
			},
			//切缩略图
			nextPage:function(){
				//获取一共多少个缩略图length
				let length=this.spu.attrKeyList[0].attrValueList.length;
				//这么些缩略图一共有几页max
				let max=Math.ceil(length/6)
				//$(event.target)代表的是当前点击的按钮
				//至少是两页才需要移动
				if(max>=2){
					//页面动的次数加了一次
					this.page++;//3
					//如果动的次数小于页码数，就可以动
					if(this.page<max){
						$(event.target).parent().animate({"margin-left":"-=213px"})
					}else{
						//归零
						this.page=0;
						$(event.target).parent().animate({"margin-left":"0px"})
					}
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.spu{
		position: relative;
	}
	.spuxxxbtn{
		position: absolute;
		right: 0px;
		height: 33px;
		border: none;
		width: 17px;
		cursor: pointer;
		border-radius: 3px;
		color: #fff;
	}
	.spuxxxbtn:hover{
		background-color: #888;
	}
	.spu {
		padding: 5px;
		width: 220px;
		margin: 5px;
		overflow: hidden;
	}
	
	.spu:hover {
		box-shadow: 0px 0px 5px #ccc;
	}
	
	.spu-sku {
		border: 2px solid #ccc;
		padding: 2px;
		margin-right: 2px;
	}
	
	.spu-sku.active {
		border: 2px solid #e1251b;
	}
</style>

