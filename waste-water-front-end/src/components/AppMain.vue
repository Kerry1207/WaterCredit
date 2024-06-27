<script>
import axios from 'axios';

export default {
    name: "AppMain",
    data() {
        return {

        };
    },

};
</script>

<template>
    <main class="d-flex flex-column justify-content-center align-items-center">
        <div class="title">
            WASTE WATER
        </div>
        <div class="d-flex flex-column align-items-center">
            <button class="btn btn-primary button-custom">Connect wallet</button>
            <br>
            <router-link :to="{ name: 'upload-bill' }">Upload Bill</router-link>
            <br>
            <router-link :to="{ name: 'receive-token' }">Receive Token</router-link>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.title {
    font-family: Arial, Helvetica, sans-serif;
    color: darkblue;
    font-size: 50px;
}

.button-custom {
    padding: 12px 50px;
    border-radius: 30px;
}
</style>
