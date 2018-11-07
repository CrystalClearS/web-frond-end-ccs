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
            path: '/apps',
            name: 'home',
            component: Panel,
            children: [
                {
                    path: '',
                    component: Find
                },
                {
                    path: 'profile',
                    component: UserProfile
                },
                {
                    path: 'message',
                    component: Message
                },
                {
                    path: 'config',
                    component: Setting
                },
                {
                    path: 'maps',
                    component: Maps
                }
            ]
        }
    ]
})
