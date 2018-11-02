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
        <v-footer color="blue-grey" class="white--text" app></v-footer>

        <!-- Авторизация -->
        <v-dialog v-model="isShowAuthWindow" persistent max-width="600px" >
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click.native="isShowAuthWindow = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Авторизация</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-stepper v-model="e1">
                    <v-stepper-header>
                        <v-stepper-step :complete="e1 > 1" step="1">Введите данные для авторизации</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step :complete="e1 > 2" step="2">Подтвердите код</v-stepper-step>
                    </v-stepper-header>
                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <div class="" v-show="!isLoad">
                                <v-card-text>
                                    <!--<v-select :items="country"-->
                                              <!--label="Standard"-->
                                    <!--&gt;</v-select>-->
                                    <v-text-field
                                            required
                                            label="Введите номер телефона"
                                            v-model="auth.phone"
                                            mask="phone"
                                    ></v-text-field>
                                    <span class="caption grey--text text--darken-1"></span>
                                </v-card-text>
                                <v-btn color="primary" @click="onGetCode">
                                    Получить код
                                </v-btn>
                                <v-btn color="primary" @click="e1 = 2">
                                    Далее
                                </v-btn>
                                <v-btn flat>Отмена</v-btn>
                            </div>
                            <v-progress-linear v-show="isLoad" :indeterminate="true"></v-progress-linear>
                        </v-stepper-content>
                        <v-stepper-content step="2">
                            <v-card-text>
                                <v-text-field
                                        required
                                        label="Код"
                                        v-model="auth.code"
                                ></v-text-field>
                                <span class="caption grey--text text--darken-1"></span>
                            </v-card-text>

                            <v-btn color="primary" @click="onAuthorization">
                                Готово
                            </v-btn>

                            <v-btn flat>Отмена</v-btn>

                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-card>
        </v-dialog>

    </v-content>
</template>

<script>
    import Menu from '../../components/Menu'

    export default {
        components: {
            Menu
        },
        created: function () {
           // net.get('general/countries/get')
           //     .onSuccess((items)=>{
           //
           //     });
        },
        data: () => ({
            drawer: true,
            drawerRight: true,
            right: null,
            left: null,

            isAuth: false,
            e1: 0,

            isLoad : false,
            country: [],
            auth : {
                phone : '',
                code  : '',
            },

        }),
        props: {
            source: String
        },
        methods:{
            //
            onGetCode(){
                let $this   = this;
                this.isLoad = true;

                net.post('auth/send-sms', {phone : this.auth.phone})
                    .onSuccess((items)=>{
                        $this.e1 = 2;
                        $this.isLoad = false;
                    })
                    .onError('Ошибка получения');
            },
            onAuthorization(){
                let $this   = this;
                this.isLoad = true;

                net.post('auth/register', {
                    phone : this.auth.phone,
                    code  : this.auth.code,
                })
                    .onSuccess((items)=>{
                        $this.isLoad = false;
                        $this.$store.dispatch('setShowAuth', false);
                        $this.$router.push({path: this.$store.getters.action});

                        net.updateUser((user)=>{
                            $this.$store.dispatch('setUser', user);
                        });
                    })
                    .onError('Ошибка получения');
            }
        },
        computed: {
            isShowAuthWindow : {
                get: function() {
                    return this.$store.getters.isShowAuth;
                },
                // сеттер:
                set: function(value) {
                  this.$store.dispatch('setShowAuth', value);
                }
            }
        }
    }
</script>

<style scoped>

</style>
