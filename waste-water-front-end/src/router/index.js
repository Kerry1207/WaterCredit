import { createRouter, createWebHistory } from "vue-router";

import HomePage from '../pages/HomePage.vue';
import UploadBillPage from '../pages/UploadBillPage.vue';
import ReceiveTokenPage from '../pages/ReceiveTokenPage.vue';


const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/upload-bill', name: 'upload-bill', component: UploadBillPage },
  { path: '/receive-token', name: 'receive-token', component: ReceiveTokenPage },
  { path: '/:catchAll(.*)', redirect: '/' } // Redirects all unmatched routes to home
];


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { router };
