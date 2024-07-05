<script>
import AppHeader from '../components/AppHeader.vue';

export default {
    name: 'AboutPage',
    components: { AppHeader },
};

</script>

<template>
    <div class="about">
        <AppHeader></AppHeader>
    </div>
</template>

<style scoped lang="scss">
.about {
    background-image: url('../assets/background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
}
</style>