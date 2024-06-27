<script>
import AppMain from '../components/AppMain.vue';

export default {
    name: 'HomePage',
    components: { AppMain },
};

</script>

<template>
    <div class="home d-flex align-items-center justify-content-center">
        <img src="../../public/Image_blur.png" alt="logo" class="image">
        <AppMain></AppMain>
    </div>
</template>

<style scoped lang="scss">
.home {
    background-image: url('../assets/water.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
}

.image {
    width: 400px;
}
</style>