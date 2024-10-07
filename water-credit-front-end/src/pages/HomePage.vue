<script>

export default {
    name: 'HomePage',
    data() {
        return {
            walletAddress: null,
            errorMessage: '',
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
                    this.walletAddress = provider.publicKey.toString();
                    this.errorMessage = '';
                } catch (error) {
                    console.error("Failed to connect to Solana wallet", error);
                    this.errorMessage = "Failed to connect to wallet.";
                }
            } else {
                console.error("Solana object not found in window.");
                this.errorMessage = "Solana object not found in window.";
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
                <div @click="reloadPage">
                    <img src="../assets/Logo White@3.png" alt="logo" class="logo-image">
                </div>
            </div>
        </nav>
        <main class="container-fluid d-flex justify-content-center align-items-center">
            <div class="row">
                <div>

                </div>

                <div class="d-flex justify-content-center text-white motto">
                    <span class="padding-right-custom">REDUCE</span>
                    <span class="padding-right-custom">SAVE</span>
                    <span>REWARD</span>
                </div>

                <div class="slogan col-12 d-flex justify-content-center pt-2">Blockchain and AI solution to fight the
                    global water emergency</div>
                <div class="col-12 d-flex flex-column align-items-center">
                    <button class="btn btn-primary button-custom mt-4" @click="connectWallet" v-if="!walletAddress">
                        Connect Wallet
                    </button>
                    <div v-if="walletAddress" class="mt-4 d-flex align-items-center">
                        <img src="../assets/Frame.png" alt="logo-wallet" class="logo-wallet pe-2">
                        <p id="wallet-address" class="m-0">
                            {{ formatWalletAddress }}
                        </p>
                    </div>
                    <p v-if="errorMessage" id="welcome_message" class="pt-5 text-white">{{ errorMessage }}</p>

                    <br />
                    <router-link v-if="walletAddress" :to="{ name: 'upload-bill', query: { address: walletAddress } }">
                        <button class="btn btn-primary button-custom">
                            Upload Bills
                        </button>
                    </router-link>
                </div>
            </div>
        </main>
        <footer class="d-flex col-12 justify-content-between align-items-center px-4">
            <span class="text-white">©2024 Watercredit</span>
            <div>
                <a href="https://www.linkedin.com/company/watercredit"><img src="../assets/linkedin-logo-linkedin.png"
                        alt="linkedin" class="me-2 icon-social"></a>
                <a href="https://x.com/WaterCredit_"><img src="../assets/Exclude.png" alt="twitter"
                        class="icon-social"></a>
            </div>
        </footer>
    </div>

</template>

<style scoped lang="scss">
.icon-social {
    width: 25px;
}

.motto {
    font-size: 4rem;
    font-family: "Teachers", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
}

.padding-right-custom {
    padding-right: 4rem;
}

.home {
    background-image: url('../assets/Background_wct.png');
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
    width: 250px;
    cursor: pointer;
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
}

h1 {
    color: white;
    font-size: 80px;
    font-family: "Teachers", sans-serif;
    margin-bottom: 0;
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
}

main {
    height: calc(100vh - 150px);
}

.logo-wallet {
    height: 35px;
    border-radius: 50%;
}

.slogan {
    font-family: "Teachers", sans-serif;
    color: white;
    font-size: 16px;
}

#wallet-address {
    font-family: "Teachers", sans-serif;
    color: white;
    font-weight: bold;
}
</style>