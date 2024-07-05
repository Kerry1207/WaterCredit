<script>
import AppHeader from '../components/AppHeader.vue';

export default {
    name: 'FeaturesPage',
    components: { AppHeader },
};

</script>

<template>
    <div class="features">
        <AppHeader></AppHeader>
    </div>
</template>

<style scoped lang="scss">
.features {
    background-image: url('../assets/background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
}
</style>