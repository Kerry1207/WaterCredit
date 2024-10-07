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
            isLoading: false,
            tokensClaimed: false
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
        logOut() {
            this.$router.push({ name: 'home' });
            this.walletConnected = false;
        },
        async claimTokens() {
            this.isLoading = true;
            try {
                const walletAddress = this.$route.query.address; // Retrieve wallet address from query parameter
                const idbill_1 = this.$route.query.idbill_1;
                const idbill_2 = this.$route.query.idbill_2;

                const response = await axios.post(import.meta.env.VITE_BACK_END_ENDPOINT.concat('/calculateToken'), {
                    address: walletAddress,
                    idbill_1: idbill_1,
                    idbill_2: idbill_2
                });

                if (response.status === 200 && response.data.status === 'success') {
                    this.message = `You have received ${response.data.amount} tokens!`;
                    this.messageColor = '#12ff77';
                    this.associatedAccountMessage = 'An associated account has been created, and tokens have been sent to it.';
                    this.transactionLink = `https://explorer.solana.com/tx/${response.data.transaction}?cluster=devnet`;
                    this.transactionId = response.data.transaction;
                    this.tokensClaimed = true;
                } else {
                    this.message = 'Error calculating tokens. Please try again!';
                    this.messageColor = 'red';
                }
            } catch (error) {
                console.error("Error claiming tokens:", error);
                this.message = 'Error calculating tokens. Please try again!';
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
                <div @click="goToHomePage">
                    <img src="../assets/Logo color@3.png" alt="logo" class="logo-image">
                </div>
            </div>
            <div class="div-empty d-flex align-items-center">
                <img src="../assets/Frame.png" alt="logo-wallet" class="logo-wallet pe-2">
                <p id="wallet-address" class="m-0 pe-3">
                    {{ formatWalletAddress }}
                </p>
                <button class="btn btn-logout" @click="logOut"><img src="../assets/Buttons.png"
                        alt="button-logout"></button>
            </div>
        </nav>

        <div class="d-flex flex-column align-items-center justify-content-center main">
            <div v-if="!tokensClaimed" class="btn btn-primary button-custom" @click="claimTokens">Claim your tokens
            </div>
            <div v-if="isLoading" class="spinner-border text-light mt-4" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div v-if="message" :style="{ color: messageColor }" class="mt-5 message-done text-border-white">{{
                    message
                }}</div>
            <div v-if="message && messageColor === '#12ff77'">
                <div class="text-center associated-wallet-message text-border-white" :style="{ color: 'white' }">{{
                    associatedAccountMessage }}</div>
                <div class="mt-1 text-center">
                    <p class="hash-message mb-5">Transaction hash: {{ transactionId }}</p>
                    <a class="text-white explorer-message mt-5" :href="transactionLink" target="_blank">See transaction
                        on
                        Solana Explorer</a>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.btn-logout:active {
    border: none;
}

.associated-wallet-message {
    font-size: 18px;
}

.explorer-message {
    color: #0F5AA9;
    padding: 8px 15px;
    border-radius: 8px;
    border: 1px solid white;
    font-size: 14px;
    font-weight: bold;
    text-decoration: none;
}

.button-custom-out {
    background-color: transparent;
    color: white;
    padding: 8px 15px;
    border-radius: 8px;
    font-family: "Teachers", sans-serif;
}

.hash-message {
    font-size: 18px;
    font-weight: normal;
    color: #828282;
}

.message-done {
    color: #00FF75;
    font-size: 45px;
}

.receive-token {
    background-color: black;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    overflow-y: auto;
}

.button-custom {
    background-color: white;
    color: #0F5AA9;
    padding: 8px 15px;
    border-radius: 8px;
    font-family: "Teachers", sans-serif;
    border: white;
    font-size: 15px;
    font-weight: bold;
}

.button-custom:hover {
    background-image: url("../assets/Gradient background.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position-y: center;
    color: white;
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
    font-family: "Teachers", sans-serif;
    color: white;
    font-weight: bold;
}

.navbar {
    padding: 0;
    height: 100px;
}

.logo-image {
    width: 250px;
    cursor: pointer;
}

.logo-wallet {
    height: 40px;
    border-radius: 50%;
}

.name-token {
    color: white;
    font-family: "Teachers", sans-serif;
}

.navbar-link {
    border-right: 1px solid white;
    padding-right: 15px;
    text-decoration: none;
    color: white;
    font-family: "Teachers", sans-serif;
    font-size: 18px;
}

.padding-left {
    padding-left: 15px;
}

.last-navbar-link {
    text-decoration: none;
    color: white;
    font-family: "Teachers", sans-serif;
    font-size: 18px;
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
    font-family: "Teachers", sans-serif;
    height: calc(100vh - 100px);
}

.title-section {
    font-family: 'Gagalin', sans-serif;
}
</style>