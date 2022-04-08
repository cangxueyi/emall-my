<template>
	<div class=" mt-10 py-10">
		<div id="spu">
			<div class="containner flex justify-between item-start">
				<div class="spu-ablum-bar">
					<template v-if="spu.attrKeyList">
						<img :src="'http://127.0.0.1:8001/img/'+spu.attrKeyList[0].attrValueList[curr_arr[0]].value_images[curr_i]"
							class="rounded hand" style="width: 450px; height: 450px;">
						<div class="mt-10 spu-ablum-group flex item-center">
							<div class="spu-ablum-left hand">&lt;</div>
							<div class="spu-ablum-center">
								<table border="0px" cellpadding="0px" cellspacing="0px">
									<tr>
										<template v-for="(tu,i) in spu.attrKeyList[0].attrValueList[curr_arr[0]].value_images">
											<td>
												<img :src="'http://127.0.0.1:8001/img/'+tu"
													class="spu-ablum-item hand" :class="curr_i==i?'active':''"
													style="width: 90px; height: 90px;" @click="jixuqie(i)">
											</td>
										</template>
									</tr>
								</table>
							</div>
							<div class="spu-ablum-right hand">&gt;</div>
						</div>
					</template>
				</div>
				<div class="spu-info-bar">
					<div class="text-left text-xl bold dark">{{sys_sku.sku_name}}</div>
					<div class="text-left text-xl mt-10">
						<span class="red weight">现价：</span>
						<span class="red weight sku-price">￥{{sys_sku.sku_originalprice}}</span>
						<span class="gray bold text-md ml-20">原价：</span>
						<span class="gray bold sku-original-price">￥{{sys_sku.sku_price}}</span>
					</div>
					<div class="text-left bold gray text-lg my-20"> 库存：{{sys_sku.sku_quanity}}</div>
					<template v-for="(key,ki) in spu.attrKeyList" :key="ki">
						<div class="flex item-start sku-attr my-5">
							<div class="sku-attr-name text-left gray text-lg bold">{{key.key_name}}</div>
							<div class="sku-attr-group flex wrap item-center">
								<template v-for="(val,vi) in key.attrValueList">
									<div class="sku-attr-item gray bold text-md rounded hand pr-10 my-5 flex item-center mx-5" 
										:class="curr_arr[ki]==vi?'active':''" @click="qie(ki,vi,key_id,value_id,spu_id)">
										<template v-if="val.value_images.length!=0">
											<img :src="'http://127.0.0.1:8001/img/'+val.value_images[0]" class="hand" 
												style="width: 34px; height: 34px;">
										</template>
										<div>{{val.value_name}}</div>
									</div>
								</template>
							</div>
						</div>
					</template>
					<div class="mt-20 flex item-center">
						<input type="number" min="1" class="buy-number hand" v-model="buynum">
						<button class="btn-cart hand mx-20" @click="addCart">加入购物车</button>
						<button class="btn-buy hand">立即购买</button>
					</div>
				</div>
			</div>
			<div class="containner mt-20">
				<div class="px-20 py-20 rounded box-shadow">
					<img src="../../assets/img/xiangqing.jpg">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {addCart} from '../../api/OrderApi.js'
	import {get_one_spu} from '../../api/SpuApi.js'
	export default {
		props: ['spu_id'],
		data: function() {
			return {
				//当期得到的数据
				spu: {},
				curr_arr:[],
				curr_i:0,
				curr_sku:[],
				// 当前选中的sku
				sys_sku:{},
				buynum:1
			}
		},
		created() {
			this.get_spu()
		},
		methods: {
			get_spu: async function() {
				//调用接口 获取商品对象
				let res = await get_one_spu("/spu/" + this.spu_id)
				this.spu = res.data.data
				for(let v of this.spu.attrKeyList){
					this.curr_arr.push(0)
					// 给当前选择的sku一个默认选中的key_id和value_id
					this.curr_sku.push({key_id:v.key_id,value_id:v.attrValueList[0].value_id,spu_id:this.spu.spu_id})
				}
				this.checksku()
			},
			qie:function(ki,vi,pkey_id,pvalue_id,pspu_id){
				// 选择第几个属性的第几个值
				this.curr_arr[ki]=vi
				//点击切，给继续切 归零
				this.curr_i=0;
				this.curr_sku[ki]={key_id:pkey_id,value_id:pvalue_id,spu_id:pspu_id}
				this.checksku()
			},
			jixuqie:function(i){
				this.curr_i=i
			},
			checksku:function(){
				for(let sku of this.spu.skuList){
					let skuattr=JSON.parse(sku.sku_spuattr)
					let flag=0
					for(let i=0;i<skuattr.length;i++){
						if(this.curr_sku[i]!=null){
							if(this.curr_sku[i].value_id!=skuattr[i].value_id){
								flag=1
								break
							}
						}
					}
					if(flag==0){
						this.sys_sku=sku
					}
				}
			},
			addCart:function(){
				// 封装一下加入购物车所需要的参数
				let params={
					cart_spuid:this.sys_sku.sku_spu_id,
					cart_name:this.sys_sku.sku_name,
					cart_skuid:this.sys_sku.sku_id,
					cart_sku:this.sys_sku.sku_spuattr,
					cart_thumburl:this.spu.attrKeyList[0].attrValueList[this.curr_arr[0]].value_images[0],
					cart_price:this.sys_sku.sku_price,
					cart_count:this.buynum
				}
				// 调用接口，传参 加入购物车
				addCart(params).then(function(res){
					console.log(res.data)
					if(res.data.httpcode==200){
						alert("加入购物车成功")
					}
				})
			}
		}
	}
</script>

<style scoped="scoped">
	/*商品详情----------------------------------*/
				/*  商品相册栏  */
	  .spu-ablum-bar {
	    width: 452px;
	  }
	  .spu-ablum-group {
	    color: #ccc;
	    font-size: 24px;
	    font-weight: 900;
	    text-align: center;
	  }
	  .spu-ablum-left,
	  .spu-ablum-right {
	    width: 20px;
	  }
	  .spu-ablum-center {
	    width: 410px;
	    overflow: hidden;
	  }
	  .spu-ablum-item {
	    border: 2px solid transparent;
	    margin: 0px 3px;
	  }
	  .spu-ablum-item.active {
	    border: 2px solid #df3033;
	  }
	  /*  商品信息栏  */
	  .spu-info-bar {
	    width: 740px;
	  }
	  .sku-price {
	    font-size: 28px;
	  }
	  .sku-original-price {
	    text-decoration: line-through;
	  }
	  .sku-attr-name {
	    width: 100px;
	    height: 34px;
	    line-height: 34px;
	  }
	  .sku-attr-group {
	    width: 620px;
	  }
	  .sku-attr-item {
	    border: 2px solid #eee;
	    height: 34px;
	    line-height: 34px;
	  }
	  .sku-attr-item.active {
	    border: 2px solid #df3033;
	  }
	  .buy-number {
	    outline: none;
	    padding: 6px 15px;
	    width: 40px;
	    border: 1px solid #df3033;
	  }
	  .btn-cart,
	  .btn-buy {
	    outline: none;
	    padding: 5px 15px;
	    border: 1px solid #c33;
	    background-color: #c33;
	    color: #fff;
	  }
	  .btn-cart:hover,
	  .btn-buy:hover {
	    background-color: #d33;
	  }
</style>

 