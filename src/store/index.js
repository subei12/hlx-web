import Vue from 'vue';

import Vuex from 'vuex';

import axios from '../plugins/axios';

Vue.use(Vuex);

var store = new Vuex.Store({
    state: {
        keepComponent: ['ViewMain', 'PostList'],
        user: {},
        _key: '',
        userInfo: {
            avatar: require('../assets/space/place_holder_profile_avatar_photo.png')
        }
    },
    mutations: {
        clearKeep(state, uname) {
            var index = state.keepComponent.findIndex(keepName => keepName === uname);
            if (index >= 0) {
                state.keepComponent.splice(index, 1);
            }
        },
        setKeep(state, uname) {
            var index = state.keepComponent.findIndex(keepName => keepName === uname);
            if (index === -1) {
                state.keepComponent.push(uname);
            }
        },
        setUser(state, params = {}) {
            const { user, _key, userInfo } = params;
            state.user = user;
            state._key = _key;
            if (userInfo) {
                state.userInfo = userInfo;
            }
        }
    },
    getters: {
        isLogin(state) {
            if (Object.keys(state.user).length !== 0 && state._key) {
                return true;
            } else {
                return false;
            }
        }
    },
    actions: {
        // 验证key是否有效
        async getUserStatus(context) {

            try {
                var { user, _key } = JSON.parse(window.localStorage.getItem('user') || '{}');
                if (!user || !_key) return;
                var result = await axios.get('/user/info', {
                    params: {
                        user_id: user.userID,
                        _key: _key
                    }
                })
            } catch (err) {
                window.localStorage.setItem('loginStatus', 0);
                console.log(err);
                return;
            }

            if (result.code !== 103) {
                context.commit('setUser', {
                    user,
                    _key,
                    userInfo: result
                });
                window.localStorage.setItem('loginStatus', 1);
            } else {
                window.localStorage.setItem('user', '');
                window.localStorage.setItem('loginStatus', 0);
            }

        }
    }

});

export default store;