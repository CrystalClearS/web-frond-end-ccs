<template>

    <div class="hover" @click="onClick">
        <v-card class="mx-auto" pa-2>
            <v-img
                    aspect-ratio="1.4" contain
                :src="image"
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
    </div>
</template>

<script>
    export default {
        name: "IcoCatalog",
        props:{
            text: String,
            image: {
                type : String,
                default: 'assets/none.jpg',
            },
            data : Object,
        },
        data: () => ({
            reviews: 413,
            value: 4.5
        }),
        methods: {
            onClick(){
                this.$emit('click', this.data)
            }
        }
    }
</script>

<style scoped>
    .hover:hover{
        cursor: pointer;
    }
</style>
