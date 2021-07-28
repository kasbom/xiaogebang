<template>
	<view>
		<view class="cell-wrap" v-if="cellShow">
			<u-cell-item title="时间" @click="show = true" :value="timeStr"></u-cell-item>
		</view>
		<u-select v-model="show" mode="mutil-column" :list="list" @confirm="confirm"></u-select>
	</view>
</template>

<script>
	export default {
		props: {
			cellShow: {
				type: Boolean,
				default: true
			},
			weekShow:{
				type: Boolean,
			}
		},
		data() {
			return {
				show: false,
				list: [[], []],
				defaultValue: [0, 0],
				timeStr: '',
			}
		},
		created() {
			const start = this.$u.timeFormat(new Date().getTime(), 'yyyy-mm-dd')
			const endYear = new Date().getFullYear() + 1
			const mAndDay = this.$u.timeFormat(new Date().getTime(), 'mm-dd')
			const end = `${endYear}-${mAndDay}`
			
			const segment = [{ label: '上午', value: 1 }, { label: '下午', value: 2 }]
			const weekList = [
				{ label: '星期一', value: 1 }, { label: '星期二', value: 2 },
				{ label: '星期三', value: 3 }, { label: '星期四', value: 4 },
				{ label: '星期五', value: 5 }, { label: '星期六', value: 6 },
				{ label: '星期日', value: 7 },
			]
			this.weekShow&&this.weekShow==true?this.$set(this.list, 0, weekList):this.$set(this.list, 0, this.getAllDate(start, end))
			this.$set(this.list, 1, segment)
		},
		methods: {
			// 确认
			confirm(e) {
				this.timeStr = `${e[0].label}  ${e[1].label}`
				this.$emit('confirm', e)
			},
			// 时间格式化
			format(time) {
				let ymd = ''
				let mouth = (time.getMonth() + 1) >= 10 ? (time.getMonth() + 1) : ('0' + (time.getMonth() + 1))
				let day = time.getDate() >= 10 ? time.getDate() : ('0' + time.getDate())
				ymd += time.getFullYear() + '-' // 获取年份。
				ymd += mouth + '-' // 获取月份。
				ymd += day // 获取日。
				return ymd // 返回日期。
			},
			getAllDate(start, end) {
				let dateArr = []
				let startArr = start.split('-')
				let endArr = end.split('-')
				let db = new Date()
				db.setUTCFullYear(startArr[0], startArr[1] - 1, startArr[2])
				let de = new Date()
				de.setUTCFullYear(endArr[0], endArr[1] - 1, endArr[2])
				let unixDb = db.getTime()
				let unixDe = de.getTime()
				let stamp
				const oneDay = 24 * 60 * 60 * 1000;
				for (stamp = unixDb; stamp <= unixDe;) {
				 dateArr.push({
					 label: this.format(new Date(parseInt(stamp))),
					 value: this.format(new Date(parseInt(stamp)))
				 })
				 stamp = stamp + oneDay
				}
				return dateArr
			},
			open() {
				this.show = true
			}
		}
	}
</script>

<style scoped lang="scss">
	.cell-wrap{
		background-color: #fff;
	}
</style>
