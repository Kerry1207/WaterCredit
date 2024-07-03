import { createApp } from 'vue'
import { router } from './router';
import './style.css'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css";

const app = createApp(App);

// ROUTER
app.use(router);

app.mount('#app');
