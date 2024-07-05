<script>

export default {
    name: "NavbarComponent",
    methods: {
        goToHomePage() {
            this.$router.push({ name: 'home' });
        },
    }
}
</script>

<template>
    <nav class="navbar">
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
        <div class="div-empty">
        </div>
    </nav>
</template>

<style lang="scss" scoped>
.navbar {
    padding: 0;
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
</style>