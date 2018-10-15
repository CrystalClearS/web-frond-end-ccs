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
                        <v-list-tile-title>Show your status</v-list-tile-title>
                        <v-list-tile-sub-title>Your status is visible to everyone
                        </v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-icon>delete_forever</v-icon>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
        </v-card-text>
        <v-btn block flat color="grey" @click.prevent="dialogService = !dialogService">Добавить
            услуги
        </v-btn>
    </v-card>
</template>

<script>
    export default {
        name: "service"
    }
</script>

<style scoped>

</style>
