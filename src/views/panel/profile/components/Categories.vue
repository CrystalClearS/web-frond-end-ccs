<template>
    <v-card>
        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">Категории</h3>
            </div>
        </v-card-title>
        <v-card-text v-show="items.length > 0">
            <v-list subheader>
                <v-list-tile
                        v-for="(item, index) in items"
                        :key="item.title"
                        avatar
                >
                    <v-list-tile-avatar>
                        <img :src="item.avatar">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title v-html="item.name"></v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action v-if="isUser">
                        <v-icon @click="onDelete(index, item.id)">delete_forever</v-icon>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
        </v-card-text>

        <v-btn v-if="isUser" block flat color="grey" @click.prevent="dialogEdit = !dialogEdit">
            Добавить категории
        </v-btn>

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
                    <v-toolbar-title>Категории</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click.native="onAddItems">Добавить</v-btn>
                    </v-toolbar-items>

                </v-toolbar>
                <v-card-text>
                    <v-list
                            subheader
                            two-line
                    >
                        <v-list-tile v-for="item in categories" :key="item.id">
                            <v-list-tile-action>
                                <v-checkbox v-model="item.isChecked"></v-checkbox>
                            </v-list-tile-action>

                            <v-list-tile-avatar>
                                <img :src="item.image">
                            </v-list-tile-avatar>

                            <v-list-tile-content @click="item.isChecked = !item.isChecked">
                                <v-list-tile-title>{{item.name}}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-card-text>

                <div style="flex: 1 1 auto;"></div>
            </v-card>
        </v-dialog>

    </v-card>
</template>

<script>
    export default {
        name: "categories",
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
            this.fetchCategories();
            this.fetchUserCategories();
        },
        data: () => ({
            dialogEdit: false,
            categories : [],
            items: [],
        }),
        methods : {
            fetchUserCategories(){
                net.get('master/get-categories')
                    .onSuccess((items)=>{
                        this.items = items;
                    });
            },
            fetchCategories(){
                net.get('general/category/get')
                    .onSuccess((items)=>{
                        for(let i in items){
                            items[i].isChecked = false;
                        }
                        this.categories = items;
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

        }
    }
</script>

<style scoped>

</style>
