<script>

export default {
    name: 'HomePage',
    data() {
        return {
            walletAddress: null, // Variable to store wallet address
            errorMessage: '', // Optional: Add error message state if needed
        };
    },
    methods: {
        goToHomePage() {
            this.$router.push({ name: 'home' });
        },
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
        reloadPage() {
            location.reload();
        }
    },
    computed: {
        formatWalletAddress() {
            if (this.walletAddress) {
                const firstChars = this.walletAddress.substring(0, 8);
                const lastChars = this.walletAddress.substring(this.walletAddress.length - 8);
                return `${firstChars}...${lastChars}`;
            } else {
                return '';
            }
        }
    },

};

</script>

<template>
    <div class="home">
        <nav class="navbar px-4">
            <div class="d-flex align-items-center div-logo">
                <img src=" ../../public/Image_blur.png" alt="logo" class="logo-image" @click="reloadPage">
                <span class="fs-2 name-token">WCT</span>
            </div>
            <div class="d-flex justify-content-center align-items-center div-links">
                <router-link class="navbar-link"
                    :to="{ name: 'solutions', query: { address: this.walletAddress } }">Solutions</router-link>
                <router-link class="navbar-link padding-left"
                    :to="{ name: 'features', query: { address: this.walletAddress } }">Features</router-link>
                <router-link class="navbar-link padding-left"
                    :to="{ name: 'about-us', query: { address: this.walletAddress } }">About Us</router-link>
                <router-link class="last-navbar-link padding-left"
                    :to="{ name: 'resources', query: { address: this.walletAddress } }">Resources</router-link>
            </div>
            <div class="div-empty">
            </div>
        </nav>
        <main class="d-flex flex-column justify-content-center align-items-center">
            <div class="title">
                <h1>WATER CREDIT</h1>
            </div>
            <div class="fs-2 slogan">Reduce, Save, Reward</div>
            <div class="d-flex flex-column align-items-center">
                <button class="btn btn-primary button-custom mt-4" @click="connectWallet" v-if="!walletAddress">
                    Connect wallet
                </button>
                <div v-if="walletAddress" class="d-flex align-items-center mt-4">
                    <img src="../assets/new-phantom.jpg" alt="logo-wallet" class="logo-wallet pe-2">
                    <p id="wallet-address" class="m-0">
                        {{ formatWalletAddress }}
                    </p>
                </div>
                <p v-if="errorMessage" id="welcome_message">{{ errorMessage }}</p>
                <!-- Optionally display error message -->
                <br />
                <router-link v-if="walletAddress" :to="{ name: 'upload-bill', query: { address: walletAddress } }">
                    <button class="btn btn-primary button-custom">
                        Upload Bill
                    </button>
                </router-link>
            </div>
        </main>
    </div>

</template>

<style scoped lang="scss">
.home {
    background-image: url('../assets/background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    overflow-y: auto;
}

.navbar {
    padding: 0;
    height: 100px;
}

.logo-image {
    width: 80px;
    cursor: pointer;
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
}

h1 {
    color: white;
    font-size: 80px;
    font-family: 'Gagalin', sans-serif;
    margin-bottom: 0;
}

.button-custom {
    background-color: white;
    color: #0F5AA9;
    padding: 12px 50px;
    border-radius: 30px;
    font-family: 'Gagalin', sans-serif;
    border: white;
}

main {
    height: calc(100vh - 100px);
}

.logo-wallet {
    height: 50px;
    border-radius: 50%;
}

.slogan {
    font-family: "Caveat", cursive;
    font-weight: bold;
    color: white;
}

#wallet-address {
    font-family: "Quicksand", sans-serif;
    color: white;
    font-weight: bold;
}
</style>