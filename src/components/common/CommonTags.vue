<template>
  <div class="tabs">
    <el-tag
        v-for="(tag, index) in tabList"
        :key="tag.path"
        size="small"
        :closable=" tag.name !== 'home' "
        :effect=" $route.name == tag.name ? 'dark' : 'plain' "
        @click="changeMenu(tag)"
        @close="handleClose(tag, index)"
    >
    {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'commonTags',
    data () {
        return {

        }
    },
    computed: {
        ...mapState({
            tabList: state => state.tab.tabList
        })
    },
    methods: {
        ...mapMutations({
            close: 'closeTag'
        }),
        changeMenu (tag) {
            this.$router.push({
                name: tag.name
            })
        },
        handleClose (tag, index) {
            // 先获取所有tabList中tag的个数
            const length = this.tabList.length - 1
            
            // 调用vuex的tab模块中的关闭tag的方法
            this.close(tag)

            // 如果当前关闭的tag的name不是当前页面的路由name，就直接关闭
            if (tag.name !== this.$route.name) {
                return
            }
            if (index === length) {
                this.$router.push({
                    name: this.tabList[index - 1].name
                })
            }else {
                this.$router.push({
                    name: this.tabList[index].name
                })
            }
            
        }
    },
  
}
</script>

<style lang="less" scoped>
    .tabs {
        padding: 20px;
        .el-tag {
            margin-right: 15px;
            cursor: pointer;
        }
    }
</style>