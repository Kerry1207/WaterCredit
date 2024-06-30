<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
    name: 'UploadBillPage',
    data() {
        return {
            previousMonthImage: null,
            currentMonthImage: null,
            errorMessage: '',
            previousUploadMessage: '', // Message for previous month upload
            previousUploadMessageColor: '', // Color for previous month upload message
            currentUploadMessage: '', // Message for current month upload
            currentUploadMessageColor: '', // Color for current month upload message
        };
    },
    computed: {
        ...mapGetters(['getWalletAddress'])
    },
    methods: {
        goToHomePage() {
            this.$router.push({ name: 'home' });
        },
        onFileChange(event, monthType) {
            const file = event.target.files[0];

            if (file && file.type === 'image/jpeg') {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (monthType === 'previous') {
                        this.previousMonthImage = reader.result.split(',')[1]; // base64 string
                    } else {
                        this.currentMonthImage = reader.result.split(',')[1];
                    }
                };
                reader.readAsDataURL(file);
                this.errorMessage = '';
            } else {
                this.errorMessage = 'Si accettano solo immagini in formato JPG.';
            }
        },
        async uploadImage(imageBase64, monthType) {
            if (!imageBase64) {
                this.errorMessage = 'È necessario caricare una bolletta.';
                return;
            }

            const walletAddress = this.$route.query.address; // Retrieve wallet address from query parameter

            const payload = {
                address: walletAddress,
                uploadDate: new Date().toISOString(),
                typeImage: 'jpg',
                image: imageBase64
            };

            try {
                const response = await axios.post('http://localhost:3000/uploadImage', payload);
                if (response.status === 200 && response.data.status === 'success') {
                    if (monthType === 'previous') {
                        this.previousUploadMessage = `Upload della bolletta precedente riuscito, ID: ${response.data.id}`;
                        this.previousUploadMessageColor = 'green';
                    } else {
                        this.currentUploadMessage = `Upload della bolletta corrente riuscito, ID: ${response.data.id}`;
                        this.currentUploadMessageColor = 'green';
                    }
                } else {
                    throw new Error('Upload fallito');
                }
            } catch (error) {
                console.error(`An error occurred while uploading the ${monthType} month image`, error);
                if (monthType === 'previous') {
                    this.previousUploadMessage = `Errore durante l'upload della bolletta precedente`;
                    this.previousUploadMessageColor = 'red';
                } else {
                    this.currentUploadMessage = `Errore durante l'upload della bolletta corrente`;
                    this.currentUploadMessageColor = 'red';
                }
            }
        },
        uploadPreviousMonthImage() {
            if (this.previousMonthImage) {
                this.uploadImage(this.previousMonthImage, 'previous');
            } else {
                this.errorMessage = 'È necessario caricare una bolletta precedente.';
            }
        },
        uploadCurrentMonthImage() {
            if (this.currentMonthImage) {
                this.uploadImage(this.currentMonthImage, 'current');
            } else {
                this.errorMessage = 'È necessario caricare una bolletta corrente.';
            }
        }
    }
};
</script>

<template>
    <div class="upload-bill">
        <div class="d-flex align-items-center">
            <img src="../../public/Image_blur.png" alt="logo" class="logo-header" @click="goToHomePage">
            <div class="me-4">
                <img src="../assets/phantom.jpg" alt="metamask" class="logo-wallet me-1">
                <span>{{ this.$route.query.address }}</span>
            </div>
        </div>
        <div class="d-flex flex-column justify-content-center align-items-center">
            <div class="mb-5 d-flex flex-column align-items-center">
                <div class="input-group mb-1">
                    <input type="file" class="form-control" @change="event => onFileChange(event, 'previous')"
                        accept="image/jpeg" />
                    <button class="btn btn-secondary" @click="uploadPreviousMonthImage">Upload Last Bill</button>
                </div>
                <div v-if="previousUploadMessage" :style="{ color: previousUploadMessageColor }">{{
                previousUploadMessage }}</div>
                <div><button class="btn btn-success">process data</button></div>
            </div>
            <div class="d-flex flex-column align-items-center">
                <div class="input-group mb-1">
                    <input type="file" class="form-control" @change="event => onFileChange(event, 'current')"
                        accept="image/jpeg" />
                    <button class="btn btn-secondary" @click="uploadCurrentMonthImage">Upload Current Bill</button>
                </div>
                <div v-if="currentUploadMessage" :style="{ color: currentUploadMessageColor }">{{
                currentUploadMessage }}</div>
                <div><button class="btn btn-success">process data</button></div>
            </div>
        </div>
        <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    </div>
</template>

<style scoped lang="scss">
.upload-bill {
    background-image: url('../assets/drops_water.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
}

.logo-header {
    width: 100px;
    cursor: pointer;
}

.logo-wallet {
    height: 30px;
}
</style>
