<template>
  <div class="common-table">
    <el-table
        :data="tableData"
        style="height: 80vh"
        stripe
    >
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

        <el-table-column label="操作" min-width="180">
            <template slot-scope="scope">
                <!-- slot-scope 是作用域插槽，过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据， -->
                <!-- 也就是说，slot-scope='变量名'，该变量可以获取组组件的数据，比如这里可以获取表格中row每行的数据 -->

                <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>

    </el-table>

    <el-pagination
        class="pager"
        layout="prev, pager, next"
        :total="config.total"
        :current-page.sync="config.page"
        @current-change="changePage"
        :page-size="20"
    ></el-pagination>
  </div>
</template>

<script>
export default {
    name: 'CommonTable',
    props: {
        tableData: Array,
        tableLabel: Array,
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
            console.log(page);
        }
    },
    created () {

    }
}
</script>

<style lang="less" scoped>
.common-table {
    height: 90vh;
    background-color: #fff;
    position: relative;
    
    .pager {
        position: absolute;
        bottom: 0;
        right: 20px
    };
}

</style>