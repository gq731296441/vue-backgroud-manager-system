import Mock from 'mockjs'

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}

var random = Mock.Random;

//扩展数据模板
random.extend({
  goodsname: function (date) {
    var goods = ['oppo', 'vivo', '苹果', '小米', '三星', '魅族', '一加', '联想']
    return this.pick(goods)
 }
})


var goodsList = []
var count = 100

for (let i = 0; i < count; i++) {
    goodsList.push(
      Mock.mock({
        // 商品Id
        "goodsId": Mock.Random.guid(),
        //商品图片
        "goodsImg": "@Image('100x100','@color','phone')",
        //商品名称
        "goodsName":"@goodsname",
        // 商品数量
        "goodsCount|984-2000": 30,
        //商品售价
        "goodsSale|800-6000": 30,
        //商品等级评价★
        "goodsStar|1-5": "★",
        //商品地址
        "goodsAddress": "@county(true)",
      })
    )
}


export default {
  /**
   * 获取列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getGoodsList: config => {
    const { goodsName, page = 1, limit = 20 } = param2Obj(config.url)
    console.log('name:' + goodsName, 'page:' + page, '分页大小limit:' + limit)
    const mockList = goodsList.filter(goods => {
      if (goodsName && goods.goodsName.indexOf(goodsName) === -1 && goods.goodsAddress.indexOf(goodsName) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      code: 20000,
      // count是总页数
      count: mockList.length,
      list: pageList
    }
  },

  /**
   * 增加商品
   * @param goodsName, goodsCount, goodsSale, goodsStar, goodsAddress
   * @return {{code: number, data: {message: string}}}
   */

  createGoods: config => {
    console.log(config);
    const { goodsName, goodsCount, goodsSale, goodsStar, goodsAddress } = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    goodsList.unshift({
      goodsId: Mock.Random.guid(),
      goodsImg: Mock.mock("@Image('100x100','@color','phone')"),
      goodsName: goodsName,
      goodsCount: goodsCount,
      goodsSale: goodsSale,
      goodsStar: goodsStar,
      goodsAddress: goodsAddress,
    })
    return {
      code: 20000,
      data: {
        message: '添加成功'
      }
    }
  },
  /**
   * 删除用商品
   * @param goodsId
   * @return {*}
   */
  deleteGoods: config => {
    console.log(config);
    const { goodsId } = param2Obj(config.url)

    if (!goodsId) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      goodsList = goodsList.filter(u => u.goodsId !== goodsId)
      return {
        code: 20000,
        message: '删除成功'
      }
    }
  },
  /**
   * 批量删除
   * @param config
   * @return {{code: number, data: {message: string}}}
   */
  batchremove: config => {
    let { ids } = param2Obj(config.url)
    ids = ids.split(',')
    List = List.filter(u => !ids.includes(u.id))
    return {
      code: 20000,
      data: {
        message: '批量删除成功'
      }
    }
  },
  /**
   * 修改商品
   * @param goodsId, goodsName, goodsCount, goodsSale, goodsStar, goodsAddress
   * @return {{code: number, data: {message: string}}}
   */
  updateGoods: config => {
    // console.log(config);
    const { goodsId, goodsName, goodsCount, goodsSale, goodsStar, goodsAddress } = JSON.parse(config.body)
    goodsList.some(u => {
      if (u.goodsId === goodsId) {
        u.goodsName = goodsName
        u.goodsCount = goodsCount
        u.goodsSale = goodsSale
        u.goodsStar = goodsStar
        u.goodsAddress = goodsAddress
        return true
      }
    })
    return {
      code: 20000,
      data: {
        message: '编辑成功'
      }
    }
  }
}
