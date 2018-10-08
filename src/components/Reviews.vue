<template>
    <div class="">
        <v-list two-line>
            <template v-for="(item, index) in items">
                <v-subheader
                        v-if="item.header"
                        :key="item.header"
                >
                    {{ item.header }}
                </v-subheader>

                <v-divider
                        v-else-if="item.divider"
                        :inset="item.inset"
                        :key="index"
                ></v-divider>

                <v-list-tile
                        v-else
                        :key="item.title"
                        avatar
                        @click=""
                >

                    <v-list-tile-avatar>
                        <img :src="item.avatar">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title v-html="item.title"></v-list-tile-title>
                        <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                        <v-rating
                                v-model="item.rating"
                                background-color="info"
                                color="info"
                                small
                                :readonly="false"
                        ></v-rating>
                    </v-list-tile-content>
                </v-list-tile>
            </template>
        </v-list>
        <br>
        <br>
        <br>
        <v-layout row wrap align-content-end>
            <v-flex xs8>
                <v-textarea
                        v-model="message"
                        color="info"
                        rows=3
                        :counter="128"
                ></v-textarea>
            </v-flex>
            <v-flex xs4 pa-2>
                <v-rating
                        v-model="rating"
                        background-color="info"
                        color="info"
                        small
                        block
                ></v-rating>
                <v-btn
                        color="info"
                        @click.native="loader = 'loading'; onSend()"
                        block
                >
                    Отправить
                    <span slot="loader" class="custom-loader">
                       <v-icon light>cached</v-icon>
                    </span>
                </v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        name: "Reviews",
        data() {
            return {
                loader: "",
                loading: false,
                message: "",
                rating: 0,
                items: [
                    {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                        title: 'Brunch this weekend?',
                        subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
                        rating: 3,
                    },
                    {divider: true, inset: true},
                    {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
                        subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
                        rating: 4,
                    },
                    {divider: true, inset: true},
                    {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                        title: 'Oui oui',
                        subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
                        rating: 1,
                    }
                ]
            }
        },
        methods: {
            onSend() {
                this.rating = 0;
                this.message = "";
            }
        }
    }
</script>

<style scoped>

</style>
