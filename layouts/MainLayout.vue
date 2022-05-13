<template>
    <v-app class="content">
        <v-main>
        <nuxt />
        </v-main>
    </v-app>
</template>

<script>
export default {
  name: 'MainLayout',
}
</script>

<style scoped>
.content {
    background-image: url('~assets/bg-auth.png');
    background-repeat: repeat;
    transform: rotate(360deg);
    background-size: cover;
    background-position: -300px 50%;
    background-attachment: fixed;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>