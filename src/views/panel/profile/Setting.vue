<template>
    <div>
        <form>
            <v-checkbox
                    v-model="form.push"
                    label="Получать пуш сообшениия"
                    type="checkbox"

            ></v-checkbox>
            <v-checkbox
                    v-model="form.isVisiblePhone"
                    label="Показать номер телефона"
                    type="checkbox"

            ></v-checkbox>

        </form>
    </div>
</template>

<script>
    export default {
        name: "Setting",
        data() {
            return {
                form: {
                    push: true,
                    isVisiblePhone: true,
                }
            }
        }
    }
</script>

<style scoped>

</style>
