import { createApp, provide } from 'vue'
import './input.css'
import App from './App.vue'
import { interpret } from 'xstate'
import { wizard } from './machines/wizard.js'

let step = 0;

const service = interpret(wizard)
  .onTransition((state) => {
    console.log(state.value)

    console.log(state.context.step)

    if (state.matches('start')) step = 0
    if (state.matches('dfu.select')) step = 0
    if (state.matches('update.info')) step = 1
    if (state.matches('update.updating')) step = 2
    if (state.matches('updated')) step = 3
    if (state.matches('unsupported')) browser_supported = false
    if (state.matches('error')) {
      error.value = true
    }
  })

service.start()

//App.provide('step', step)
//App.provide('service', service)

createApp(App).mount('#app')
