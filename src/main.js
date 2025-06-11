//импортировать все необходимые библиотеки, объекты и функции
import './assets/main.css';
import 'primeicons/primeicons.css';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import router from './router'
import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

app.use(router); //добавить маршруты (адреса) на сайт
app.use(Toast); //добавить всплывающие сообвещения на сайт

//настройка подключения к firebase (базе данных)
const firebaseConfig = {
  apiKey: "AIzaSyA0rPlomh9hwYNx9U6O0kwBslDLyy5E3eg",
  authDomain: "elearning-dff6d.firebaseapp.com",
  projectId: "elearning-dff6d",
  storageBucket: "elearning-dff6d.firebasestorage.app",
  messagingSenderId: "774871738682",
  appId: "1:774871738682:web:8eba8aa6aefcf912674803",
  databaseURL: "https://elearning-dff6d-default-rtdb.firebaseio.com/",
};
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

//добавить код генерируемый vue в index.html в элемент с id = #app
app.mount('#app');
