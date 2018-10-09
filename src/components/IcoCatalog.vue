<template>
    <v-card
            class="mx-auto" pa-2
    >
        <v-img
                :aspect-ratio="16/9"
                src="assets/none.jpg"
        ></v-img>
        <v-card-title>
            <div>
                <span class="headline">{{text}}</span>
            </div>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
        </v-card-title>
    </v-card>
</template>

<script>
    export default {
        name: "IcoCatalog",
        props:{
            text: String,
        },
        data: () => ({
            reviews: 413,
            value: 4.5
        })
    }
</script>

<style scoped>

</style>
