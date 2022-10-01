import { createApp } from 'vue'
import App from './App.vue'
import ServiceFactory from './factory/ServiceFactory'
import AxiosAdapter from './infra/http/AxiosAdapter'
import BoardService from './service/BoardService'

const httpClient = new AxiosAdapter()
const serviceFactory = new ServiceFactory(httpClient, 'http://localhost:8080')

const app = createApp(App)
app.provide("boardService", serviceFactory)
app.mount('#app')
