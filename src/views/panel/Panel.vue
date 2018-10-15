<template>
    <v-content>
        <v-navigation-drawer
                fixed
                right
                clipped
                app
                hidden-xs-only
        >
        </v-navigation-drawer>
        <v-toolbar
                color="blue-grey"
                dark
                fixed
                app
                clipped-right
                hidden-xs-only
        >
            <v-toolbar-side-icon @click.stop="left = !left"></v-toolbar-side-icon>
            <v-toolbar-title>Crystal</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click.stop="right = !right">
                <v-icon>more_vert</v-icon>
            </v-btn>
        </v-toolbar>
        <v-navigation-drawer
                fixed
                app

                hidden-xs-only
        >
        </v-navigation-drawer>
        <v-navigation-drawer
                v-model="left"
                temporary
                fixed
        >
            <div class="hidden-md-only hidden-lg-only hidden-xl-only">
                <Menu/>
            </div>
        </v-navigation-drawer>
        <!--<v-content>-->
        <v-layout row wrap>
            <v-flex md3 hidden-xs-only hidden-sm-only>
                <Menu/>
            </v-flex>
            <v-flex xs12 md9 pa-2>
                <router-view></router-view>
            </v-flex>
        </v-layout>
        <!--</v-content>-->
        <v-navigation-drawer
                v-model="right"
                right
                temporary
                fixed
        ></v-navigation-drawer>
        <v-footer color="blue-grey" class="white--text" app>
        </v-footer>
    </v-content>
</template>

<script>
    import Menu from '../../components/Menu'

    export default {
        components: {
            Menu
        },
        data: () => ({
            drawer: true,
            drawerRight: true,
            right: null,
            left: null,

        }),
        props: {
            source: String
        }
    }
</script>

<style scoped>

</style>
