import Vue from 'vue'
import {
    Vuetify,
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VCard,
    VGrid,
    VImg,
    VToolbar,
    VDivider,
    VRating,
    VProgressCircular,
    VSubheader,
    VAvatar,
    VChip,
    VTabs,
    VDialog,
    VCheckbox,
    VTooltip,
    VTextField,
    VSelect,
    VTextarea,
    VExpansionPanel,
    VDatePicker,
    VMenu,
    VStepper,
    VProgressLinear,
    transitions
} from 'vuetify'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
    components: {
        VApp,
        VNavigationDrawer,
        VFooter,
        VList,
        VBtn,
        VIcon,
        VImg,
        VCard,
        VGrid,
        VToolbar,
        VDivider,
        VRating,
        VProgressCircular,
        VSubheader,
        VAvatar,
        VChip,
        VTabs,
        VDialog,
        VCheckbox,
        VTooltip,
        VTextField,
        VSelect,
        VTextarea,
        VExpansionPanel,
        VDatePicker,
        VMenu,
        VStepper,
        VProgressLinear,
        transitions
    },
    theme: {
        primary: '#ee44aa',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
    },
    customProperties: true,
    iconfont: 'md',
})
