<template>
    <view>
		<web-view title="hehe" :webview-styles="webviewStyles" 
		:src="url" >
		</web-view>
		
		
		
    </view>
</template>


<script>
		import {getToken} from '@/utils/common.js'
		import config from '@/config'
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
			this.id= option.id
			this.token=getToken('token')
			this.url=`${config.apiURL}/Article/detail?id=${this.id}&token=${this.token}`
		},
		onShow(){
		},
		methods:{
			
		}
    }
	
</script>

<style>

</style>