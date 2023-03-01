import { createApp, provide } from 'vue'
import './input.css'
import App from './App.vue'
import { interpret } from 'xstate'
import { wizard } from './machines/wizard.js'

let step = 0;

const service = interpret(wizard)

service.start()

//App.provide('step', step)
//App.provide('service', service)

createApp(App).mount('#app')
