<template>
    <v-list dense>
        <template v-for="(item, index) in items">
            <v-layout
                    row
                    v-if="item.heading"
                    align-center
                    :key="item.heading"
            >
                <v-flex xs6>
                    <v-subheader v-if="item.heading">
                        {{ item.heading }}
                    </v-subheader>
                </v-flex>
                <v-flex xs6 class="text-xs-center">
                    <a href="#!" class="body-2 black--text">EDIT</a>
                </v-flex>
            </v-layout>
            <v-list-group
                    v-else-if="item.children"
                    v-model="item.model"
                    :key="item.text"
                    :prepend-icon="item.model ? item.icon : item['icon-alt']"
                    append-icon=""
            >
                <v-list-tile slot="activator">
                    <v-list-tile-content>
                        <v-list-tile-title>
                            {{ item.text }}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile
                        v-for="(child, i) in item.children"
                        :key="i"
                        @click="onClick(child, index, i)"
                >
                    <v-list-tile-action v-if="child.icon">
                        <v-icon>{{ child.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            {{ child.text }}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list-group>
            <v-list-tile v-else @click="onClick(item, index, 0)" :key="item.text">
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>
                        {{ item.text }}
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </template>
    </v-list>
</template>

<script>
    export default {
        name: "Menu",
        data: ()=> ({
            items: [
                { icon: 'home', text: 'Главная', action:'/'},
                { icon: 'person', text: 'Профиль', action:'/profile' },
                { icon: 'message', text: 'Сообщения', action:'/message' },
                { icon: 'settings', text: 'Настройки', action:'/config' },
                { icon: 'location_on', text: 'Город', action:'/maps' },
                {
                    icon: 'keyboard_arrow_up',
                    'icon-alt': 'keyboard_arrow_down',
                    text: 'Тест',
                    model: false,
                    children: [
                        { text: 'Import' },
                        { text: 'Export' },
                        { text: 'Print' },
                        { text: 'Undo changes' },
                        { text: 'Other contacts' }
                    ]
                },
            ]
        }),
        methods : {
            onClick(item, i, a){
                this.$router.push({ path: item.action });
            }
        }
    }
</script>

<style scoped>

</style>
