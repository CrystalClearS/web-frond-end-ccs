<template>
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
</template>

<script>
    export default {
        name: "service"
    }
</script>

<style scoped>

</style>
