<template>
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
                            v-model="date"
                            label="Date"
                            hint="YYYY-MM-DD format"
                            persistent-hint
                            prepend-icon="event"
                    ></v-text-field>
                    <v-date-picker v-model="date" no-title
                                   @input="onChangeDate"></v-date-picker>
                </v-menu>


                <v-container fluid grid-list-md>
                    <v-layout row wrap>
                        <v-flex v-for="(item, i) in items" :key="i" xs12 md6>
                            <v-checkbox
                                    v-model="items[i]"
                                    @change="onChange(i)"
                                    :label="(i + 6) + `:00  - ` + (i + 7) + `:00`"
                                    hide-details
                            ></v-checkbox>
                        </v-flex>
                    </v-layout>
                </v-container>
            </form>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "user_time",
        props: {
            'isUser' : false,
        },
        created: function () {
            let now = new Date();
            let date = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;

            this.date = date;
            this.fetchTime()
        },
        data: () => ({
            items: [],
            menu: false,
            date: null,
            dateFormatted: null,
        }),
        methods : {
            fetchTime(){
                net.get('master/working-schedule/get?date={date}', {
                    date : this.date
                })
                    .onSuccess((items)=>{
                        this.items = items;
                    });
            },
            onChangeDate(){
                this.menu = false;
                this.fetchTime();
            },
            onChange(index){
                let url = 'master/working-schedule/' + (!this.items[index] ? 'set' : 'unset');
                net.post(url, {
                    date : this.date,
                    hour : index,
                })
            }
        }
    }
</script>

<style scoped>

</style>
