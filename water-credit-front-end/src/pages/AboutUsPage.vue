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
        <div class="d-flex justify-content-center">
            <div class="d-flex flex-column align-items-center justify-content-center w-100 px-4">
                <div class="title mt-2">
                    <h1 class="text-center">ABOUT US</h1>
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
                            <div class="col">
                                <img class="w-100" src="../assets/team-antonio.png" alt="antonio">
                                <div class="div-description">
                                    <i class="fa-solid fa-circle-info me-3 info-icon" data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"></i>
                                    <a target="_blank" href="https://www.linkedin.com/in/antonio-carito-17493019b/"><i
                                            class="fa-brands fa-linkedin"></i>
                                    </a>
                                    <!-- Modal -->
                                    <div class="modal fade" id="exampleModal" tabindex="-1"
                                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h3 class="modal-title fs-5" id="exampleModalLabel"><strong>Antonio
                                                            Carito - Software Developer</strong></h3>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <p>Antonio brings extensive experience in blockchain development and
                                                        smart
                                                        contract
                                                        programming. His expertise is crucial in building the core
                                                        technological
                                                        infrastructure
                                                        of Water Credit.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="col">
                                <img class="w-100" src="../assets/team-samuele.png" alt="samuele">
                                <div class="div-description">
                                    <i class="fa-solid fa-circle-info me-3 info-icon" data-bs-toggle="modal"
                                        data-bs-target="#exampleModal1"></i>
                                    <a target="_blank" href="https://www.linkedin.com/in/samuele-passiatore-dev/"><i
                                            class="fa-brands fa-linkedin"></i>
                                    </a>
                                    <!-- Modal -->
                                    <div class="modal fade" id="exampleModal1" tabindex="-1"
                                        aria-labelledby="exampleModalLabel1" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h3 class="modal-title fs-5" id="exampleModalLabel1"><strong>Samuele
                                                            Passiatore - Software Developer</strong></h3>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <p>Samuele's skills in full-stack development are essential in
                                                        creating the
                                                        user-friendly
                                                        interface and robust backend systems of Water Credit.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="col">
                                <img class="w-100" src="../assets/team-aiman.png" alt="aiman">
                                <div class="div-description">
                                    <i class="fa-solid fa-circle-info me-3 info-icon" data-bs-toggle="modal"
                                        data-bs-target="#exampleModal2"></i>
                                    <a target="_blank" href="https://www.linkedin.com/in/aiman-hamdouni/"><i
                                            class="fa-brands fa-linkedin"></i>
                                    </a>
                                    <!-- Modal -->
                                    <div class="modal fade" id="exampleModal2" tabindex="-1"
                                        aria-labelledby="exampleModalLabel2" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h3 class="modal-title fs-5" id="exampleModalLabel2"><strong>Aiman
                                                            Hamdouni - Industrial Engineer</strong></h3>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <p>Aiman's background in industrial engineering provides valuable
                                                        insights into
                                                        water
                                                        usage
                                                        in industrial settings, helping to tailor our solution for
                                                        business users.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="col">
                                <img class="w-100" src="../assets/team-francesco.png" alt="francesco">
                                <div class="div-description">
                                    <i class="fa-solid fa-circle-info me-3 info-icon" data-bs-toggle="modal"
                                        data-bs-target="#exampleModal3"></i>
                                    <a target="_blank" href="https://www.linkedin.com/in/francescofantinelli/"><i
                                            class="fa-brands fa-linkedin"></i>
                                    </a>
                                    <!-- Modal -->
                                    <div class="modal fade" id="exampleModal3" tabindex="-1"
                                        aria-labelledby="exampleModalLabel3" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h3 class="modal-title fs-5" id="exampleModalLabel3">
                                                        <strong>Francesco Fantinelli - Compliance Analyst</strong>
                                                    </h3>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">

                                                    <p>Francesco ensures that Water Credit operates within regulatory
                                                        frameworks,
                                                        managing
                                                        legal
                                                        compliance and risk assessment for the platform.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="col">
                                <img class="w-100" src="../assets/team-nicholas.png" alt="nicholas">
                                <div class="div-description">
                                    <i class="fa-solid fa-circle-info me-3 info-icon" data-bs-toggle="modal"
                                        data-bs-target="#exampleModal4"></i>
                                    <a target="_blank" href="https://www.linkedin.com/in/nicholas-ferrato-856020131/"><i
                                            class="fa-brands fa-linkedin"></i>
                                    </a>
                                    <!-- Modal -->
                                    <div class="modal fade" id="exampleModal4" tabindex="-1"
                                        aria-labelledby="exampleModalLabel4" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h3 class="modal-title fs-5" id="exampleModalLabel4">
                                                        <strong>Nicholas Ferrato - Consultant</strong>
                                                    </h3>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <p>
                                                        Nicholas provides strategic guidance on business development and
                                                        partnerships,
                                                        helping to
                                                        scale Water Credit's impact.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>



</template>

<style scoped lang="scss">
.fa-linkedin {
    color: white;
}

.info-icon {
    cursor: pointer;
}

.card {
    width: 20%;
}

.div-description {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
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

.modal-title {
    color: #0F5AA9;
}

.modal-body {
    color: black;
    font-family: "Quicksand", sans-serif;
    font-size: 18px;
}
</style>