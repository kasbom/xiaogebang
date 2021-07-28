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
			
			this.url=option.url
			
		},
		onShow(){
		},
		methods:{
			
		}
    }
	
</script>

<style>

</style>