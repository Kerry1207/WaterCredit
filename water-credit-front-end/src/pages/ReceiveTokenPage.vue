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
                const walletAddress = this.$route.query.address; // Retrieve wallet address from query parameter
                const idbill_1 = this.$route.query.idbill_1;
                const idbill_2 = this.$route.query.idbill_2;

                const response = await axios.post('http://localhost:3000/calculateToken', {
                    address: walletAddress,
                    idbill_1: idbill_1,
                    idbill_2: idbill_2
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
        <div class="d-flex align-items-center">
            <img src="../../public/Image_blur.png" alt="logo" class="logo-header" @click="goToHomePage">
            <div class="me-4">
                <img src="../assets/phantom.jpg" alt="metamask" class="logo-wallet me-1">
                <span>{{ this.$route.query.address }}</span>
            </div>
        </div>
        <div class="d-flex flex-column align-items-center justify-content-center">
            <div class="btn btn-secondary" @click="claimTokens">Claim your tokens</div>
            <div v-if="message" :style="{ color: messageColor }" class="mt-5">{{ message }}</div>
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

.logo-wallet {
    height: 30px;
}
</style>