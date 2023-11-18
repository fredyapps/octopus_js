
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'



const app = createApp(App)

//app.config.globalProperties.api_url = 'http://localhost:3000';

app.config.globalProperties.api_url = 'http://ec2-13-40-188-171.eu-west-2.compute.amazonaws.com:3000';

app.use(router)

app.mount('#app')
