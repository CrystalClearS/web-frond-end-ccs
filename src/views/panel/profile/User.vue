<template>
    <v-layout row wrap>
        <v-flex xs12 md4 pa-2>
            <v-card>
                <v-img
                        src="assets/none.jpg"
                        height="200px"
                >
                    <v-layout
                            column
                            fill-height
                    >
                        <v-card-title>
                            <v-spacer></v-spacer>
                            <v-btn dark icon class="mr-3" @click.prevent="dialog = !dialog">
                                <v-icon>edit</v-icon>
                            </v-btn>
                        </v-card-title>
                        <v-spacer></v-spacer>
                    </v-layout>
                </v-img>
                <v-card-title>
                    <div>
                        <span>
                            Текст наполнителя - это текст, который разделяет некоторые характеристики реального письменного текста, но генерируется случайным образом или иным образом. Он может использоваться для отображения выборки шрифтов, генерации текста для тестирования или для подмены фильтра спама по электронной почте.

                        </span>
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

                <v-card-actions>
                    <v-btn block flat color="indigo">Добавить в избраное</v-btn>
                </v-card-actions>
                <v-card-actions>
                    <v-btn block flat color="red">Удалить в избраное</v-btn>
                </v-card-actions>

                <v-list two-line>
                    <v-list-tile @click="">
                        <v-list-tile-action>
                            <v-icon color="indigo">phone</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>(650) 555-1234</v-list-tile-title>
                            <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
                        </v-list-tile-content>

                    </v-list-tile>

                    <v-list-tile @click="">
                        <v-list-tile-action></v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>(323) 555-6789</v-list-tile-title>
                            <v-list-tile-sub-title>Work</v-list-tile-sub-title>
                        </v-list-tile-content>

                    </v-list-tile>

                    <v-divider inset></v-divider>

                    <v-list-tile @click="">
                        <v-list-tile-action>
                            <v-icon color="indigo">mail</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>aliconnors@example.com</v-list-tile-title>
                            <v-list-tile-sub-title>Personal</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile @click="">
                        <v-list-tile-action></v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>ali_connors@example.com</v-list-tile-title>
                            <v-list-tile-sub-title>Work</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <v-divider inset></v-divider>

                    <v-list-tile @click="">
                        <v-list-tile-action>
                            <v-icon color="indigo">location_on</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>1400 Main Street</v-list-tile-title>
                            <v-list-tile-sub-title>Orlando, FL 79938</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-card>
            <br>
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">Избранное</h3>
                    </div>
                    <v-list subheader>
                        <v-list-tile
                                v-for="item in items"
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
                        <h3 class="headline mb-0">Имен Фамилин Отчествович</h3>
                        <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...
                        </div>
                    </div>
                </v-card-title>
                <v-card-actions>
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
                            <!-- Услуги -->
                            <Service/>
                            <br/>
                            <!-- Категории -->
                            <v-card>
                                <v-card-title primary-title>
                                    <div>
                                        <h3 class="headline mb-0">Категории</h3>
                                    </div>
                                </v-card-title>
                                <v-card-text>
                                    <v-list subheader>
                                        <v-list-tile
                                                v-for="item in items"
                                                :key="item.title"
                                                avatar
                                        >
                                            <v-list-tile-avatar>
                                                <img :src="item.avatar">
                                            </v-list-tile-avatar>

                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                            </v-list-tile-content>

                                            <v-list-tile-action>
                                                <v-icon>delete_forever</v-icon>
                                            </v-list-tile-action>
                                        </v-list-tile>
                                    </v-list>
                                </v-card-text>
                                <v-btn block flat color="grey" @click.prevent="dialogCategory = !dialogCategory">
                                    Добавить категории
                                </v-btn>
                            </v-card>

                            <br/>
                            <v-card>
                                <v-card-title primary-title>
                                    <div>
                                        <h3 class="headline mb-0">Работы</h3>
                                    </div>
                                </v-card-title>
                                <v-card-text>
                                    <v-layout row wrap>
                                        <v-flex
                                                v-for="n in 9"
                                                :key="n"
                                                xs4
                                                d-flex
                                        >
                                            <v-card flat tile class="d-flex">
                                                <v-img @click="`#`"
                                                       :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                                                       :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                                                       aspect-ratio="1"
                                                       class="grey lighten-2"
                                                >
                                                    <v-layout
                                                            slot="placeholder"
                                                            fill-height
                                                            align-center
                                                            justify-center
                                                            ma-0
                                                    >
                                                        <v-progress-circular indeterminate
                                                                             color="grey lighten-5"></v-progress-circular>
                                                    </v-layout>
                                                </v-img>
                                            </v-card>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                                <v-btn block flat color="grey">Добавить работы</v-btn>
                            </v-card>
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
                v-model="dialog"
                max-width="500px"
                hide-overlay
                transition="dialog-bottom-transition"
                scrollable
        >


            <v-card tile>
                <v-toolbar card dark color="blue-grey">
                    <v-btn icon dark @click.native="dialog = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Настройки</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click.native="dialog = false">Сохранить</v-btn>
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
                                                v-model="form.last_name"
                                                :counter="255"
                                                label="Имя"
                                                required
                                        ></v-text-field>
                                        <v-text-field
                                                v-model="form.first_name"
                                                :counter="255"
                                                label="Фамилия"
                                                required
                                        ></v-text-field>

                                        <v-text-field
                                                v-model="form.phone"
                                                label="Телефон"
                                                required
                                        ></v-text-field>
                                        <v-text-field
                                                v-model="form.phone1"
                                                label="Доп. телефон"
                                        ></v-text-field>

                                        <v-text-field
                                                v-model="form.email"
                                                label="Почта"
                                        ></v-text-field>
                                        <v-text-field
                                                v-model="form.email1"
                                                label="Доп. почта"
                                        ></v-text-field>

                                        <v-select
                                                item-value="id"
                                                :items="sexItems"
                                                v-model="form.sex"
                                                label="Пол"
                                        ></v-select>

                                        <v-textarea
                                                label="Описание"
                                                v-model="form.description"
                                        ></v-textarea>

                                        <v-checkbox
                                                v-model="form.isDeparture"
                                                label="Выезд на дом"
                                                type="checkbox"
                                        ></v-checkbox>
                                        <v-checkbox
                                                v-model="form.isHome"
                                                label="У специалиста"
                                                type="checkbox"
                                        ></v-checkbox>
                                        <v-checkbox
                                                v-model="form.isReviews"
                                                label="Только с отззывами"
                                                type="checkbox"

                                        ></v-checkbox>

                                    </form>
                                </v-card-text>
                            </v-card>
                        </v-expansion-panel-content>

                        <v-expansion-panel-content>
                            <div slot="header">Время</div>
                            <v-card>
                                <v-card-text>
                                    <form action="">
                                        <v-menu
                                                ref="menu"
                                                :close-on-content-click="false"
                                                v-model="menu"
                                                :nudge-right="40"
                                                lazy
                                                transition="scale-transition"
                                                offset-y
                                                full-width
                                        >
                                            <v-text-field
                                                    slot="activator"
                                                    v-model="dateFormatted"
                                                    label="Date"
                                                    hint="MM/DD/YYYY format"
                                                    persistent-hint
                                                    prepend-icon="event"
                                                    @blur="date = parseDate(dateFormatted)"
                                            ></v-text-field>
                                            <v-date-picker v-model="date" no-title
                                                           @input="menu = false"></v-date-picker>
                                        </v-menu>


                                        <v-container fluid grid-list-md>
                                            <v-layout row wrap>
                                                <v-flex v-for="(item,i) in 16" :key="i" xs12 md6>
                                                    <v-checkbox
                                                            :label="(item + 6) + `:00  - ` + (i + 7) + `:00`"
                                                            hide-details
                                                    ></v-checkbox>
                                                </v-flex>
                                            </v-layout>
                                        </v-container>
                                    </form>
                                </v-card-text>
                            </v-card>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-divider></v-divider>
                </v-card-text>

                <div style="flex: 1 1 auto;"></div>
            </v-card>
        </v-dialog>
        <!-- Услуги -->
        <v-dialog
                v-model="dialogService"
                max-width="500px"
                hide-overlay
                transition="dialog-bottom-transition"
                scrollable
        >
            <v-card tile>
                <v-toolbar card dark color="blue-grey">
                    <v-btn icon dark @click.native="dialogService = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Услуги</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click.native="dialogService = false">Добавить</v-btn>
                    </v-toolbar-items>

                </v-toolbar>
                <v-card-text>
                    <form color="blue-grey">
                        <v-text-field
                                v-model="formService.description"
                                :counter="255"
                                label="Описание"
                                required
                        ></v-text-field>
                        <v-text-field
                                v-model="formService.price"
                                :counter="10"
                                label="Цена"
                                required
                        ></v-text-field>
                        <v-text-field
                                v-model="formService.currency"
                                :counter="10"
                                label="Валюта"
                                required
                        ></v-text-field>
                        <v-text-field
                                v-model="formService.count"
                                :counter="10"
                                label="Количество"
                                required
                        ></v-text-field>
                        <v-text-field
                                v-model="formService.unit"
                                :counter="10"
                                label="Ед. измерения"
                                required
                        ></v-text-field>
                    </form>
                </v-card-text>

                <div style="flex: 1 1 auto;"></div>
            </v-card>
        </v-dialog>
        <!-- Категории -->
        <v-dialog
                v-model="dialogCategory"
                max-width="500px"
                hide-overlay
                transition="dialog-bottom-transition"
                scrollable
        >
            <v-card tile>
                <v-toolbar card dark color="blue-grey">
                    <v-btn icon dark @click.native="dialogCategory = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Категории</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click.native="dialogCategory = false">Добавить</v-btn>
                    </v-toolbar-items>

                </v-toolbar>
                <v-card-text>
                    <v-list
                            subheader
                            two-line
                    >
                        <v-list-tile @click="">
                            <v-list-tile-action>
                                <v-checkbox v-model="formCategories.notifications"></v-checkbox>
                            </v-list-tile-action>
                            <v-list-tile-avatar>
                                <img :src="`assets/none.jpg`">
                            </v-list-tile-avatar>

                            <v-list-tile-content @click="formCategories.notifications = !formCategories.notifications">
                                <v-list-tile-title>Notifications</v-list-tile-title>
                                <v-list-tile-sub-title>Allow notifications</v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-card-text>

                <div style="flex: 1 1 auto;"></div>
            </v-card>
        </v-dialog>

    </v-layout>
</template>

<script>
    import Reviews from '../../../components/Reviews'
    import Service from './components/Service'

    export default {
        name: "User",
        components: {
            Reviews,
            Service
        },
        data: () => ({
            rating: 4.5,
            dialog: false,
            dialogService: false,
            dialogCategory: false,
            sexItems: [
                {'id': 0, 'text': 'Не указано'},
                {'id': 1, 'text': 'Мужской'},
                {'id': 2, 'text': 'Женский'},
            ],
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
            formService: {
                description: "",
                price: "",
                currency: "",
                count: "",
                unit: "",
            },
            formCategories: {
                items: [],

                notifications: false,
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
            date: null,
            dateFormatted: null,
            menu: false,
        }),
        computed: {
            computedDateFormatted() {
                return this.formatDate(this.date)
            }
        },
        watch: {
            date(val) {
                this.dateFormatted = this.formatDate(this.date)
            }
        },
        methods: {
            formatDate(date) {
                if (!date) return null

                const [year, month, day] = date.split('-')
                return `${month}/${day}/${year}`
            },
            parseDate(date) {
                if (!date) return null

                const [month, day, year] = date.split('/')
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            }
        }
    }
</script>

<style scoped>

</style>
