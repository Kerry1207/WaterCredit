<script>

export default {
    name: 'ReceiveTokenPage',
    methods: {
        goToHomePage() {
            // Puoi navigare alla home page utilizzando $router.push
            this.$router.push({ name: 'home' });
        }
    }
};

</script>

<template>
    <div class="receive-token">
        <img src="../../public/Image_blur.png" alt="logo" class="logo-header" @click="goToHomePage">
        Receive Token
    </div>
</template>

<style scoped lang="scss">
.receive-token {
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