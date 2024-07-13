<script>

export default {
    name: 'FeaturesPage',
    data() {
        return {
            walletConnected: !!this.$route.query.address,
        };
    },
    computed: {
        formatWalletAddress() {
            if (this.walletConnected) {
                const address = this.$route.query.address;
                const firstChars = address.substring(0, 6);
                const lastChars = address.substring(address.length - 6);
                return `${firstChars}...${lastChars}`;
            }
            return 'No wallet connected';
        }
    },
    methods: {
        goToHomePage() {
            this.$router.push({ name: 'home' });
        },
        logOut() {
            this.$router.push({ name: 'home' });
            this.walletConnected = false;
        }
    },
    watch: {
        '$route.query.address': function (newVal) {
            this.walletConnected = !!newVal;
        }
    }
};

</script>


<template>
    <div class="features">
        <nav class="navbar px-4">
            <div class="d-flex align-items-center div-logo">
                <img src=" ../../public/Image_blur.png" alt="logo" class="logo-image" @click="goToHomePage">
                <span class="fs-2 name-token">WCT</span>
            </div>
            <div class="d-flex justify-content-center align-items-center div-links">
                <router-link class="navbar-link"
                    :to="{ name: 'solutions', query: { address: this.$route.query.address } }">Solutions</router-link>
                <router-link class="navbar-link padding-left"
                    :to="{ name: 'features', query: { address: this.$route.query.address } }">Features</router-link>
                <router-link class="last-navbar-link padding-left"
                    :to="{ name: 'about-us', query: { address: this.$route.query.address } }">About Us</router-link>

            </div>
            <div class="div-empty d-flex align-items-center">
                <div class="div-empty d-flex align-items-center">
                    <div v-if="walletConnected" class="d-flex align-items-center">
                        <img src="../assets/new-phantom.jpg" alt="logo-wallet" class="logo-wallet pe-2">
                        <p class="wallet-address m-0 pe-3">{{ formatWalletAddress }}</p>
                        <button class="button-custom btn btn-danger" @click="logOut">Log out</button>
                    </div>
                    <div v-else>
                        <p class="wallet-address no-wallet m-0">No wallet connected
                        </p>
                    </div>
                </div>
            </div>

        </nav>
        <div class="d-flex justify-content-center w-100 px-4">
            <div class="title mt-3">
                <h1 class="text-center pb-2">FEATURES</h1>
                <div class="paragraph">
                    <p>
                        Water Credit offers several key features to engage users and promote water conservation,
                        combining innovative technologies and user-centric incentives to create a sustainable and
                        rewarding experience. The key features include:
                    </p>
                    <br>
                    <div class="d-flex justify-content-center">
                        <div class="features-left">
                            <h4>Token Rewards</h4>
                            <ul>
                                <li>Users earn WCT tokens based on their water savings</li>
                                <li>Tokens can be held, staked, or traded on DEX</li>
                                <li>Creates ongoing incentive for conservation</li>
                            </ul>

                            <h4>Testnet Game</h4>
                            <ul>
                                <li>Users receive testnet WCT (tWCT) tokens</li>
                                <li>Daily betting on WCT token price movements</li>
                                <li>Correct predictions earn more tWCT</li>
                                <li>Accumulated tWCT can be exchanged for real WCT tokens</li>
                                <li>Educates users on crypto markets while driving engagement</li>
                            </ul>

                            <h4>Blockchain Integration</h4>
                            <ul>
                                <li>Leverages Solana blockchain for fast, low-cost transactions</li>
                                <li>Smart contracts manage token distribution and staking</li>
                                <li>Ensures transparency and security of all platform activities</li>
                            </ul>

                            <h4>User Dashboard</h4>
                            <ul>
                                <li>Visualize water savings over time</li>
                                <li>Track token earnings and rewards</li>
                                <li>Access educational resources on water conservation</li>
                            </ul>
                        </div>

                        <div>
                            <h4>NFT Rewards</h4>
                            <ul>
                                <li>Top 3 water savers over 6 months receive exclusive NFTs</li>
                                <li>NFT holders gain access to special staking opportunities</li>
                                <li>6-month staking period with compound interest</li>
                                <li>Encourages long-term engagement and conservation</li>
                            </ul>



                            <h4>AI-Powered Bill Analysis</h4>
                            <ul>
                                <li>Artificial intelligence extracts key data from water bills</li>
                                <li>Automates the process of tracking and comparing usage</li>
                                <li>Ensures accuracy in savings calculations and reward distribution</li>
                            </ul>



                            <h4>Liquidity Pool</h4>
                            <ul>
                                <li>WCT/SOL liquidity pool enables token trading</li>
                                <li>Pool balancing mechanism reflects real-world water savings trends</li>
                                <li>Creates market dynamics that reinforce conservation goals</li>
                            </ul>



                            <h4>Community Features</h4>
                            <ul>
                                <li>Leaderboards showcase top savers</li>
                                <li>Forums for users to share conservation tips</li>
                                <li>Regular challenges and competitions</li>
                            </ul>
                        </div>
                    </div>






                </div>

            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.features-left {
    margin-right: 100px;
}

.paragraph {
    padding: 0 80px;
    font-family: "Quicksand", sans-serif;
}

.features {
    background-image: url('../assets/background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    overflow-y: auto;
}

.title {
    color: white;
    font-family: 'Gagalin', sans-serif;
    margin-bottom: 0;
}


.div-logo {
    width: 30%;
}

.no-wallet {
    width: 165px;
}

.div-links {
    width: 40%;
}

.div-empty {
    width: 30%;
    justify-content: end;
}

.wallet-address {
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
    font-size: 18px;
}

.padding-left {
    padding-left: 15px;
}

.last-navbar-link {
    text-decoration: none;
    color: white;
    font-family: "Quicksand", sans-serif;
    font-size: 18px;
}

.button-custom {
    background-color: white;
    color: red;
    padding: 12px 50px;
    border-radius: 30px;
    font-family: 'Gagalin', sans-serif;
    border: white;
    width: 165px;
}
</style>