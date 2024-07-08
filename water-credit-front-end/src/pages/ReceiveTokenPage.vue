<script>
import axios from 'axios';

export default {
    name: 'ReceiveTokenPage',
    data() {
        return {
            message: '',
            messageColor: '',
            associatedAccountMessage: '',
            transactionLink: '',
            transactionId: '',
            isLoading: false
        };
    },
    computed: {
        formatWalletAddress() {
            if (this.$route.query.address) {
                const firstChars = this.$route.query.address.substring(0, 8);
                const lastChars = this.$route.query.address.substring(this.$route.query.address.length - 8);
                return `${firstChars}...${lastChars}`;
            } else {
                return '';
            }
        }
    },
    methods: {
        goToHomePage() {
            this.$router.push({ name: 'home' });
        },
        async claimTokens() {
            this.isLoading = true;
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
                    this.transactionLink = `https://explorer.solana.com/tx/${response.data.transaction}?cluster=devnet`;
                    this.transactionId = response.data.transaction;
                } else {
                    this.message = 'Error calculating tokens. Please try again.';
                    this.messageColor = 'red';
                }
            } catch (error) {
                console.error("Error claiming tokens:", error);
                this.message = 'Error calculating tokens. Please try again.';
                this.messageColor = 'red';
            } finally {
                this.isLoading = false;
            }
        },
    },
};
</script>


<template>
    <div class="receive-token">
        <nav class="navbar px-4">
            <div class="d-flex align-items-center div-logo">
                <img src=" ../../public/Image_blur.png" alt="logo" class="logo-image" @click="goToHomePage">
                <span class="fs-2 name-token">WCT</span>
            </div>
            <div class="d-flex justify-content-center align-items-center div-links">
                <router-link class="navbar-link" :to="{ name: 'solutions' }">Solutions</router-link>
                <router-link class="navbar-link padding-left" :to="{ name: 'features' }">Features</router-link>
                <router-link class="navbar-link padding-left" :to="{ name: 'about-us' }">About Us</router-link>
                <router-link class="last-navbar-link padding-left" :to="{ name: 'resources' }">Resources</router-link>
            </div>
            <div class="div-empty d-flex align-items-center">
                <img src="../assets/new-phantom.jpg" alt="logo-wallet" class="logo-wallet pe-2">
                <p id="wallet-address" class="m-0">
                    {{ formatWalletAddress }}
                </p>
            </div>
        </nav>
        <div class="d-flex flex-column align-items-center justify-content-center main">
            <div class="btn btn-primary button-custom" @click="claimTokens">Claim your tokens</div>
            <div v-if="isLoading" class="spinner-border text-light mt-3" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div v-if="message" :style="{ color: messageColor }" class="mt-5">{{ message }}</div>
            <div v-if="message && messageColor === 'green'">
                <div class="text-center" :style="{ color: 'green' }">{{ associatedAccountMessage }}</div>
                <div class="mt-3 text-center">
                    <p class="text-white">Transaction Hash: {{ transactionId }}</p>
                    <a class="text-white" :href="transactionLink" target="_blank">See transaction on Solana Explorer</a>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.receive-token {
    background-image: url('../assets/background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    overflow-y: auto;
}


.button-custom {
    background-color: white;
    color: #0F5AA9;
    padding: 12px 25px;
    border-radius: 30px;
    font-family: 'Gagalin', sans-serif;
    border: white;
}

.button-custom-nocolor {
    padding: 12px 25px;
    border-radius: 30px;
    font-family: 'Gagalin', sans-serif;
}

.container-custom {
    max-width: 1140px;
    height: 100%;
}

#wallet-address {
    font-family: "Quicksand", sans-serif;
    color: white;
    font-weight: bold;
}

.navbar {
    padding: 0;
    height: 100px;
}

.logo-image {
    width: 80px;
    cursor: pointer;
}

.logo-wallet {
    height: 40px;
    border-radius: 50%;
}

.name-token {
    color: white;
    font-family: "Caveat", cursive;
}

.navbar-link {
    border-right: 1px solid white;
    padding-right: 15px;
    text-decoration: none;
    color: white;
    font-family: "Quicksand", sans-serif;
    font-size: 15px;
}

.padding-left {
    padding-left: 15px;
}

.last-navbar-link {
    text-decoration: none;
    color: white;
    font-family: "Quicksand", sans-serif;
    font-size: 15px;
}

.div-logo {
    width: 30%;
}

.div-links {
    width: 40%;
}

.div-empty {
    width: 30%;
    justify-content: end;
}

.main {
    font-family: 'Gagalin', sans-serif;
    height: calc(100vh - 100px);

}
</style>