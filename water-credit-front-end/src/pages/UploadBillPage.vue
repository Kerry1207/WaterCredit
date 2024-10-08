<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import { base64DataBillNovember, base64DataBillDecember } from '../utility/base64images';

export default {
    name: 'UploadBillPage',
    data() {
        return {
            previousMonthImage: null,
            currentMonthImage: null,
            errorMessage: '',
            previousUploadMessage: '',
            previousUploadMessageColor: '',
            currentUploadMessage: '',
            currentUploadMessageColor: '',
            previousUploadId: null,
            currentUploadId: null,
            processMessage: '',
            processMessageColor: '',
            isProcessingPrevious: false,
            isProcessingCurrent: false,
            previousMonthProcessed: false,
            currentMonthProcessed: false,
            processPreviousMessage: '',
            processPreviousMessageColor: '',
            processCurrentMessage: '',
            processCurrentMessageColor: '',
            previousFileName: '',
            currentFileName: '',
            base64_bill_november: base64DataBillNovember,
            base64_bill_december: base64DataBillDecember,
        };
    },
    computed: {
        ...mapGetters(['getWalletAddress']),
        formatWalletAddress() {
            if (this.$route.query.address) {
                const firstChars = this.$route.query.address.substring(0, 6);
                const lastChars = this.$route.query.address.substring(this.$route.query.address.length - 6);
                return `${firstChars}...${lastChars}`;
            } else {
                return '';
            }
        }
    },
    mounted() {
        const modalElement = document.getElementById('exampleModal');
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    },
    methods: {
        goToHomePage() {
            this.$router.push({ name: 'home' });
        },
        logOut() {
            this.$router.push({ name: 'home' });
            this.walletConnected = false;
        },
        onFileChange(event, monthType) {
            const file = event.target.files[0];

            if (file && file.type === 'image/jpeg') {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (monthType === 'previous') {
                        this.previousMonthImage = reader.result.split(',')[1];
                        this.previousFileName = file.name;
                    } else {
                        this.currentMonthImage = reader.result.split(',')[1];
                        this.currentFileName = file.name;
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

            const walletAddress = this.$route.query.address;

            const payload = {
                address: walletAddress,
                uploadDate: new Date().toISOString(),
                typeImage: 'jpg',
                image: imageBase64
            };

            try {
                const response = await axios.post(import.meta.env.VITE_BACK_END_ENDPOINT.concat('/uploadImage'), payload);
                if (response.status === 200 && response.data.status === 'success') {
                    if (monthType === 'previous') {
                        this.previousUploadMessage = `Last month bill upload successful`;
                        this.previousUploadMessageColor = '#00FF75';
                        this.previousUploadId = response.data.id;
                    } else {
                        this.currentUploadMessage = `Current month bill upload successful`;
                        this.currentUploadMessageColor = '#00FF75';
                        this.currentUploadId = response.data.id;
                    }
                    this.checkProcessingStatus();
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
        async processData(id, monthType) {
            if (monthType === 'previous') {
                this.isProcessingPrevious = true;
            } else {
                this.isProcessingCurrent = true;
            }

            try {
                const response = await axios.post(import.meta.env.VITE_BACK_END_ENDPOINT.concat('/processData'), { id });
                if (response.status === 200 && response.data.status === 'success') {
                    if (monthType === 'previous') {
                        this.processPreviousMessage = `Data processing successful`;
                        this.processPreviousMessageColor = '#00FF75';
                        this.previousMonthProcessed = true;
                    } else {
                        this.processCurrentMessage = `Data processing successful`;
                        this.processCurrentMessageColor = '#00FF75';
                        this.currentMonthProcessed = true;
                    }
                } else {
                    throw new Error('Data processing failed');
                }
            } catch (error) {
                console.error(`An error occurred while processing data`, error);
                if (monthType === 'previous') {
                    this.processPreviousMessage = 'An error occurred while processing the data.';
                    this.processPreviousMessageColor = 'red';
                } else {
                    this.processCurrentMessage = 'An error occurred while processing the data.';
                    this.processCurrentMessageColor = 'red';
                }
            } finally {
                if (monthType === 'previous') {
                    this.isProcessingPrevious = false;
                } else {
                    this.isProcessingCurrent = false;
                }
                this.checkProcessingStatus();
            }
        },
        checkProcessingStatus() {
            if (this.previousMonthProcessed && this.currentMonthProcessed) {
                this.$forceUpdate();
            }
        },
        uploadPreviousMonthImage() {
            if (this.previousMonthImage) {
                this.uploadImage(this.previousMonthImage, 'previous');
            } else {
                this.errorMessage = '';
                this.previousUploadMessage = 'You need to upload a last month bill.';
                this.currentUploadMessage = '';
            }
        },
        uploadCurrentMonthImage() {
            if (this.currentMonthImage) {
                this.uploadImage(this.currentMonthImage, 'current');
            } else {
                this.errorMessage = '';
                this.currentUploadMessage = 'You need to upload a current month bill.';
                this.previousUploadMessage = '';
            }
        },
        processPreviousMonthData() {
            if (this.previousUploadId) {
                this.processData(this.previousUploadId, 'previous');
            } else {
                this.errorMessage = 'You need to upload a last month bill first.';
            }
        },
        processCurrentMonthData() {
            if (this.currentUploadId) {
                this.processData(this.currentUploadId, 'current');
            } else {
                this.errorMessage = 'You need to upload a current month bill first.';
            }
        },
        goToReceiveTokenPage() {
            this.$router.push({
                name: 'receive-token',
                query: {
                    address: this.$route.query.address,
                    idbill_1: this.previousUploadId,
                    idbill_2: this.currentUploadId
                }
            });
        }
    }
};
</script>

<template>
    <div class="upload-bill">
        <nav class="navbar px-4">
            <div class="d-flex align-items-center div-logo">
                <div @click="goToHomePage">
                    <img src="../assets/Logo color@3.png" alt="logo" class="logo-image">
                </div>
            </div>
            <div class="div-empty d-flex align-items-center">
                <img src="../assets/Frame.png" alt="logo-wallet" class="logo-wallet pe-2">
                <p id="wallet-address" class="m-0 pe-3">
                    {{ formatWalletAddress }}
                </p>
                <button class="btn btn-logout" @click="logOut"><img src="../assets/Buttons.png"
                        alt="button-logout"></button>
            </div>
        </nav>

        <div class="d-flex justify-content-center main-upload">
            <!-- download -->
            <div class="download-div text-white">
                <div class="d-flex justify-content-center align-items-center mb-3 download-block">
                    <i class="fa-regular fa-file fs-3"></i>
                    <span class="text-center title-section fw-bold">DOWNLOAD TEST BILLS</span>
                    <i class="fa-solid fa-circle-info ps-1 info-icon" data-bs-toggle="modal"
                        data-bs-target="#exampleModal"></i>
                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <p class="modal-body-text">We recommend using the following bill images: the
                                        November bill as the previous month's bill and the December bill as the current
                                        month's bill. Download the images and upload them into the respective fields.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center">
                    <a :href="'data:image/png;base64,' + base64_bill_november" download="template-bill-november.jpg"
                        class="text-white download-bill-link text-center">
                        <div class="title-test-bill pb-2">NOVEMBER BILL</div>
                        <i class="fa-solid fa-cloud-arrow-down fs-2"></i>
                    </a>
                    <a :href="'data:image/png;base64,' + base64_bill_december" download="template-bill-december.jpg"
                        class="text-white download-bill-link text-center ms-5">
                        <div class="title-test-bill pb-2">DECEMBER BILL</div>
                        <i class="fa-solid fa-cloud-arrow-down fs-2"></i>
                    </a>
                </div>
            </div>

            <!-- upload -->
            <div class="upload-div mb-3 upload-block">
                <div class="d-flex justify-content-center align-items-center mb-3">
                    <i class="fa-regular fa-file fs-3"></i>
                    <span class="text-center title-section fw-bold">UPLOAD YOUR BILLS</span>
                </div>

                <div class="d-flex div-upload-bills">
                    <!-- Previous Month Upload -->
                    <div class="d-flex flex-column w-50 align-items-center justify-content-center text-white">
                        <div class="title-test-bill pb-2">LAST MONTH BILL</div>
                        <label for="previousMonthInput" class="label">
                            <i class="fa-solid fa-cloud-arrow-up fs-2"></i>
                        </label>
                        <input type="file" id="previousMonthInput" class="d-none"
                            @change="event => onFileChange(event, 'previous')" accept="image/jpeg" />
                        <div class="position-absolute">
                            <div v-if="previousFileName" class="file-name text-white">
                                {{ previousFileName }}
                            </div>
                        </div>

                        <button class="mt-3" :class="['upload-button', { 'disabled-button': !currentMonthImage }]"
                            @click="uploadPreviousMonthImage" :disabled="!currentMonthImage">
                            Upload
                        </button>
                        <div class="d-flex flex-column position-absolute align-items-center">
                            <div v-if="previousUploadMessage" class="mt-2 message-error">
                                <span class="text-border-white message-error-span"
                                    :style="{ color: previousUploadMessageColor }">
                                    {{ previousUploadMessage }}
                                </span>
                            </div>
                            <div class="process-data-button d-flex align-items-center"
                                v-if="previousUploadMessageColor === '#00FF75'">
                                <button class="btn btn-primary button-custom mt-1" @click="processPreviousMonthData">
                                    Process Last Month Data
                                </button>
                                <div v-if="isProcessingPrevious" class="spinner-border text-light ms-2" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>

                            <div v-if="processPreviousMessage" :style="{ color: processPreviousMessageColor }"
                                class="text-border-white text-center message-processed">
                                {{ processPreviousMessage }}
                            </div>
                            <p v-if="errorMessage" style="color: red;" class="text-border-white text-center">
                                {{ errorMessage }}
                            </p>
                        </div>
                    </div>

                    <!-- Current Month Upload  -->
                    <div class="d-flex flex-column w-50 align-items-center justify-content-center text-white">
                        <div class="title-test-bill pb-2">CURRENT MONTH BILL</div>
                        <label for="currentMonthInput" class="label">
                            <i class="fa-solid fa-cloud-arrow-up fs-2"></i>
                        </label>
                        <input type="file" id="currentMonthInput" class="d-none"
                            @change="event => onFileChange(event, 'current')" accept="image/jpeg" />
                        <div class="position-absolute">
                            <div v-if="currentFileName" class="file-name text-white">
                                {{ currentFileName }}
                            </div>
                        </div>
                        <button class="mt-3" :class="['upload-button', { 'disabled-button': !currentMonthImage }]"
                            @click="uploadCurrentMonthImage" :disabled="!currentMonthImage">
                            Upload
                        </button>
                        <div class="d-flex flex-column position-absolute align-items-center">
                            <div v-if="currentUploadMessage" class="mt-2 message-error">
                                <span class="text-border-white message-error-span"
                                    :style="{ color: currentUploadMessageColor }">
                                    {{ currentUploadMessage }}
                                </span>
                            </div>
                            <div class="process-data-button d-flex align-items-center"
                                v-if="currentUploadMessageColor === '#00FF75'">
                                <button class="btn btn-primary mt-1 button-custom" @click="processCurrentMonthData">
                                    Process Current Month Data
                                </button>
                                <div v-if="isProcessingCurrent" class="spinner-border text-light ms-2" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            <div v-if="processCurrentMessage" :style="{ color: processCurrentMessageColor }"
                                class="text-center text-border-white message-processed">
                                {{ processCurrentMessage }}
                            </div>
                            <p v-if="errorMessage" style="color: red;" class="text-border-white text-center">
                                {{ errorMessage }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-column align-items-center justify-content-center div-claim-page">
                    <router-link v-if="previousMonthProcessed && currentMonthProcessed"
                        :to="{ name: 'receive-token', query: { address: this.$route.query.address, idbill_1: previousUploadId, idbill_2: currentUploadId } }"
                        class="btn btn-primary button-custom">
                        Claim your token page
                    </router-link>
                </div>
            </div>
        </div>
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
.btn-logout:active {
    border: none;
}

.title-section {
    font-size: 13px;
    padding-left: 8px;
}

.fa-cloud-arrow-up,
.fa-cloud-arrow-down {
    cursor: pointer;
}

.main-upload {
    height: calc(100vh - 150px);
    padding-top: 180px;
}

.div-claim-page {
    position: relative;
    top: 190px;
}


.width-div-general {
    width: 600px;
}

.modal-body-text {
    color: white;
    font-family: "Teachers", sans-serif;
}

.info-icon {
    cursor: pointer;
}

.title-test-bill {
    font-family: "Teachers", sans-serif;
    color: white;
}


.upload-button,
.process-data-button {
    background-color: white;
    color: #0F5AA9;
    padding: 8px 15px;
    border-radius: 8px;
    font-family: "Teachers", sans-serif;
    border: white;
    font-size: 14px;
    font-weight: bold;
}

.process-data-button:hover {
    background-image: url("../assets/Gradient background.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position-y: center;
    color: white;
}

.message-processed {
    position: relative;
    top: 170px;
    font-family: "Teachers", sans-serif;
}

.message-error {
    position: relative;
    top: 133px;
    color: red;
}

.message-error-span {
    position: relative;
}

.file-name {
    position: relative;
    top: 35px;
}

.process-data-button {

    position: relative;
    top: 150px;
    cursor: pointer;
}

.button-custom {
    background-color: white;
    color: #0F5AA9;
    padding: 8px 15px;
    font-family: "Teachers", sans-serif;
    border: white;
    border-radius: 8px;
    font-size: 14px;
    font-weight: bold;
}

.button-custom:hover {
    background-image: url("../assets/Gradient background.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position-y: center;
    color: white;
}

.button-custom-nocolor {
    padding: 12px 25px;
    border-radius: 30px;
    font-family: "Teachers", sans-serif;
}

.upload-bill {
    background-color: black;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    overflow-y: auto;
}

.container-custom {
    max-width: 1140px;
    height: 100%;
}

#wallet-address {
    font-family: "Teachers", sans-serif;
    color: white;
    font-weight: bold;
}

.navbar {
    padding: 0;
    height: 100px;
}

.logo-image {
    width: 250px;
    cursor: pointer;
}

.logo-wallet {
    height: 40px;
    border-radius: 50%;
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

.fa-file-arrow-up,
.fa-file-arrow-down {
    color: white;
    font-size: 100px;
    cursor: pointer;
}

.fa-file-arrow-down:hover,
.fa-file-arrow-up:hover {
    color: #0F5AA9;
}

.div-logo {
    width: 30%;
}

.div-links {
    width: 40%;
}

.div-empty {
    width: 30%;
    justify-content: end;
}

.download-div {
    font-family: "Teachers", sans-serif;
    width: 40%;
}

.upload-div {
    width: 60%;
    min-height: 400px;
}

.upload-div,
.download-div {
    display: flex;
    flex-direction: column;
}

.download-bill-link {
    text-decoration: none;
}

.file-name {
    font-family: "Teachers", sans-serif;
    position: relative;
    top: 10px;
}

.label {
    margin-bottom: 30px;
    z-index: 10;
}


.div-upload-bills {
    padding: 0 100px;
}

.error-general {
    position: relative;
    top: 50px;
}

.modal-body,
.modal-header {
    background-color: black;
    border: 1px solid #0038FF;
}

.modal {
    color: white;
}

.disabled-button {
    background-color: rgb(51, 51, 51);
    color: black;
    font-weight: bold;
}

.btn-close {
    background-color: #0038FF;
}

.download-block,
.upload-block {
    color: rgb(51, 51, 51);
}

.fa-cloud-arrow-up:hover,
.fa-cloud-arrow-down:hover {
    color: rgb(51, 51, 51);
}
</style>
