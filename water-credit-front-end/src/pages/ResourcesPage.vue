<script>
import AppHeader from '../components/AppHeader.vue';

export default {
    name: 'ResourcesPage',
    components: { AppHeader },
};

</script>

<template>
    <div class="resources">
        <AppHeader></AppHeader>
    </div>
</template>

<style scoped lang="scss">
.resources {
    background-image: url('../assets/background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
}
</style>