<template>
    <view>
		<web-view title="hehe" :webview-styles="webviewStyles" 
		:src="url" >
		</web-view>
		
		
		
    </view>
</template>


<script>
    export default {
		
        data() {
            return {
                webviewStyles: {
                    progress: {
                        color: '#3e3adc'
                    }
                },
				id:0,
				token:'',
				url:''
            }
        },
		onLoad(option) {
			this.url=`https://yzf.qq.com/xv/web/static/chat/index.html?sign=37ef9b97d17156972043cbeb18e5e034689c324bb894b40ebc4d6717e84f1ca5680172e0d3858faf377745fe225d8111e9159589`
		},
		onShow(){
		},
		methods:{
			
		}
    }
	
</script>

<style>

</style>