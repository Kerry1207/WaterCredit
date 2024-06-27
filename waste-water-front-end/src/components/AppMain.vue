<script>
export default {
    data() {
        return {
            // Your component's data properties
        };
    },
    methods: {
        async connectWallet() {
            if ("solana" in window) {
                try {
                    await window.solana.connect();

                    const provider = window.solana;
                    let pubKey = provider.publicKey.toString();
                    document.getElementById("welcome_message").innerText = "Hello, " + pubKey + " !";
                } catch (error) {
                    console.error("Failed to connect to Solana wallet", error);
                    document.getElementById("welcome_message").innerText = "Failed to connect to wallet.";
                }
            } else {
                console.error("Solana object not found in window.");
                document.getElementById("welcome_message").innerText = "Solana object not found in window.";
            }
        }
    }
};
</script>

<template>
    <main class="d-flex flex-column justify-content-center align-items-center">
        <div class="title">
            WASTE WATER
        </div>
        <div class="d-flex flex-column align-items-center">
            <button class="btn btn-primary button-custom" @click="connectWallet">Connect wallet</button>
            <p id="welcome_message"></p>
            <br>
            <router-link :to="{ name: 'upload-bill' }">Upload Bill</router-link>
            <br>
            <router-link :to="{ name: 'receive-token' }">Receive Token</router-link>
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
