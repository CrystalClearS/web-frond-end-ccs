import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isAuth     : false,
        user       : {},
        isShowAuth : false,
        action     : '',
    },
    mutations: {
        setUser(state, user) {
            if(!user){
                state.isAuth = false;
                state.user = {};
            }

            state.isAuth = true;
            state.user = user;
        },
        setShowAuth(state, value) {
            state.isShowAuth = value;
        },
        setAction(state, value) {
            state.action = value;
        }
    },
    actions: {
        setUser(context, user) {
            context.commit('setUser', user);
        },
        setShowAuth(context, value) {
            context.commit('setShowAuth', value);
        },
        setAction(context, value) {
            context.commit('setAction', value);
        }
    },
    getters: {
        isAuth: state => {
            return state.isAuth;
        },
        isShowAuth: state => {
            return state.isShowAuth;
        },
        action : state => {
            return state.action;
        },
        user : state => {
            return state.user;
        }
    }
})
