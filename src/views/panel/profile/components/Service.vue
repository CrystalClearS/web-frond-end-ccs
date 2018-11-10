<template>
    <v-card>
        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">Услуги</h3>
            </div>
        </v-card-title>
        <v-card-text>
            <v-list two-line subheader>
                <v-list-tile avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>Работа с API</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-icon>delete_forever</v-icon>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
        </v-card-text>
        <v-btn block flat color="grey" @click.prevent="dialogEdit = !dialogEdit">
            Добавить услуги
        </v-btn>
        <!-- Услуги -->
        <v-dialog
                v-model="dialogEdit"
                max-width="500px"
                hide-overlay
                transition="dialog-bottom-transition"
                scrollable
        >
            <v-card tile>
                <v-toolbar card dark color="blue-grey">
                    <v-btn icon dark @click.native="dialogEdit = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Услуги</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click.native="dialogEdit = false">Добавить</v-btn>
                    </v-toolbar-items>

                </v-toolbar>
                <v-card-text>
                    <form color="blue-grey">
                        <v-text-field
                                v-model="form.description"
                                :counter="255"
                                label="Описание"
                                required
                        ></v-text-field>
                        <v-text-field
                                v-model="form.price"
                                :counter="10"
                                label="Цена"
                                required
                        ></v-text-field>
                        <v-text-field
                                v-model="form.currency"
                                :counter="10"
                                label="Валюта"
                                required
                        ></v-text-field>
                        <v-text-field
                                v-model="form.count"
                                :counter="10"
                                label="Количество"
                                required
                        ></v-text-field>
                        <v-text-field
                                v-model="form.unit"
                                :counter="10"
                                label="Ед. измерения"
                                required
                        ></v-text-field>
                    </form>
                </v-card-text>

                <div style="flex: 1 1 auto;"></div>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
    export default {
        name: "service",
        props: {
            'isUser' : false,
            'data' : {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        created: function () {
            if(!this.isUser){
                this.items = data;
                return;
            }
            this.fetchUserService();
        },
        data: () => ({
            dialogEdit: false,
            categories : [],
            items: [],
            form: {
                description: "",
                price: "",
                currency: "",
                count: "",
                unit: "",
            },
        }),
        methods : {
            fetchUserService(){
                net.get('master/get-services')
                    .onSuccess((items)=>{
                        this.items = items;
                    });
            },
            onAddItems(){
                this.dialogEdit = false;
                for(let i in this.categories){
                    let item = this.categories[i];
                    if(item.isChecked){
                        net.post('master/add-category', {
                            'category_id' : item.id
                        })
                    }
                }
                this.fetchUserCategories();
            },
            onDelete(index, id){
                alert(`Я бы удалил запись ${index} с id ${id} но нет АПИ`);
            }

        },

    }
</script>

<style scoped>

</style>
