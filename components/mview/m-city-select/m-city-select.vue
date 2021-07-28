<template>
	<u-popup v-model="value" mode="bottom" :popup="false" :mask="true" :closeable="true" :safe-area-inset-bottom="true"
	 close-icon-color="#ffffff" :z-index="uZIndex" :maskCloseAble="maskCloseAble" @close="close">
		<u-tabs v-if="value" :list="genTabsList" :is-scroll="true" :current="tabsIndex" @change="tabsChange" ref="tabs"></u-tabs>
		<view class="area-box">
			<view class="u-flex" :class="{ 'change':isChange }">
				<view class="area-item">
					<view class="u-padding-10 u-bg-gray" style="height: 100%;">
						<scroll-view :scroll-y="true" style="height: 100%">
							<u-cell-group>
								<u-cell-item v-for="(item,index) in provinces" :title="item.name" :arrow="false" :index="index" :key="index"
								 @click="provinceChange">
									<u-icon v-if="isChooseP&&province===index" slot="right-icon" size="34" name="checkbox-mark"></u-icon>
								</u-cell-item>
							</u-cell-group>
						</scroll-view>
					</view>
				</view>
				<view class="area-item">
					<view class="u-padding-10 u-bg-gray" style="height: 100%;">
						<scroll-view :scroll-y="true" style="height: 100%">
							<u-cell-group v-if="isChooseP">
								<u-cell-item v-for="(item,index) in citys" :title="item.name" :arrow="false" :index="index" :key="index"
								 @click="cityChange">
									<u-icon v-if="isChooseC&&city===index" slot="right-icon" size="34" name="checkbox-mark"></u-icon>
								</u-cell-item>
							</u-cell-group>
						</scroll-view>
					</view>
				</view>

				<view class="area-item">
					<view class="u-padding-10 u-bg-gray" style="height: 100%;">
						<scroll-view :scroll-y="true" style="height: 100%">
							<u-cell-group v-if="isChooseC">
								<u-cell-item v-for="(item,index) in areas" :title="item.name" :arrow="false" :index="index" :key="index"
								 @click="areaChange(index,item)">
									<u-icon v-if="isChooseA&&area===index" slot="right-icon" size="34" name="checkbox-mark" ></u-icon>
								</u-cell-item>
							</u-cell-group>
						</scroll-view>
					</view>
				</view>
				<view class="area-item">
					<view class="u-padding-10 u-bg-gray" style="height: 100%;">
						<scroll-view :scroll-y="true" style="height: 100%">
							<u-cell-group v-if="isChooseA">
								<u-cell-item v-for="(item,index) in twons" :title="item.name" :arrow="false" :index="index" :key="index"
								 @click="twonChange">
									<u-icon v-if="isChooseT&&twon===index" slot="right-icon" size="34" name="checkbox-mark"></u-icon>
								</u-cell-item>
							</u-cell-group>
						</scroll-view>
					</view>
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	/**
	 * city-select 省市区级联选择器
	 * @property {String Number} z-index 弹出时的z-index值（默认1075）
	 * @property {Boolean} mask-close-able 是否允许通过点击遮罩关闭Picker（默认true）
	 * @property {String} default-region 默认选中的地区，中文形式
	 * @property {String} default-code 默认选中的地区，编号形式
	 */
	export default {
		name: 'u-city-select',
		props: {
			// 通过双向绑定控制组件的弹出与收起
			value: {
				type: Boolean,
				default: true
			},
			// 默认显示的地区，可传类似["河北省", "秦皇岛市", "北戴河区"]
			defaultRegion: {
				type: Array,
				default () {
					return [];
				}
			},
			// 默认显示地区的编码，defaultRegion和areaCode同时存在，areaCode优先，可传类似["13", "1303", "130304"]
			areaCode: {
				type: Array,
				default () {
					return [];
				}
			},
			// 是否允许通过点击遮罩关闭Picker
			maskCloseAble: {
				type: Boolean,
				default: true
			},
			// 弹出的z-index值
			zIndex: {
				type: [String, Number],
				default: 0
			}
		},
		data() {
			return {
				cityValue: "",
				isChooseP: false, //是否已经选择了省
				province: 0, //省级下标
				provinces: [],
				isChooseC: false, //是否已经选择了市
				city: 0, //市级下标
				citys: [],
				isChooseA: false, //是否已经选择了区
				area: 0, //区级下标
				areas: [],
				isChooseT: false, //是否已经选择了镇
				twom: 0, //镇级下标
				twons: [],
				tabsIndex: 0,
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			// 根据城市ID获取下级城市
			async getCityById(cityId, name,item) {
				const { statusCode, data } = await this.$u.api.getCityById({'pid':cityId })
				if (statusCode === 200&&data.error==0 ) {
					this[name] = data.data
					console.log(name+':',this[name])
					if(data.data.length==0&&item){
						this.closeP(item)
					}
				}
			},
			async init() {
				if (this.areaCode.length == 3) {
					await this.getCityById(0, 'provinces')
					await this.getCityById(this.provinces[0].id, 'citys')
					await this.getCityById(this.citys[0].id, 'areas')
					await this.getCityById(this.twons[0].id, 'twons')
					
					this.province = this.provinces.findIndex(item => item.id == this.areaCode[0])
					this.city = this.citys.findIndex(item => item.id == this.areaCode[1])
					this.area = this.areas.findIndex(item => item.id == this.areaCode[2])
					this.twon = this.twons.findIndex(item => item.id == this.areaCode[3])
					
					this.isChooseP = true
					this.isChooseC = true
					this.isChooseA = true
					this.isChooseT = true
				} else {
					await this.getCityById(0, 'provinces')
				}
			},
			close() {
				this.$emit('input', false);
			},
			tabsChange(index) {
				this.tabsIndex = index;
			},
			provinceChange(index) {
				this.isChooseP = true;
				this.isChooseC = false;
				this.isChooseA = false;
				this.isChooseT = false;
				this.province = index;
				this.getCityById(this.provinces[index].id, 'citys')
				this.tabsIndex = 1;
			},
			cityChange(index) {
				this.isChooseC = true;
				this.isChooseA = false;
				this.isChooseT = false;
				this.city = index;
				this.getCityById(this.citys[index].id, 'areas')
				this.tabsIndex = 2;
			},
			areaChange(index,item) {
				this.isChooseA = true;
				this.isChooseT = false;
				this.area = index;
				this.getCityById(this.areas[index].id, 'twons',item)
				this.tabsIndex = 3;
			},
			twonChange(index) {
				this.isChooseT = true;
				this.twon = index;
				let result = {};
				result.province = this.provinces[this.province];
				result.city = this.citys[this.city];
				result.area = this.areas[this.area];
				result.twon = this.twons[this.twon];
				console.log(result)
				this.$emit('city-change', result);
				this.close();
			},
			closeP(){
				let result = {};
				result.province = this.provinces[this.province];
				result.city = this.citys[this.city];
				result.area = this.areas[this.area];
				this.$emit('city-change', result);
				this.close();
			}
		},
		computed: {
			isChange() {
				return this.tabsIndex > 1;
			},
			genTabsList() {
				let tabsList = [{
					name: "请选择"
				}];
				if (this.isChooseP) {
					tabsList[0]['name'] = this.provinces[this.province]['name'];
					tabsList[1] = {
						name: "请选择"
					};
				}
				if (this.isChooseC) {
					tabsList[1]['name'] = this.citys[this.city]['name'];
					tabsList[2] = {
						name: "请选择"
					};
				}
				if (this.isChooseA) {
					tabsList[2]['name'] = this.areas[this.area]['name'];
					tabsList[3] = {
						name: "请选择"
					};
				}
				
				if (this.isChooseT) {
					tabsList[3]['name'] = this.twons[this.twon]['name'];
				}
				return tabsList;
			},
			uZIndex() {
				// 如果用户有传递z-index值，优先使用
				return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
			}
		},
		watch: {
			areaCode() {
				this.init()
			}
		}
	}
</script>
<style lang="scss">
	.area-box {
		width: 100%;
		overflow: hidden;
		height: 800rpx;
		background-color: #fff;
		>view {
			width: 150%;
			transition: transform 0.3s ease-in-out 0s;
			transform: translateX(0);

			&.change {
				transform: translateX(-33.3333333%);
			}
		}

		.area-item {
			width: 33.3333333%;
			height: 800rpx;
		}
	}
</style>
