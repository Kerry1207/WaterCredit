<script>

export default {
    name: 'AboutPage',
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
    <div class="about">
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
            <div class="d-flex flex-column align-items-center justify-content-center w-100 px-4">
                <div class="title mt-3">
                    <h1 class="text-center pb-2">ABOUT US</h1>
                    <p class="paragraph">
                        Water Credit is a startup focused on using blockchain technology to tackle the issue of water
                        scarcity. Our aim is to promote sustainability by encouraging and recognizing water conservation
                        efforts among businesses and individuals. Established in 2024, our team combines knowledge in
                        blockchain development, environmental science, and business innovation. We believe that
                        technology can effectively contribute to environmental goals. We envision a world where every
                        drop of water is valued and conserved. Through Water Credit, we aim to create a global community
                        of water conservationists, united by the shared goal of preserving our planet's most precious
                        resource.
                        <br>
                        <br>
                    </p>
                    <div class="text-center fs-4"> <strong>Our Team</strong></div>
                    <div class="container">
                        <div class="row">
                            <div class="col"><img class="w-100" src="../assets/team-francesco.png" alt="francesco">
                            </div>
                            <div class="col"><img class="w-100" src="../assets/team-francesco.png" alt="francesco">
                            </div>
                            <div class="col"><img class="w-100" src="../assets/team-francesco.png" alt="francesco">
                            </div>
                            <div class="col"><img class="w-100" src="../assets/team-francesco.png" alt="francesco">
                            </div>
                            <div class="col"><img class="w-100" src="../assets/team-francesco.png" alt="francesco">
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ul>
            <li>
                <div class="d-flex align-items-center">
                    <div class="div-description">
                        <strong>Antonio Carito - Software Developer</strong>
                        <p>Antonio brings extensive experience in blockchain development and smart
                            contract
                            programming. His expertise is crucial in building the core technological
                            infrastructure
                            of Water Credit.</p>
                    </div>
                    <div class="div-image"><img class="w-100" src="../assets/team-francesco.png" alt="francesco">
                    </div>

                </div>

            </li>
            <li>
                <div class="d-flex align-items-center">
                    <div class="div-description">
                        <strong>Samuele Passiatore - Software Developer</strong>
                        <p>Samuele's skills in full-stack development are essential in creating the
                            user-friendly
                            interface and robust backend systems of Water Credit.</p>
                    </div>
                    <div class="div-image"><img class="w-100" src="../assets/team-francesco.png" alt="samuele">
                    </div>

                </div>

            </li>

            <li>
                <div class="d-flex align-items-center">
                    <div class="div-description">
                        <strong>Aiman Hamdouni - Industrial Engineer</strong>
                        <p>Aiman's background in industrial engineering provides valuable insights into
                            water
                            usage
                            in industrial settings, helping to tailor our solution for business users.
                        </p>
                    </div>
                    <div class="div-image"><img class="w-100" src="../assets/team-francesco.png" alt="aiman">
                    </div>

                </div>

            </li>



            <li>
                <div class="d-flex align-items-center">
                    <div class="div-description">
                        <strong>Francesco Fantinelli - Compliance Analyst</strong>
                        <p>Francesco ensures that Water Credit operates within regulatory frameworks,
                            managing
                            legal
                            compliance and risk assessment for the platform.</p>
                    </div>
                    <div class="div-image"><img class="w-100" src="../assets/team-francesco.png" alt="francesco">
                    </div>

                </div>

            </li>

            <li>
                <div class="d-flex align-items-center">
                    <div class="div-description">
                        <strong>Nicholas Ferrato - Consultant</strong>
                        <p>Nicholas provides strategic guidance on business development and
                            partnerships,
                            helping to
                            scale Water Credit's impact.</p>
                    </div>
                    <div class="div-image"><img class="w-100" src="../assets/team-francesco.png" alt="nicholas">
                    </div>

                </div>

            </li>

        </ul>
    </div>



</template>

<style scoped lang="scss">
.card {
    width: 20%;
}

.div-description {
    width: 60%;
}

.div-image {
    width: 40%;
}

.col {
    width: 20%;
}

.paragraph {
    padding: 0 80px;
    font-family: "Quicksand", sans-serif;
}

.about {
    background-image: url('../assets/background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    overflow-y: auto;
}

.title {
    color: white;
    margin-bottom: 0;
    font-family: 'Gagalin', sans-serif;
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