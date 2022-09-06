import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import socketio from 'socket.io';
// import VueSocketIO from 'vue-socket.io';

import './assets/main.css'

const app = createApp(App)
// export const SocketInstance = socketio('http://localhost:3040');

app.use(router)
// app.use(VueSocketIO, SocketInstance)
app.mount('#app')
