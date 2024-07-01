<script>
import axios from 'axios';

export default {
    name: 'ReceiveTokenPage',
    data() {
        return {
            message: '',
            messageColor: '',
            associatedAccountMessage: '',
        };
    },
    methods: {
        goToHomePage() {
            this.$router.push({ name: 'home' });
        },
        async claimTokens() {
            try {
                const walletAddress = this.$route.query.address; // Assuming wallet address is passed as a query parameter

                const response = await axios.post('http://localhost:3000/calculateToken', {
                    address: walletAddress,
                });

                if (response.status === 200 && response.data.status === 'success') {
                    this.message = `You have received ${response.data.amount} tokens.`;
                    this.messageColor = 'green';
                    this.associatedAccountMessage = 'An associated account has been created, and tokens have been sent to it.';
                } else {
                    this.message = 'Error calculating tokens. Please try again.';
                    this.messageColor = 'red';
                }
            } catch (error) {
                console.error("Error claiming tokens:", error);
                this.message = 'Error calculating tokens. Please try again.';
                this.messageColor = 'red';
            }
        },
    },
};
</script>

<template>
    <div class="receive-token">
        <img src="../../public/Image_blur.png" alt="logo" class="logo-header" @click="goToHomePage">
        <div class="d-flex flex-column align-items-center justify-content-center">
            <div class="btn btn-secondary" @click="claimTokens">Claim your tokens</div>
            <div v-if="message" :style="{ color: messageColor }">{{ message }}</div>
            <div v-if="associatedAccountMessage" :style="{ color: 'green' }">{{ associatedAccountMessage }}</div>
        </div>
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