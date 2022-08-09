import Vue from 'vue'
import Vuex from 'vuex'
import tab from '@/store/tab.js'

Vue.use(Vuex)

// 通过module的方式将不同模块的store进行引入

export default new Vuex.Store({
    modules: {
        tab
    }
})