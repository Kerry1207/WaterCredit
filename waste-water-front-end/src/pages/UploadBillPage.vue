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
            previousUploadId: null, // ID returned after previous month upload
            currentUploadId: null, // ID returned after current month upload
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
                this.errorMessage = 'Only JPG images are accepted.';
            }
        },
        async uploadImage(imageBase64, monthType) {
            if (!imageBase64) {
                this.errorMessage = 'You need to upload a bill.';
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
                        this.previousUploadMessage = `Previous month bill upload successful, ID: ${response.data.id}`;
                        this.previousUploadMessageColor = 'green';
                        this.previousUploadId = response.data.id;
                    } else {
                        this.currentUploadMessage = `Current month bill upload successful, ID: ${response.data.id}`;
                        this.currentUploadMessageColor = 'green';
                        this.currentUploadId = response.data.id;
                    }
                } else {
                    throw new Error('Upload failed');
                }
            } catch (error) {
                console.error(`An error occurred while uploading the ${monthType} month image`, error);
                if (monthType === 'previous') {
                    this.previousUploadMessage = `Error during previous month bill upload`;
                    this.previousUploadMessageColor = 'red';
                } else {
                    this.currentUploadMessage = `Error during current month bill upload`;
                    this.currentUploadMessageColor = 'red';
                }
            }
        },
        async processData(id) {
            try {
                const response = await axios.post('http://localhost:3000/processData', { id });
                if (response.status === 200 && response.data.status === 'success') {
                    console.log(`Data processing successful for ID: ${id}`);
                } else {
                    throw new Error('Data processing failed');
                }
            } catch (error) {
                console.error(`An error occurred while processing data for ID: ${id}`, error);
                this.errorMessage = 'An error occurred while processing the data.';
            }
        },
        uploadPreviousMonthImage() {
            if (this.previousMonthImage) {
                this.uploadImage(this.previousMonthImage, 'previous');
            } else {
                this.errorMessage = 'You need to upload a previous month bill.';
            }
        },
        uploadCurrentMonthImage() {
            if (this.currentMonthImage) {
                this.uploadImage(this.currentMonthImage, 'current');
            } else {
                this.errorMessage = 'You need to upload a current month bill.';
            }
        },
        processPreviousMonthData() {
            if (this.previousUploadId) {
                this.processData(this.previousUploadId);
            } else {
                this.errorMessage = 'You need to upload a previous month bill first.';
            }
        },
        processCurrentMonthData() {
            if (this.currentUploadId) {
                this.processData(this.currentUploadId);
            } else {
                this.errorMessage = 'You need to upload a current month bill first.';
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
                <div v-if="previousUploadMessageColor === 'green'">
                    <button class="btn btn-success" @click="processPreviousMonthData">Process Previous Month
                        Data</button>
                </div>
            </div>
            <div class="d-flex flex-column align-items-center">
                <div class="input-group mb-1">
                    <input type="file" class="form-control" @change="event => onFileChange(event, 'current')"
                        accept="image/jpeg" />
                    <button class="btn btn-secondary" @click="uploadCurrentMonthImage">Upload Current Bill</button>
                </div>
                <div v-if="currentUploadMessage" :style="{ color: currentUploadMessageColor }">{{ currentUploadMessage
                    }}</div>
                <div v-if="currentUploadMessageColor === 'green'">
                    <button class="btn btn-success" @click="processCurrentMonthData">Process Current Month Data</button>
                </div>
            </div>
        </div>
        <p v-if="errorMessage" style="color: red;" class="text-center mt-5">{{ errorMessage }}</p>
        <div class="d-flex justify-content-center mt-5">
            <router-link :to="{ name: 'receive-token', query: { address: this.$route.query.address } }"
                class="btn btn-warning">Go
                to claim your
                tokens</router-link>
        </div>
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
