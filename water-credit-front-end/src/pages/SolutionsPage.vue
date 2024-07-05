<script>
import AppHeader from '../components/AppHeader.vue';

export default {
    name: 'HomePage',
    components: { AppHeader },
};

</script>

<template>
    <div class="solutions">
        <AppHeader></AppHeader>
    </div>
</template>

<style scoped lang="scss">
.solutions {
    background-image: url('../assets/background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
}
</style>