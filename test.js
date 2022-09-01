// 引入 Mock
var Mock = require('mockjs')

var random = Mock.Random;

//扩展数据模板
random.extend({
    goodsname: function (date) {
      var goods = ['oppo', 'vivo', '苹果', '小米', '三星', '魅族', '一加', '联想', '']
      return this.pick(goods)
   }
})
  

// 定义数据类型
// var goodsList = Mock.mock({
//     // 20条数据
//     "data|2": [{
//       // 商品Id
//       "goodsId": Mock.Random.guid(),
//       //商品图片
//       "goodsImg": "@Image('100x100','@color','phone')",
//       //商品名称
//       "goodsname":"@goodsname",
//        // 商品数量
//        "goodsCount|984-2000": 30,
//        //商品售价
//        "goodsSale|800-6000": 30,
//       //商品等级评价★
//       "goodsStar|1-5": "★",
//       //商品地址
//       "goodsAddress": "@county(true)",
//       "123": Mock.mock("@Image('100x100','@color','phone')")
//     }]
//   })

var goodsList = []
var count = 20
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

// 输出结果
 console.log(goodsList);