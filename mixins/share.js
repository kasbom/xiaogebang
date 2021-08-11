import {setToken,getToken} from '@/utils/common.js'
export const shareMixins = {
    data () {
        return {
            shareData: {
                title: '',
                path: '/pages/home/index',
                imageUrl: '',
                content: '',
                desc: ''
            },
 }
    },

    //#ifdef MP-WEIXIN
    onShareAppMessage () {
        return {
            title: this.shareData.title,
            path: this.shareData.path,
            imageUrl: this.shareData.imageUrl,
            content: this.shareData.content,
            desc: this.shareData.desc,
            success(res){
				uni.showToast({
					title:'分享成功'
				})
			},
			fail(res){
				console.log(res)
				uni.showToast({
					title:'分享失败',
					icon:'none'
				})
			}
        }
    },
	onShareTimeline() {//分享到朋友圈
        return {
            title: this.shareData.title,
            imageUrl: this.shareData.imageUrl,
            success(res){
				uni.showToast({
					title:'分享成功'
				})
			},
			fail(res){
				console.log(res)
				uni.showToast({
					title:'分享失败',
					icon:'none'
				})
			}
        }
    },
    //#endif

    onLoad(option) {
		this.toJoinWx()
    },
	methods:{
		async toJoinWx(){
			    let that = this;
				let pages = getCurrentPages();
				let route = pages[pages.length - 1].$page.fullPath;
				console.log(decodeURIComponent(route))
				const { statusCode, data, message } = await this.$u.api.wxShare({},true)
				if (statusCode === 200&&data.error==0 ) {
					let dataReq=data.data
					let obj={
							path:decodeURIComponent(route),
							title: dataReq.title,
							imageUrl:dataReq.img,
							content:dataReq.content,
							complete:(res)=>{
								console.log(res)
							}
						}
						this.shareData=obj
						return this.shareData
					
				} else {
					this.$toast(data.msg||msg)
				}
		},
	}
}