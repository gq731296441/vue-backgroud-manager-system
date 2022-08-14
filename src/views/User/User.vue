<template>
  <div class="manager">
    <!-- 通过对话框的形式来弹出表单元素 -->
    <!-- 对话框有两种弹出的形式，一种是新增用户，一种是编辑用户 -->
    <!-- 对话框还有一个 isShow 属性，用来控制对话框的开启和关闭 -->
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '编辑用户'"
      :visible.sync="isShow"
      @close="closeDialog"
    >
    <!-- 表单组件 传入表单需要的props属性 -->
      <common-form 
        :label="operateFormLabel" 
        :form="operateForm" 
        :inline="true"
      ></common-form>
      <!-- 对话框的下方按钮， 分别是取消和确认 取消通过修改isShow控制对话框的可见性-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    
    <!-- 用户列表上方的按钮，新增和搜索框 -->
    <div class="manage-header">
      <!-- 新增按钮 点击触发对话框，触发新增用户的函数 -->
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <!-- 搜索框 -->
      <common-form
        :label="searchLabel" 
        :form="searchData" 
        :inline="true"
      >
      <!-- 搜索按钮，点击触发getList函数 放置在插槽中-->
      <el-button type="primary" @click="getList(searchData.keyword)">搜索</el-button>
      </common-form>
    </div>

    <common-table
      :tableLabel="tableLabel"
      :tableData="tableData"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    ></common-table>

  </div>
</template>

<script>
import CommonForm from "@/components/common/CommonForm.vue";
import CommonTable from "@/components/common/CommonTable.vue";
import{ getUser } from '@/api/data.js'


export default {
  name: "user",
  data() {
    return {
      operateType: "add",
      isShow: false,
      // 新增和编辑表单的表单元素配置
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      // 新增和编辑表单的数据
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },

      // 搜索的表单的配置
      searchLabel: [
        {
          model: 'keyword',
          label: '',
          type: 'input'
        }
      ],
      // 搜索的表单数据
      searchData: {
        keyword: ''
      },

      // 表格的总数据
      tableData: [],
      // 表格每列的的prop和label以及宽度width
      tableLabel: [
        {
          prop: 'name',
          label: '姓名',

        },
        {
          prop: 'addr',
          label: '地址',
          width: 320
        },
        {
          prop: 'age',
          label: '年龄',

        },
        {
          prop: 'birth',
          label: '出生日期',
          width: 200
        },
        {
          prop: 'sexLabel',
          label: '性别',

        },

      ],
      // 换页插件 的 当前页数 和 总页数
      config: {
        page: 1,
        total: 30
      },

    };
  },
  components: { CommonForm, CommonTable },
  methods: {
    cancle () {
      this.isShow = false
      this.getList()

    },
    closeDialog () {
      this.getList()
    },
    confirm () {
      if (this.operateType === 'edit') {
        this.$http.post('/user/edit', this.operateForm).then(() => {
          this.isShow = false
          this.getList()
        })
      }else {
        this.$http.post('/user/add', this.operateForm).then(res => {
          console.log(res);
          this.isShow = false
          this.getList()
        })
      }
    },
    addUser () {
      // 点击触发对话框，并且设置触发的类型 是新增还是编辑
      this.isShow = true
      this.operateType = 'add'
      // 将表单元素的内容进行重置
      this.operateForm = {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      }
    },
    // 获取用户的数据
    // 该函数接收name作为参数，默认name为空
    getList (name = '') {
      this.config.loading = true
      // 如果传进来的name参数不为空，那么就从第一页开始搜索，否则啥也不做
      name ? (this.config.page = 1) : ''
      // 通过封装的axios中的getUser函数发起get请求获取用户列表
      // 获取用户列表可以带参数 name, page, limt; name可以不填, page,limit有默认值。
      // 即 如果有名字就从数据的第一页开始查询并返回，如果没有就获取所有的数据返回
      getUser({
        name,
        page: this.config.page
      }).then(res => {
          // 返回的数据:状态码code: number, 数据总数count: number, 数据data: *[]
          // 因为数据㕜的sex是通过0和1进行区分，0为女，1为男
          // 因此将返回的数据通过map方法重新生成新的数据,将01换为男女性别
          // 将新的数组赋值给data中的表格数据
          this.tableData = res.data.list.map(item => {
            item.sexLabel = item.sex === 0 ? '女' : '男'
            return item
          })
          // console.log(this.tableData);
          // 数据总数
          this.config.total = res.data.count
          this.config.loading = false
      })
    },

    editUser (row) {
      console.log(row.name);
      // console.log(this.operateForm.name);
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
    },
    delUser (row) {
      this.$confirm("此操作将永久删除该文件，是否继续？", "提示", {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const id = row.id
        console.log(id);
        this.$http.get('/user/del', {
          params: {id}
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        }).then(() => {
          this.getList()
        })
      })
    }
  },
  created () {
    this.getList()
  }
};
</script>

<style lang="less" scoped>
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    /deep/ .el-form-item {
      margin-bottom: 0;
    }
  }
</style>