<template>
	<div class="containner">
		<div class="py-10 px-20 box-shadow rounded text-md">
			<h4>我的收货地址</h4>
			<table border="1" class="list" cellpadding="0" cellspacing="0">
				<tr>
					<th>默认</th>
					<th>收件人</th>
					<th>手机号</th>
					<th>省</th>
					<th>市</th>
					<th>区</th>
					<th>详细地址</th>
					<th>其他</th>
				</tr>
				<template v-for="(add,i) in addresslist">
					<tr>
						<td>
							<span v-if="add.uaddr_isdefault==1">
								<button class="moren" disabled="disabled">默认地址</button>
							</span>
						</td>
						<td>{{add.uaddr_name}}</td>
						<td>{{add.uaddr_phone}}</td>
						<td>{{add.uaddr_province}}</td>
						<td>{{add.uaddr_city}}</td>
						<td>{{add.uaddr_district}}</td>
						<td>{{add.uaddr_address}}</td>
						<td>
							<button class="success" @click="bianji(add)">编辑</button>
							<button class="danger" @click="shanchu(add.uaddr_id)">删除</button>
						</td>
					</tr>
				</template>
			</table>
			<button @click="xianshi()">添加地址</button>
			<table v-if="addshow">
				<tr>
					<td>收件人姓名</td>
					<td>
						<input v-model="addaddress.uaddr_name" />
					</td>
				</tr>
				<tr>
					<td>收件人手机号</td>
					<td>
						<input v-model="addaddress.uaddr_phone" />
					</td>
				</tr>
				<tr>
					<td>请选择</td>
					<td>
						<select v-model="sheng" @change="getshilist">
							<option value="-1">-请选择省-</option>
							<template v-for="(provice,i) in shenglist">
								<option :value ="provice.id">{{provice.name}}</option>
							</template>
						</select>
						<select v-model="shi" @change="getqulist">
							<option value="-2">-请选择市-</option>
							<template v-for="(city,i) in shilist">
								<option :value ="city.id">{{city.name}}</option>
							</template>
						</select>
						<select v-model="qu" @change="getqutext">
							<option value="-3">-请选择区-</option>
							<template v-for="(qu,i) in qulist">
								<option :value ="qu.id">{{qu.name}}</option>
							</template>
						</select>
					</td>
				</tr>
				<tr>
					<td>详细地址</td>
					<td>
						<textarea v-model="addaddress.uaddr_address"></textarea>
					</td>
				</tr>
				<tr>
					<td>是否默认</td>
					<td>
						<input type="checkbox" v-model="uaddr_isdefault" value="1" />
					</td>
				</tr>
				<tr>
					<td>
						<input @click="addAddress" type="button" value="添加地址提交" />
					</td>
				</tr>
			</table>
			<!-- 修改的table -->
			<table v-if="updateshow">
				<tr>
					<td>收件人姓名</td>
					<td>
						<input v-model="addaddress.uaddr_name" />
					</td>
				</tr>
				<tr>
					<td>收件人手机号</td>
					<td>
						<input v-model="addaddress.uaddr_phone" />
					</td>
				</tr>
				<tr>
					<td>选择</td>
					<td>
						<input type="text" readonly="readonly" v-model="addaddress.uaddr_province" />
						<input type="text" readonly="readonly" v-model="addaddress.uaddr_city" />
						<input type="text" readonly="readonly" v-model="addaddress.uaddr_district" />
						<hr />
						<select v-model="sheng" @change="getshilist">
							<option value="-1">-请选择省-</option>
							<template v-for="(provice,i) in shenglist">
								<option :value ="provice.id">{{provice.name}}</option>
							</template>
						</select>
						<select v-model="shi" @change="getqulist">
							<option value="-2">-请选择市-</option>
							<template v-for="(city,i) in shilist">
								<option :value ="city.id">{{city.name}}</option>
							</template>
						</select>
						<select v-model="qu" @change="getqutext">
							<option value="-3">-请选择区-</option>
							<template v-for="(qu,i) in qulist">
								<option :value ="qu.id">{{qu.name}}</option>
							</template>
						</select>
					</td>
				</tr>
				<tr>
					<td>详细地址</td>
					<td>
						<textarea v-model="addaddress.uaddr_address"></textarea>
					</td>
				</tr>
				<tr>
					<td>是否默认</td>
					<td>
						<input type="checkbox" v-model="uaddr_isdefault" value="0"/>
					</td>
				</tr>
				<tr>
					<td>
						<input @click="updateAddress" type="button" value="更新地址" />
					</td>
				</tr>
			</table>
			
		</div>
	</div>
</template>

<script>
	import {getaddresslist,getxingzhengqu,adddizhi,updateAdd,delAdd} from '../../api/UserApi.js'
	export default {
		data:function(){
			return{
				addresslist:[], //所有地址的列表
				addaddress:{}, //选择具体的地址
				sheng:-1, 
				shi:-2,
				qu:-3,
				shenglist:[], //下拉地址列表
				shilist:[],
				qulist:[],
				uaddr_isdefault:false,
				addshow:false, //标记添加的文本框
				updateshow:false //标记修改的文本框
			}
		},
		created() {
			this.getalladdresslist() //获取所有的商品列表
			this.getshenglist() //获取所有的省
		},
		methods:{
			// 显示两个form表单
			xianshi(){
				this.addshow=true
				this.updateshow=false
			},
			// 获取所有的商品列表
			getalladdresslist(){
				// 调用封装的api
				getaddresslist().then((res)=>{
					this.addresslist=res.data.data
				})
			},
			// 获取省市区
			getshenglist(){
				getxingzhengqu({pid:0}).then((res)=>{
					this.shenglist = res.data.data
					// console.log(res.data)
				})
			},
			getshilist(){
				// 选中的内容
				let xzindex=event.target.selectedIndex
				this.addaddress.uaddr_province=event.target.options[xzindex].text
				this.shi = -2 //默认选中的市
				this.qu = -3
				this.addaddress.uaddr_city=""
				this.addaddress.uaddr_district=""
				getxingzhengqu({pid:this.sheng}).then((res)=>{
					this.shilist=res.data.data
				})
			},
			getqulist(){
				this.qu = -3
				// 获取市对应的内容
				let xzindex=event.target.selectedIndex
				// 选中的内容
				this.addaddress.uaddr_city=event.target.options[xzindex].text
				getxingzhengqu({pid:this.shi}).then((res)=>{
					this.qulist=res.data.data
				})
			},
			getqutext:function(){
				// 获取区和市对应的内容
				let xzindex=event.target.selectedIndex //选中的内容
				
				this.addaddress.uaddr_district=event.target.options[xzindex].text
			},
			addAddress: async function(){ 
				//如果选中了，uaddr_isdefault = 1
				if(this.uaddr_isdefault){
					// 默认选中说明数据库中的数据都不是默认的
					for(let v of this.addresslist){
						// 先全部改成0
						v.uaddr_isdefault=0
						await updateAdd(v)
					}
					this.addaddress.uaddr_isdefault=1
				}else{
					this.addaddress.uaddr_isdefault=0
				}
				// 调用添加地址的功能
				let res=await adddizhi(this.addaddress)
				this.getalladdresslist() //添加成功，重新获取商品列表
				this.addaddress={} //清空表单的内容
				this.sheng=-1
				this.shi=-2
				this.qu=-3
			},
			// 编辑方法，add时要更新的数据
			bianji:function(add){
				console.log(add)
				this.addshow = false
				this.updateshow = true
				this.addaddress = add
				if(this.addaddress.uaddr_isdefault==1){
					this.uaddr_isdefault=true
				}else{
					this.uaddr_isdefault=false
				}
			},
			updateAddress: async function(){
				// 判断是否选中更新的数据
				if(this.uaddr_isdefault){
					this.addaddress.uaddr_default=1
					// 修改数据时，当前选中为默认，其他的就要修改成非默认
					for(let v of this.addresslist){
						// 优先全部改成0
						if(v.uaddr_id!=this.addaddress.uaddr_id){
							v.uaddr_isdefault=0
							await updateAdd(v)
						}
					}
				}else{
					this.addaddress.uaddr_isdefault=0
				}
				// 将修改后的数据更新到数据库中
				let res=await updateAdd(this.addaddress)
				this.getalladdresslist() //更新成功，重新获取商品列表
				this.addaddress={} //清空表单中的内容
				this.sheng=-1
				this.shi=-2
				this.qu=-3
				this.addaddress.uaddr_isdefault=0
			},
			shanchu:function(aid){
				delAdd(aid).then((res)=>{
					// 删除后重新获取地址列表
					this.getalladdresslist()
				})
			}
		}
		
	}
</script>

<style scoped="scoped">
	table{
		width: 100%;
		border-collapse: collapse;
		text-indent: initial;
		border-spacing: 2px;
		border-color: grey;
	}
	td,th{
		padding: 0.75rem;
	}
	button.success{
		padding: 8px 10px;
		border: none;
		border-radius: 5px;
		background-color: #6f6;
		color: #000;
	}
	button.danger {
		padding: 8px 10px;
		background-color: #DF3033;
		border: none;
		border-radius: 5px;
		color: #fff;
	}
</style>
