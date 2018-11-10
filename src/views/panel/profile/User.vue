<template>
    <v-layout row wrap>
        <v-flex xs12 md4 pa-2>
            <v-card>
                <v-img
                        :src="userAvatar"
                        height="200px"
                >
                    <v-layout
                            column
                            fill-height
                    >
                        <v-card-title>
                            <v-spacer></v-spacer>
                            <v-btn dark icon class="mr-3">
                                <v-icon>edit</v-icon>
                            </v-btn>
                        </v-card-title>
                        <v-spacer></v-spacer>
                    </v-layout>
                </v-img>

                <div class="" v-if="isUserEdit">
                    <v-btn id="pick-avatar" block flat color="indigo">Загрузить аватарку</v-btn>
                    <v-btn  @click.prevent="dialogUserEdit = !dialogUserEdit" block flat color="indigo">Настройки</v-btn>
                    <avatar-cropper
                            @uploaded="handleUploaded"
                            trigger="#pick-avatar"
                            upload-form-name="image"
                            :upload-url="imageUpload"
                            :upload-headers="imageHeaders"
                            :labels="{submit: 'Принять', cancel: 'Отмена'}"
                            />
                </div>
                <v-card-title>
                    <div>
                        <v-rating
                                v-model="rating"
                                :readonly="true"
                                color="yellow darken-3"
                                background-color="grey darken-1"
                                empty-icon="$vuetify.icons.ratingFull"
                                half-increments
                        ></v-rating>
                    </div>
                </v-card-title>
                <v-card-actions v-if="!isUserEdit">
                    <v-card-actions>
                        <v-btn block flat color="indigo">Добавить в избраное</v-btn>
                    </v-card-actions>
                    <v-card-actions>
                        <v-btn block flat color="red">Удалить в избраное</v-btn>
                    </v-card-actions>
                </v-card-actions>

                <v-list two-line>
                    <v-list-tile @click="" v-if="userIsPhone">
                        <v-list-tile-action>
                            <v-icon color="indigo">phone</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{userPhone}}</v-list-tile-title>
                            <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <!--<v-list-tile @click="">-->
                        <!--<v-list-tile-action></v-list-tile-action>-->

                        <!--<v-list-tile-content>-->
                            <!--<v-list-tile-title>(323) 555-6789</v-list-tile-title>-->
                            <!--<v-list-tile-sub-title>Work</v-list-tile-sub-title>-->
                        <!--</v-list-tile-content>-->

                    <!--</v-list-tile>-->

                    <v-divider inset></v-divider>
                    <v-list-tile @click="" v-if="userIsEmail">
                        <v-list-tile-action>
                            <v-icon color="indigo">mail</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>{{userEmail}}</v-list-tile-title>
                            <v-list-tile-sub-title>Personal</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <v-divider inset></v-divider>

                    <v-list-tile @click="">
                        <v-list-tile-action>
                            <v-icon color="indigo">location_on</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>{{userAddress}}</v-list-tile-title>
                            <v-list-tile-sub-title></v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-card>
            <br>

            <v-card v-if="favorites.length > 0">
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">Избранное</h3>
                    </div>
                    <v-list subheader>
                        <v-list-tile
                                v-for="item in favorites"
                                :key="item.title"
                                avatar
                        >
                            <v-list-tile-avatar>
                                <img :src="item.avatar">
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                            </v-list-tile-content>

                        </v-list-tile>
                    </v-list>
                </v-card-title>

            </v-card>

        </v-flex>
        <!-- ----------------------------------------------------------------- -->
        <v-flex xs12 md8 pa-2>
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">{{userFullName}}</h3>
                        <div>{{userDescription}}</div>
                    </div>
                </v-card-title>
                <v-card-actions v-if="!isUserEdit">
                    <v-btn flat color="orange">Связаться</v-btn>
                    <v-btn flat color="orange">Позвонить</v-btn>
                </v-card-actions>
            </v-card>
            <br/>

            <v-tabs
                    slot="extension"
                    v-model="tab"
                    align-with-title
            >
                <v-tabs-slider color="blue-grey"></v-tabs-slider>
                <v-tab v-for="(item,i) in tabs" :key="i">
                    {{ item }}
                </v-tab>
                <v-spacer></v-spacer>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item :key="0">
                    <v-card flat>
                        <v-card-text>
                            <!-- Категории -->
                            <Categories :isUser="isUserEdit"/>
                            <br/>
                            <!-- Услуги -->
                            <Service :isUser="isUserEdit" :data="user.services" v-if="isServiceView"/>
                            <br/>
                            <!-- Портфолио -->
                            <Works  v-if="isPortfolioView" :models="user.portfolio"/>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item :key="1">
                    <v-card flat>
                        <v-card-text>
                            <Reviews></Reviews>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-flex>

        <!-- Настройки -->
        <v-dialog
                v-if="isUserEdit"
                v-model="dialogUserEdit"
                max-width="500px"
                hide-overlay
                transition="dialog-bottom-transition"
                scrollable
        >

            <v-card tile>
                <v-toolbar card dark color="blue-grey">
                    <v-btn icon dark @click.native="dialogUserEdit = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Настройки</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click.native="onSaveUser">Сохранить</v-btn>
                    </v-toolbar-items>

                </v-toolbar>
                <v-card-text>

                    <v-expansion-panel popout>
                        <v-expansion-panel-content :key="0">
                            <div slot="header">Основные</div>
                            <v-card>
                                <v-card-text>
                                    <form>
                                        <v-text-field
                                                v-model="user.first_name"
                                                :counter="255"
                                                label="Имя"
                                                required
                                        ></v-text-field>
                                        <v-text-field
                                                v-model="user.surname"
                                                :counter="255"
                                                label="Фамилия"
                                                required
                                        ></v-text-field>
                                        <v-text-field
                                                v-model="user.phone1"
                                                label="Доп. телефон"
                                        ></v-text-field>
                                        <v-text-field
                                                v-model="user.email"
                                                label="Почта"
                                        ></v-text-field>
                                        <v-text-field
                                                v-model="user.email1"
                                                label="Доп. почта"
                                        ></v-text-field>
                                        <v-select
                                                item-value="id"
                                                :items="sexItems"
                                                v-model="user.gender"
                                                label="Пол"
                                        ></v-select>
                                        <v-textarea
                                                label="Описание"
                                                v-model="user.about"
                                        ></v-textarea>
                                        <v-checkbox
                                                v-model="user.home_call"
                                                label="Выезд на дом"
                                                type="checkbox"
                                        ></v-checkbox>
                                        <v-checkbox
                                                v-model="user.isHome"
                                                label="У специалиста"
                                                type="checkbox"
                                        ></v-checkbox>
                                    </form>
                                </v-card-text>
                            </v-card>
                        </v-expansion-panel-content>

                        <v-expansion-panel-content>
                            <div slot="header">Время</div>
                            <UserTime/>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-divider></v-divider>
                </v-card-text>

                <div style="flex: 1 1 auto;"></div>
            </v-card>
        </v-dialog>

        <!-- Категории -->


    </v-layout>
</template>

<script>
    import Reviews from '../../../components/Reviews'
    import UserTime from './components/UserTime'
    import Service from './components/Service'
    import Categories from './components/Categories'
    import Works from './components/Works'

    import AvatarCropper from "vue-avatar-cropper"

    export default {
        name: "User",
        components: {
            UserTime,
            Reviews,
            Service,
            Categories,
            Works,
            AvatarCropper,
        },
        created: function () {
            let url = !this.id ? 'client/profile/get' : `api/general/client/${this.id}/get`;
            net.get(url)
                .onSuccess((user) => {
                    this.user = user;
                });
        },
        props:{
            id: {
                type: Number,
                default: 0
            },
        },
        data: () => ({
            favorites:[],
            user: {
                gender: "",
                last_name: "",
                first_name: "",
                surname: "",
                phone: "",
                phone1: "",
                home_call: "",
                email: "",
                email1: "",
                address: "Не указан",
                about: "Описания нет",
            },
            sexItems: [
                {'id': 0, 'text': 'Не указано'},
                {'id': 1, 'text': 'Мужской'},
                {'id': 2, 'text': 'Женский'},
            ],
            rating: 4.5,
            dialogService: false,
            dialogUserEdit: false,
            form: {
                last_name: "",
                first_name: "",
                phone: "",
                phone1: "",
                email: "",
                email1: "",
                description: "",
                isDeparture: true,
                isHome: true,
                isReviews: true,
            },

            tab: null,
            tabs: [
                'Кейсы', 'Отзывы'
            ],
            items: [

                {
                    avatar: 'assets/none.jpg',
                    title: 'Brunch this weekend?',

                },

                {
                    avatar: 'assets/none.jpg',
                    title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',

                },

                {
                    avatar: 'assets/none.jpg',
                    title: 'Oui oui',

                },
            ],


        }),

        computed: {
            //=====================================
            isUserEdit() {
                return this.id === 0
            },
            computedDateFormatted() {
                return this.formatDate(this.date)
            },
            userFullName(){
                if(!this.user.first_name){
                    return 'Имя не указано';
                }
                return this.user.first_name + ' ' + this.user.surname;
            },
            userDescription(){
                return this.user.about;
            },
            //======================================
            userPhone(){
                return this.user.phone;
            },
            userIsPhone(){
                return this.user.phone ? this.user.phone.length > 0 : false;
            },
            //======================================
            userEmail(){
                return this.user.email;
            },
            userIsEmail(){
                return this.user.email ? this.user.email.length > 0 : false;
            },

            userAvatar(){
                return this.user.avatar;
            },
            userAddress(){
                return this.user.address;
            },
            //=======================================
            isServiceView(){
                return this.id === 0 || this.user.services.length > 0
            },
            isPortfolioView(){
                return this.id === 0 || this.user.services.length > 0
            },
            //========================================
            imageUpload(){
                return net.createUrl('client/portfolio/add-image')
            },
            imageHeaders(){
                return net.getHeaders();
            }

        },
        watch: {
            date(val) {
                this.dateFormatted = this.formatDate(this.date)
            }
        },
        methods: {
            onSaveUser(){
               let $this = this;
                net.post('client/profile/update', this.user)
                    .onSuccess(()=>{
                        $this.dialogUserEdit = false;
                    })
                    .onError('Ошибка при обновлении пользователя')
            },
            handleUploaded(resp) {
                showModal('Аватарка обновленна');
               // this.user.avatar = resp.relative_url;
            }

        }
    }
</script>

<style scoped>

</style>
