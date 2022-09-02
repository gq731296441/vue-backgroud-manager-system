<template>
  <div class="mall_manager">
      <el-dialog
        :visible.sync="isShow"
        :title="operateType === 'add' ? '新增订单' : '编辑订单'"
      >
        <CommonForm
          :label="goodsOperateLabel"
          :form="goodsOperateData"
          :inline="true"
        >
        </CommonForm>

        <div slot="footer" class="dialog_footer">
          <el-button type="primary" @click="confirm">确认</el-button>
          <el-button  @click="cancle">取消</el-button>
        </div>
      </el-dialog>

      <div class="manager_header">
        <el-button type="primary" @click="addGoods">+ 新增</el-button>

          <CommonForm
          :label="serachLabel"
          :form="searchData"
          :inline="true"
          >
          <el-button type="primary" @click="search">搜索</el-button>
        </CommonForm>
      </div>

      <CommonTable
        :tableData="goodsData"
        :tableLabel="goodsTabelLabel"
        :config="config"
        @edit="editGoods"
        @del="deleteGoods"
        @changePage="getGoodsList()"
      >
        <el-table-column
          show-overflow-tooltip
          prop="goodsImg"
          label="商品图片"
          width="150px"
        >
          <template slot-scope="scope">
            <img :src="scope.row.goodsImg" alt="">
          </template>
        </el-table-column>
      </CommonTable>
  </div>
</template>

<script>
import CommonForm from "@/components/common/CommonForm.vue";
import CommonTable from "@/components/common/CommonTable.vue";
import { getGoods } from '@/api/data.js'


export default {
  name: 'mall',
  data () {
    return {
      isShow: false,
      operateType: 'add',
      goodsData: [],
      goodsTabelLabel: [
        {
          prop: 'goodsName',
          label: '商品名称',
          width: 100
        },
        {
          prop: 'goodsCount',
          label: '商品库存(件)'
        },
        {
          prop: 'goodsSale',
          label: '商品价格(元)'
        },
        {
          prop: 'goodsStar',
          label: '商品评分'
        },
        {
          prop: 'goodsAddress',
          label: '订单地址',
          width: 300
        }
      ],
      goodsOperateLabel: [
        {
          model: 'goodsName',
          label: '商品名称',
          type: 'input',
        },
        {
          model: 'goodsCount',
          label: '商品库存(件)',
          type: 'input'
        },
        {
          model: 'goodsSale',
          label: '商品价格(元)',
          type: 'input'
        },
        {
          model: 'goodsStar',
          label: '商品评分',
          type: 'select',
          opts: [
            {
              label: '★',
              value: 1
            },
            {
              label: '★★',
              value: 2
            },
            {
              label: '★★★',
              value: 3
            },
            {
              label: '★★★★',
              value: 4
            },
            {
              label: '★★★★★',
              value: 5
            }
          ]
        },
        {
          model: 'goodsAddress',
          label: '订单地址',
          type: 'input'
        }
      ],
      goodsOperateData: {
        goodsName: '',
        goodsCount: '',
        goodsSale: '',
        goodsStar: '',
        goodsAddress: ''
      },
      serachLabel: [
        {
          model: 'keyword',
          label: '',
          type: 'input'
        }
      ],
      searchData: {
        keyword: ''
      },
      config: {
        page: 1,
        page_size: 3,
        total: 30
      },
    }
  },
  components: {
    CommonForm,
    CommonTable,
  },
  methods: {
    confirm() {
      if (this.operateType === 'add') {
        this.$http.post('/mall/addGoods', this.goodsOperateData).then(() => {
          this.isShow = false
          this.getGoodsList()
        })
      }else if (this.operateType === 'edit') {
        console.log(this.goodsOperateData);
        this.$http.post('mall/editGoods', this.goodsOperateData).then(() => {
          this.isShow = false
          this.getGoodsList()
        })
      }
    },
    cancle() {
      this.isShow = false
      this.getGoodsList()
    },
    addGoods() {
      this.isShow = true
      this.operateType = 'add'
      this.goodsOperateData = {
        goodsName: '',
        goodsCount: '',
        goodsSale: '',
        goodsStar: '',
        goodsAddress: ''
      }
    },
    search() {
      this.getGoodsList(this.searchData.keyword)
    },
    editGoods(row) {
      console.log(row);
      this.operateType = 'edit'
      this.isShow = true
      this.goodsOperateData = row
    },
    deleteGoods(row) {
      this.$confirm('此操作将永久删除该商品，是否继续？', "提示", {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const goodsId = row.goodsId
        this.$http.get('/mall/delGoods', {
          params: {goodsId}
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        }).then(() => {
          this.getGoodsList()
        })
      })
    },
    getGoodsList(goodsName = '') {
      this.config.loading = true
      goodsName ? (this.config.page = 1) : ''
      getGoods({
        goodsName,
        page: this.config.page
      }).then(({ data: res }) => {
        console.log(res);
        if (res.code === 20000) {
          this.goodsData = res.list 
          this.config.total = res.count
        }
      })
    },
    test() {
      console.log('1');
    }
  },
  created() {
    this.getGoodsList()
  }
}
</script>

<style lang="less" scoped>
  .mall_manager {

    
    .manager_header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      /deep/ .el-form-item {
        margin-bottom: 0;
      }
    }
  }
</style>