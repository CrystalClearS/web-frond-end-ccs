<template>
    <div class="chat">
        <v-toolbar tabs flat color="grey lighten-5">
            <v-btn icon @click="onBack">
                <v-icon>keyboard_backspace</v-icon>
            </v-btn>
            <v-toolbar-title>{{title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <!--<v-btn icon>-->
                <!--<v-icon>search</v-icon>-->
            <!--</v-btn>-->
        </v-toolbar>

        <v-list three-line>
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
                    </v-list-tile-content>

                    <v-list-tile-action>
                        <v-icon
                                v-if="item.is_sent"
                                color="grey lighten-1"
                        >
                            chat_bubble
                        </v-icon>
                        <v-progress-circular
                                v-else
                                indeterminate
                                color="grey lighten-1"
                        ></v-progress-circular>

                    </v-list-tile-action>
                </v-list-tile>
            </template>
        </v-list>


        <v-form>
            <v-container>
                <v-layout row wrap>

                    <v-flex xs10>
                        <v-textarea
                                v-model="message"
                                auto-grow
                                rows="1"
                                value=""
                        ></v-textarea>
                    </v-flex>
                    <v-flex xs2>
                        <v-btn color="primary" flat @click="onSend">
                            <v-icon>send</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-form>

        <v-layout row wrap>
            <v-flex xs6>

            </v-flex>
        </v-layout>


    </div>
</template>

<script>
    export default {
        name: "Chat",
        created: function () {
            this.onFetch()
        },

        props:{
            chat_id: {
                type: Number,
                default: 0
            },
            'isUser' : false,
        },
        data: () => ({
            title : "Чат",
            items : [
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                    title: 'Brunch this weekend?',
                    subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
                    is_sent : true
                },
                { divider: true, inset: true },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                    title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
                    subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
                    is_sent : true
                },
                { divider: true, inset: true },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                    title: 'Oui oui',
                    subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
                },
                { divider: true, inset: true },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                    title: 'Birthday gift',
                    subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
                },
                { divider: true, inset: true },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                    title: 'Recipe to try',
                    subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
                }

            ],
            message : '',
        }),
        methods:{
            onFetch(){
                net.get(`client/chats/get-chat/${chat_id}`)
                    .onSuccess((items) => {
                        this.items = items;
                    });
            },
            onSend(){
                net.post(`/client/chats/add-message`, {
                    message : this.message,
                    master_id : this.chat_id,
                })
                    .onSuccess((result) => {

                    });

                this.message = 0;
            },
            onBack(){
                this.$router.push({ name: 'message'})
            }
        }
    }
</script>

<style scoped>

</style>
