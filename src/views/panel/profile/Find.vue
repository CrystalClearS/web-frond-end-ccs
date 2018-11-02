/* eslint-disable */
<template>
    <div>
        <v-tabs
                slot="extension"
                v-model="tab"
                align-with-title
        >
            <v-tabs-slider color="blue-grey"></v-tabs-slider>

            <v-tab key="0"> Категории </v-tab>
            <v-tab key="1"> Карта </v-tab>
            <v-tab key="2" v-if="button.isShow"> {{button.title}} </v-tab>

            <v-spacer></v-spacer>
            <!--<v-btn icon @click.native="dialog = !dialog">-->
                <!--<v-icon>search</v-icon>-->
            <!--</v-btn>-->
        </v-tabs>

        <v-tabs-items v-model="tab">
            <!-- Категории -->
            <v-tab-item key="0">
                <v-container fluid grid-list-md>
                    <v-layout row wrap>
                        <v-flex v-for="(element, i) in categories" pa-1 :key="i" xs6 md4 >
                            <IcoCatalog @click="onChangeCategories(element.id, element)" :image="element.image" :text="element.name" ></IcoCatalog>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-tab-item>

            <!-- Карта -->
            <v-tab-item key="1">
                <v-card flat>
                    <v-card-text>
                        <GmapMap
                                :center="{lat:10, lng:10}"
                                :zoom="7"
                                map-type-id="terrain"
                                style="width: 100%; height: 500px"
                        >
                            <!--<GmapMarker-->
                            <!--:key="index"-->
                            <!--v-for="(m, index) in markers"-->
                            <!--:position="m.position"-->
                            <!--:clickable="true"-->
                            <!--:draggable="true"-->
                            <!--@click="center=m.position"-->
                            <!--/>-->
                        </GmapMap>

                    </v-card-text>
                </v-card>
            </v-tab-item>

            <!-- Поиск -->
            <v-tab-item key="2">
                <v-card flat>
                    <v-card-text>
                        <v-layout>
                            <v-flex xs12 md4 flat v-for="(item, i) in users" :key="i" pa-1>
                                <v-card>
                                    <v-img
                                            class="white--text"
                                            width="100%"
                                            src="assets/none.jpg"
                                    >
                                        <v-container fill-height fluid>
                                            <v-layout fill-height>
                                                <v-flex xs12 align-end flexbox>

                                                </v-flex>
                                            </v-layout>
                                        </v-container>
                                    </v-img>
                                    <v-card-title>
                                        <div>
                                            <span>Whitehaven Beach</span><br>
                                            <span>Описание {{item}}</span>
                                        </div>
                                    </v-card-title>
                                    <v-card-actions>
                                        <v-btn flat @click="$router.push({ path: `/profile` })">Подробней</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-flex>
                        </v-layout>

                        <!--<v-btn block flat color="indigo">Посмотреть еще</v-btn>-->
                        <v-btn v-if="users.length === 0" block flat color="indigo">Ничего не найденно</v-btn>
                    </v-card-text>
                </v-card>
            </v-tab-item>

        </v-tabs-items>


    <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
            scrollable
    >
        <v-card tile>
            <v-toolbar card dark color="blue-grey">
                <v-btn icon dark @click.native="dialog = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Поиск</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark flat @click.native="dialog = false">Найти</v-btn>
                </v-toolbar-items>

            </v-toolbar>
            <v-card-text>
                <form>
                    <v-text-field
                            v-model="find"
                            :counter="255"
                            label="Поиск"
                            required
                    ></v-text-field>
                    <v-select
                            :items="sortItems"
                            v-model="sorted"
                            label="Сортировать"
                            required
                    ></v-select>
                    <v-select
                            :items="specializationItems"
                            v-model="specialization"
                            label="Специализация"
                            required
                    ></v-select>
                    <v-select
                            item-text="text"
                            item-value="id"
                            :items="sexItems"
                            v-model="sex"
                            label="Пол"
                            required
                    ></v-select>

                    <v-checkbox
                            v-model="isDeparture"
                            label="Выезд на дом"
                            type="checkbox"
                            required
                    ></v-checkbox>
                    <v-checkbox
                            v-model="isHome"
                            label="У специалиста"
                            type="checkbox"
                            required
                    ></v-checkbox>
                    <v-checkbox
                            v-model="isReviews"
                            label="Только с отззывами"
                            type="checkbox"
                            required
                    ></v-checkbox>

                </form>
                <v-divider></v-divider>
            </v-card-text>
            <div style="flex: 1 1 auto;"></div>
        </v-card>
    </v-dialog>
    </div>
</template>

<script>

    import IcoCatalog  from '../../../components/IcoCatalog'

    export default {
        name: "User",
        components:{
            IcoCatalog
        },
        data () {
            return {
                button: {
                   title : 'Поиск',
                   defaultTitle : 'Поиск',
                   isShow: false,
                },
                users: [

                ],

                categories: [

                ],
                //=======================

                tab: 0,
                rating: 3,
                items: [
                    'Категории', 'Поиск', 'Карта'
                ],
                text: '',
                dialog: false,

                isDeparture: false,
                isHome: false,
                isReviews: false,
                sound: true,
                widgets: false,
                find:"",
                sorted:"",
                sortItems:[
                    'Не выбрано',
                    'По рейтингу',
                    'По цене',
                ],
                specialization:"",
                specializationItems:[
                    'Не выбрано',
                    'По рейтингу',
                    'По цене',
                ],
                sex:"",
                sexItems:[
                    {id:0, text:'Любой'},
                    {id:1, text:'Мужской'},
                    {id:2, text:'Женский'},

                ],

            }
        },
        created: function () {

           this.fetchCategories();
        },
        methods: {
            fetchCategories(){
                net.get('general/category/get')
                    .onSuccess((items)=>{
                        this.categories = items;
                    });
            },
            onChangeCategories(id, element){
                net.get('general/category/{id}/get-services', {id : id})
                    .onSuccess((items)=>{
                        debugger;

                        this.button.title = element.name;
                        this.button.isShow = true;
                        this.tab = 2;

                        this.users = items;
                    });
            }
        }
    }
</script>

<style scoped>

</style>
