<script>
export default {
    data() {
        return {
            walletAddress: null, // Variable to store wallet address
            errorMessage: '', // Optional: Add error message state if needed
        };
    },
    methods: {
        async connectWallet() {
            if ("solana" in window) {
                try {
                    await window.solana.connect();

                    const provider = window.solana;
                    this.walletAddress = provider.publicKey.toString(); // Store wallet address

                    // Optionally clear any previous error message
                    this.errorMessage = '';
                } catch (error) {
                    console.error("Failed to connect to Solana wallet", error);
                    this.errorMessage = "Failed to connect to wallet."; // Optionally display error message
                }
            } else {
                console.error("Solana object not found in window.");
                this.errorMessage = "Solana object not found in window."; // Optionally display error message
            }
        },
    },
};
</script>


<template>
    <main class="d-flex flex-column justify-content-center align-items-center">
        <div class="title">
            WASTE WATER
        </div>
        <div class="d-flex flex-column align-items-center">
            <button class="btn btn-primary button-custom" @click="connectWallet" v-if="!walletAddress">
                Connect wallet
            </button>
            <p v-if="walletAddress" id="welcome_message">
                Hi, {{ walletAddress }}!
            </p>
            <p v-if="errorMessage" id="welcome_message">{{ errorMessage }}</p>
            <!-- Optionally display error message -->
            <br />
            <router-link v-if="walletAddress" :to="{ name: 'upload-bill', query: { address: walletAddress } }">
                <button class="btn btn-secondary button-custom">
                    Upload Bill
                </button>
            </router-link>
            <br />
            <router-link v-if="walletAddress" :to="{ name: 'receive-token' }">Receive Token</router-link>
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
