<script>

export default {
    name: 'SolutionPage',
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
    <div class="solution">
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
                <h1 class="text-center pb-2">SOLUTIONS</h1>
                <p class="paragraph">Water Credit presents an innovative solution to the pressing issue of water
                    conservation by leveraging blockchain technology. This platform aims to incentivize both businesses
                    and individuals
                    to reduce their water usage through a system of tokenized rewards. The operation of Water Credit is
                    straightforward yet effective. Users begin by uploading their water bills from the current and
                    previous month onto the platform. An AI model then analyzes these bills to extract detailed water
                    consumption data. The system compares the water usage between the two months to identify and
                    calculate any reduction in consumption. Based on the amount of water saved, users are rewarded with
                    WCT (Water Credit Token) tokens, which can be held, staked, or sold on decentralized exchanges
                    (DEX), offering flexibility and tangible incentives for users.
                    <br><br>
                    One of the most significant advantages of using blockchain technology is the transparency it offers.
                    All transactions and savings data are recorded on the blockchain, making them visible and verifiable
                    by all participants. This openness fosters trust and accountability within the system. Additionally,
                    advanced cryptography ensures that user data is secure. The immutable nature of blockchain records
                    adds an extra layer of protection, preventing tampering and unauthorized access. By tokenizing water
                    savings, Water Credit provides a powerful motivation for users to engage in ongoing conservation
                    efforts. This approach gamifies the process, making it not only beneficial but also engaging for
                    participants.
                    <br><br>
                    Water Credit specifically targets regions with significant water stress, such as Italy, where
                    reducing water consumption is critical. By rewarding conservation efforts, the platform aims to
                    foster a cultural shift towards more sustainable water use practices. For multi-unit buildings where
                    individual water metering may not be available, Water Credit offers a solution that includes
                    property managers. These managers can upload aggregate water bills and use multi-signature wallets
                    to distribute rewards equitably among residents, ensuring that everyone in the building can
                    participate and benefit from the conservation efforts.
                    <br><br>
                    The economic model of the WCT token is designed to mirror real-world water savings, creating a
                    robust and sustainable incentive system. The price of WCT tokens correlates with the overall water
                    savings achieved by users. As more water is conserved, the token's value increases. The supply and
                    demand within the liquidity pool impact the token's value. Active engagement from users helps
                    maintain token stability and liquidity. The number of active users on the platform influences the
                    stability and liquidity of the token, ensuring that increased participation drives further value and
                    conservation efforts.
                    <br><br>
                    This model establishes a virtuous cycle where heightened conservation efforts lead to higher token
                    values, which in turn motivate more users to join the platform and participate in water-saving
                    activities. By aligning economic incentives with environmental goals, Water Credit effectively
                    promotes sustainable water usage and addresses the urgent need for conservation in water-stressed
                    areas.
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.paragraph {
    padding: 0 80px;
}

.solution {
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

.title p {
    font-family: "Quicksand", sans-serif;
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