<template>
	<view class="form-list" @click="handleFoucs">
		<view class="list-title">{{title}}</view>
		<input :type="type" :value="value" @input="handleChange" :focus="focus" @blur="handleBlur" :disabled="disabled" class="input list-input">
		<slot name="button"></slot>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			value: {
				type: [ String, Number ],
				default: ''
			},
			type: {
				type: String,
				default: 'text'
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				focus: false
			}
		},
		methods: {
			handleChange(e) {
				this.$emit('input', e.detail.value)
			},
			handleFoucs() {
				this.focus = true
			},
			handleBlur() {
				this.$emit('blur')
				this.focus = false
			},
		}
	}
</script>

<style scoped lang="scss">
	.form-list{
		margin-bottom: 18rpx;
		height: 87rpx;
		padding: 0 40rpx;
		border-radius: 87rpx;
		background-color: #ededed;
		display: flex;
		align-items: center;
		.list-title{
			font-size: 26.25rpx;
			color: #1b1b1b;
			width: 230rpx;
			flex-shrink: 0;
		}
		.list-input{
			display: block;
			flex-grow: 1;
			height: 100%;
			color: #000;
			font-size: 26.25rpx;
		}
		.list-bttn{
			min-width: 120rpx;
			padding: 0 10rpx;
			height: 48rpx;
			background-image: linear-gradient(
				#5b5b5b, 
				#5b5b5b), 
			linear-gradient(
				#d14101, 
				#d14101);
			background-blend-mode: normal, 
				normal;
			border-radius: 24rpx;
			border: solid 1px #b3b3b3;
			
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 24rpx;
			color: #fff;
		}
	}
</style>
