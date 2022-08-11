<template>
  <div ref="echart"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
    props: {
        isAxisChart: {
            type: Boolean,
            default: true
        },
        chartData: {
            type: Object,
            default () {
                return {
                    xData: [],
                    series: []
                }
            }
        }
    },
    data () {
        return {
            // 非饼状图的配置
            axisOption: {
                legend: {
                    // 图例文字颜色
                    textStyle: {
                        color: "#333",
                    },
                },
                grid: {
                    left: "20%",
                },
                // 提示框
                tooltip: {
                    trigger: "axis",
                },
                xAxis: {
                    type: "category", // 类目轴
                    data: [],
                    axisLine: {
                        lineStyle: {
                        color: "#17b3a3",
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        color: "#333",
                    },
                },
                yAxis: [
                {
                    type: "value",
                    axisLine: {
                    lineStyle: {
                        color: "#17b3a3",
                    },
                    },
                },
                ],
                color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
                series: [],
            },
            //  饼状图的配置
            normalOption: {
                tooltip: {
                    trigger: "item",
                },
                color: [
                    "#0f78f4",
                    "#dd536b",
                    "#9462e5",
                    "#a6a6a6",
                    "#e1bb22",
                    "#39c362",
                    "#3ed1cf",
                ],
                series: [],
            },
            // 先声明一个空的echart对象，
            echart: null
        }
    },
    watch: {
        // 监听图表数据，如果发生变化，就重新初始化图表
        chartData: {
            handler () {
                this.initChart()
            },
            deep: true
            // immediate: true
        }
    },
    methods: {
        // 初始化表格
        initChart () {
            // 先初始化（更新）图表的数据
            this.initChartData()
            if (this.echart) {
                this.echart.setOption(this.options)
            }else {
                this.echart = echarts.init(this.$refs.echart)
                this.echart.setOption(this.options)
            }

        },
        // 初始化图表数据
        initChartData () {
            if (this.isAxisChart) {
                this.axisOption.xAxis.data = this.chartData.xData
                this.axisOption.series = this.chartData.series
            }else {
                this.normalOption.series = this.chartData.series
            }
        }
    },
    computed: {
        // 判断是由x轴还是没x轴,然后获取对应的默认配置
        options () {
            return this.isAxisChart? this.axisOption : this.normalOption
        }
    }
}
</script>

<style>

</style>