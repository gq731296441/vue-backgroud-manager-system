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
        x: 2
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
            console.log(state.tabList);
        }

    }
}