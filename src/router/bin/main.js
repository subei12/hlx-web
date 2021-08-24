
// import Home from '../../views/main/home.vue';

const Home = () => import(/* webpackChunkName: "main-tab-bar" */ '../../views/main/home.vue');

// import Community from '../../views/main/community.vue';

const Community = () => import(/* webpackChunkName: "main-tab-bar" */ '../../views/main/community.vue');

// import Find from '../../views/main/find.vue';

const Find = () => import(/* webpackChunkName: "main-tab-bar" */ '../../views/main/find.vue');

// import Space from '../../views/main/space.vue';

const Space = () => import(/* webpackChunkName "main-tab-bar"*/ '../../views/main/space.vue');


const route = [
    {
        path: '/home',
        component: Home,
        tabbarData: {
            text: '首页',
            off:require('../../assets/main/ic_main_game.png'),
            on:require('../../assets/main/ic_main_game_on.png')
        }
    }, {
        path: '/community',
        component: Community, 
        tabbarData: {
            text: '社区',
            off:require('../../assets/main/ic_main_bbs.png'),
            on:require('../../assets/main/ic_main_bbs_on.png')
        }
    }, {
        path: '/find',
        component: Find, 
        tabbarData: {
            text: '发现',
            off:require('../../assets/main/ic_main_descovery.png'),
            on:require('../../assets/main/ic_main_descovery_on.png')
        }
    }, {
        path: '/space',
        component: Space, 
        tabbarData: {
            text: '空间',
            off:require('../../assets/main/ic_main_space.png'),
            on:require('../../assets/main/ic_main_space_on.png')
        }
    }
]

export default route;