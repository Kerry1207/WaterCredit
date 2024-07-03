<script>
import HomePage from './pages/HomePage.vue';
import UploadBillPage from './pages/UploadBillPage.vue';
import ReceiveTokenPage from './pages/ReceiveTokenPage.vue'

export default {
  name: 'Waste Water',
  components: { HomePage, UploadBillPage, ReceiveTokenPage },
};

</script>

<template>
  <router-view></router-view>

</template>

<style></style>
