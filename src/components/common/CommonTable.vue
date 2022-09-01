<template>
  <div class="common-table">
    <!-- 声明el-table -->
    <el-table
        :data="tableData"
        style="width: 100%;"
        height="75vh"
        stripe
    >
        <slot></slot>
        <!-- 循环渲染table的每一列 -->
        <el-table-column
            show-overflow-tooltip
            v-for="item in tableLabel"
            :key="item.prop"
            :label="item.label"
            :width="item.width ? item.width : 125"
            :prop="item.prop"
        >    
            <!-- 同样是作用域插槽 -->
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
            </template>

        </el-table-column>

        <!-- 每列的编辑和删除按钮，这里要使用elementui的 slot-scope 来获取每行的数据 -->
        <el-table-column label="操作" min-width="180">
            <template slot-scope="scope">
                <!-- slot-scope 是作用域插槽，过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据， -->
                <!-- 也就是说，slot-scope='变量名'，该变量可以获取组组件的数据，比如这里可以获取表格中row每行的数据 -->
                
                <!-- 点击编辑按钮触发handleEdit事件 -->
                <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                <!-- 点击删除触发 handleDelete事件-->
                <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>

    </el-table>

    <!-- 分页功能的实现 current-page.sync 表示和父元素进行双向绑定-->
    <!-- current-change 是elementui自带的事件，接收参数：当前所选页数 -->
    <el-pagination
        class="pager"
        layout="prev, pager, next"
        :total="config.total"
        :current-page.sync="config.page"
        @current-change="changePage"
        :page-size="config.page_size"
    ></el-pagination>
  </div>
</template>

<script>
export default {
    name: 'CommonTable',
    props: {
        // 表格的数据
        tableData: Array,
        // 表格每列的表头
        tableLabel: Array,
        // 分页组件的必须属性
        config: Object
    },
    data () {
        return {
            x: {}
        }
    },
    methods: {
        handleEdit (row) {
            this.$emit('edit', row)
        },
        handleDelete (row) {
            this.$emit('del', row)
        },
        // current-change事件触发时传入当前页的页数
        changePage (page) {
            this.$emit('changePage', page)
            console.log('当前页数', page);
        }
    },
    created () {

    }
}
</script>

<style lang="less" scoped>
.common-table {
    // height: 90vh;
    // height: 800px;
    background-color: #fff;
    position: relative;
    
    .pager {
        position: absolute;
        bottom: 0;
        right: 20px
    };
}

</style>