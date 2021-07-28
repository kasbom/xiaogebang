<template>
	<canvas canvas-id="canvasArea" id="canvasArea" class="charts" @touchstart="touchArea"></canvas>
</template>

<script>
	import uCharts from '@/libs/u-charts/u-charts/u-charts.js';
	var _self;
	var canvaArea=null;
   
	export default {
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
			}
		},
		props:{
			chartData:{
				type: Object
			}
		},
		watch:{
			chartData(){
				this.getServerData();
				// console.log(this.chartData.x)
				// console.log('监听到')
			}
		},
		created() {
			_self = this;
			this.cWidth=uni.upx2px(702);
			this.cHeight=uni.upx2px(180*2);
		},
		methods: {
			getServerData(){
				let Area={categories:[],series:[]};
				//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
				Area.categories= this.chartData.x || ['7FEB', '8FEB', '9FEB', '10FEB', '11FEB', '12FEB', '13FEB', '14FEB'];
				Area.series= [
					{
						name: '',
						data: this.chartData.y || [1600, 1800, 2000,2200, 2240, 2200,2120, 1980, 1700,1600, 1680, 1700,1680, 1400, 1300],
						color: '#ee7703'
					}
				];
				
				let yMax = Math.max(...this.chartData.y) + 10
				
				_self.showArea("canvasArea",Area, yMax);
			},
			showArea(canvasId,chartData, yMax){
				canvaArea = new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'line',
					fontSize:11,
					legend:{show:false},
					dataLabel:false,
					enableMarkLine: false,
					dataPointShape:true,
					// background:'rgba(0,0,0,0)',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					dataPointShapeType: 'hollow',
          colors: ['#ee7703'],
					xAxis: {
						type:'grid',
						gridColor:'rgba(255,255,255,0)',
						gridType:'dash',
						itemCount: 3,
						dashLength: 4,
						labelCount: 3,
					},
					yAxis: {
						gridType:'solid',
						gridColor:'rgba(0,0,0,.8)',
						dashLength:8,
						splitNumber:5,
            calibration: false,
						min: 0,
						max:yMax
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						area:{
							type: 'curve',
							opacity:0.9,
							addLine:true,
							width:2,
							gradient: true,
						}
					}
				});
				
			},
			touchArea(e) {
				canvaArea.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 702upx;
		height: 180*2upx;
		background-color: #fff;
	}
	
	.charts {
		width: 702upx;
		height: 180*2upx;
		background-color: rgab(0,0,0,0);
	}
</style>
