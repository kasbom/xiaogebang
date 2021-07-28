  <template>
    <view class="content">
      <canvas class="firstCanvas" @touchstart="touchstart1" @touchmove="touchmove1"  canvas-id="handWriting1" disable-scroll="true" >
            </canvas>
    
<!--   <cover-view class="btn-wrap btn btn-wrap-1" @click="reSign1">清除</cover-view>
		<cover-view class="btn-wrap btn" @click="sign1ok">提交</cover-view> -->

		<view class="btn-wrap">
			<m-button title="清除" @handleClick="reSign1" gray size="max"></m-button>
			<m-button title="提交" @handleClick="sign1ok" size="max"></m-button>
		</view>
</view>
</template>

<script>
	export default {
		data() {
			return {
				context: null,
				hasDraw:false, //默认没有画
				src:null,
				params:{},
				type:0,
				
			}
		},
		onLoad: function(option) {
			this.params.order_id=option.order_id
			this.params.id=option.id
			this.params.type=option.type
			this.context = wx.createCanvasContext('handWriting1');
			this.context.setStrokeStyle("#000000")
			this.context.setLineWidth(3);
		},
		methods: {
			touchstart1: function(e) {
				this.context.moveTo(e.touches[0].x, e.touches[0].y);
			},
			touchmove1: function(e) {
				this.hasDraw = true
				var x = e.touches[0].x;
				var y = e.touches[0].y;
				this.context.setLineWidth(3);
				this.context.lineTo(x, y);
				this.context.stroke();
				this.context.setLineCap('round');
				this.context.draw(true);
				this.context.moveTo(x, y);
			},
			reSign1: function() { //重新画
				this.context.draw(); //清空画布
				this.hasDraw = false
				this.src = null
			},
			async appReadFileToBase64(path) {
				return new Promise((resolve, reject) => {
					// #ifdef APP-PLUS
					plus.io.resolveLocalFileSystemURL(path, function(entry) {
						entry.file(function(file) {
							var AppReader = new plus.io.FileReader();
							AppReader.onloadend = function(e) {
								let base64 = e.target.result
								resolve(base64)
							};
							AppReader.onerror = function(err) {
								reject(err)
							};
							AppReader.readAsDataURL(file);
						}, function(e) {
							reject(e)
			
						});
					});
					// #endif
					// #ifdef H5
					resolve(path)
					// #endif
				})
			
			},
			sign1ok:function () {
				
				if(!this.hasDraw){
					this.$toast('请签字')
				} else {
					
					this.context.draw(true, wx.canvasToTempFilePath({
						canvasId: 'handWriting1',
						success: res => {
							
							this.appReadFileToBase64(res.tempFilePath).then(async res => {
								this.src = res
								this.comfunc(this.src)
								
								// uni.saveImageToPhotosAlbum({
								// 	filePath: this.src,
								// 	success: function (data) {
								// 		console.log(data)
								// 		console.log('save success')
								// 	}
								// })
							})
							// uni.saveImageToPhotosAlbum({
							// 	filePath: this.src,
							// 	success: function () {
							// 		console.log('save success')
							// 	}
							// })
						}
					}))
					
				}
				
			},
			async comfunc(url){
				const { statusCode, data, message } =  await this.$u.api.signName({img:url,id:this.params.id},true)
				
				if (statusCode === 200&&data.error==0 ) {
					uni.navigateTo({
						url: `/pages/order/yuesao/index?type=${this.type}`
					})
					
				} else {
					this.$toast(data.msg||msg)
				}
			}
		}
	}
</script>

<style>
page{
  width: 100%;
  height: 100%;
}
.content {
  width: 100%;
  height: 100%;
	display: flex;
	flex-direction: column;
  /* background-color: red; */
}
.firstCanvas {
  background-color: #fff;
	width: 100%;
	flex: 1;
/*  width: 100%;
  height: 100%; */
}
.btn-wrap{
	display: flex;
}
/* .btn-wrap{
  position: absolute;
  left: 0;
  bottom: 83px;
  transform: rotateZ(90deg) translateY(10px);
  display: flex;
	z-index: 9999;
}
.btn-wrap-1{
	bottom: 203px;
}
.btn{
  margin: 0 10px;
  background: #f60;
  color: #fff;
  font-size: 14px;
  border-radius: 4px;
  line-height: 46px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 86px;
  height: 46px;
  box-sizing: border-box;
} */
</style>
