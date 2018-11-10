import Vue from 'vue'
import Router from 'vue-router'

import Panel from './views/panel/Panel'
import UserProfile from './views/panel/profile/User'
import Find from './views/panel/profile/Find'
import Message from './views/panel/profile/Message'
import Setting from './views/panel/profile/Setting'
import Maps from './views/panel/profile/Maps'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Panel,
            children: [
                {
                    path: '',
                    component: Find,
                    name : 'main'
                },
                {
                    path: 'profile',
                    component: UserProfile,
                    name : 'profile'
                },
                {
                    path: 'user/:id',
                    component: UserProfile,
                    name : 'user'
                },
                {
                    path: 'message',
                    component: Message,
                    name : 'message'
                },
                {
                    path: 'config',
                    component: Setting,
                    name : 'setting'
                },
                {
                    path: 'maps',
                    component: Maps,
                    name : 'maps'
                }
            ]
        }
    ]
})
