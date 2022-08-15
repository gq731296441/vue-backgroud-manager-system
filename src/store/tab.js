import router from '@/router'
import Cookie from 'js-cookie'

export default {
    state: {
        isCollapse: false,
        tabList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        // 控制高亮显示
        currentMenu: null,
        // 存储菜单的数组
        menu: []
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        // 点击侧边栏的菜单，就改变tabList中的属性
        // 判断当前的菜单是否为home，不是就添加，是就重置
        selectMenu (state, val) {
            // 当前的菜单如果不是home
            if (val.name !== 'home') {
                state.currentMenu = val.name
                // tabLisat是否有当前的菜单
                const result = state.tabList.findIndex(item => item.name === val.name)
                // 没有就添加进去
                if (result == -1) {
                    state.tabList.push(val)
                }
            }else {
                // 如果还是点击的还是home，就重置currentMenu
                state.currentMenu = null
            }
            // console.log(state.tabList);
        },
        closeTag (state, val) {
            // 查找与传入的tab项的name相同的元素的index
            const result = state.tabList.findIndex(item => item.name === val.name)
            // 删除state中的tabList的该元素 
            state.tabList.splice(result, 1)
        },
        //  存储请求接口返回的菜单数组
        setMenu (state, val) {
            state.menu = val
            // 存在cookie中是为了防止刷新页面，导致vuex中的store数据丢失
            Cookie.set('menu', JSON.stringify(val))
        },
        // 清空存储的菜单
        clearMenu (state) {
            state.menu = []
            Cookie.remove('menu')
        },
        // 将存储好的menu菜单数组添加到router路由中
        addMenu (state, router) {
            // 从Cookie中获取菜单，如果没有就直接返回
            // 如果Cookie中有菜单，就将其更新到state中
            if (!Cookie.get('menu')) {
                return 
            }
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            
            // 定义一个空路由
            const menuArray = []
            
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`@/views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }else {
                    item.component = () => import(`@/views/${item.url}`)
                    menuArray.push(item)
                }
            })

            // console.log(menuArray);

            // 路由动态添加
            menuArray.forEach(item => {
                router.addRoute('Main', item)
            })
        }

    }
}