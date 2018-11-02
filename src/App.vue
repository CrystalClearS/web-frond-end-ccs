<template>
    <v-app>
        <router-view></router-view>
    </v-app>
</template>

<script>
    export default {
        name: 'App',
        components: {},
        created: function () {

            localStorage.removeItem('access');
            let refresh = localStorage.getItem('refresh');

            if (refresh) {
                let $this = this;
                net.get('client/profile/get')
                    .setParametrs((data) => {
                        data.reset = true;
                        data.isReAuth = true;
                        return data;
                    })
                    .onSuccess((user) => {
                        debugger
                        $this.$store.dispatch('setUser', user);
                    });
            }
        },
        data() {
            return {}
        }
    }
</script>
<style scoped>
    .theme--light.application {
        background: #ffffff;
    }
</style>
