<script>
export default {
    name: 'UploadBillPage',
    methods: {
        goToHomePage() {
            // Puoi navigare alla home page utilizzando $router.push
            this.$router.push({ name: 'home' });
        }
    }
};
</script>

<template>
    <div class="upload-bill">
        <img src="../../public/Image_blur.png" alt="logo" class="logo-header" @click="goToHomePage">
        Upload Bill
    </div>
</template>

<style scoped lang="scss">
.upload-bill {
    background-image: url('../assets/drops_water.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
}

.logo-header {
    width: 100px;
    cursor: pointer;
}
</style>