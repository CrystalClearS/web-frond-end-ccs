<template>
    <v-card>
        <GmapMap
                :center="{lat:10, lng:10}"
                :zoom="7"
                map-type-id="terrain"
                style="width: 100%; height: 500px"
        >
            <!--<GmapMarker-->
            <!--:key="index"-->
            <!--v-for="(m, index) in markers"-->
            <!--:position="m.position"-->
            <!--:clickable="true"-->
            <!--:draggable="true"-->
            <!--@click="center=m.position"-->
            <!--/>-->
        </GmapMap>
    </v-card>
</template>

<script>
    export default {
        name: "Maps"
    }
</script>

<style scoped>

</style>
