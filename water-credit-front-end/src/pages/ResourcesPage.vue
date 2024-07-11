<script>

export default {
    name: 'ResourcesPage',
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
    <div class="resources">
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
                <router-link class="navbar-link padding-left"
                    :to="{ name: 'about-us', query: { address: this.$route.query.address } }">About Us</router-link>
                <router-link class="last-navbar-link padding-left"
                    :to="{ name: 'resources', query: { address: this.$route.query.address } }">Resources</router-link>
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
        <div class="d-flex justify-content-center">
            <div class="title mt-5">
                <h1>RESOURCES</h1>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.resources {
    background-image: url('../assets/background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
}

.title {
    color: white;
    font-size: 80px;
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