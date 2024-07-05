import { createRouter, createWebHistory } from "vue-router";

import HomePage from '../pages/HomePage.vue';
import UploadBillPage from '../pages/UploadBillPage.vue';
import ReceiveTokenPage from '../pages/ReceiveTokenPage.vue';
import SolutionsPage from '../pages/SolutionsPage.vue';
import FeaturesPage from '../pages/FeaturesPage.vue';
import AboutUsPage from '../pages/AboutUsPage.vue';
import ResourcesPage from '../pages/ResourcesPage.vue';


const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/upload-bill', name: 'upload-bill', component: UploadBillPage },
  { path: '/receive-token', name: 'receive-token', component: ReceiveTokenPage },
  { path: '/solutions', name: 'solutions', component: SolutionsPage },
  { path: '/features', name: 'features', component: FeaturesPage },
  { path: '/about-us', name: 'about-us', component: AboutUsPage },
  { path: '/resources', name: 'resources', component: ResourcesPage },
  { path: '/:catchAll(.*)', redirect: '/' }
];


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { router };
