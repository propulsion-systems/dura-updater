<script setup>
import { ref } from 'vue';
import { interpret } from 'xstate'

import Navigation from './components/Navigation.vue';
import PageContent from './components/PageContent.vue';

import { wizard } from './machines/wizard.js'

const step = ref(0);
const error = ref(false);
const browser_supported = ref(true);

const service = interpret(wizard)
  .onTransition((state) => {
    console.log(state.value)

    console.log(state.context.step)

    if (state.matches('start')) step.value = 0
    if (state.matches('dfu.select')) step.value = 0
    if (state.matches('update.info')) step.value = 1
    if (state.matches('update.updating')) step.value = 2
    if (state.matches('updated')) step.value = 3
    if (state.matches('unsupported')) browser_supported.value = false
    if (state.matches('error')) {
      error.value = true
    }
  })

service.start()

</script>

<template>
  <Navigation :step="step" :error="error"/>
  <PageContent :step="step" :error="error" :browser_supported="browser_supported" :servic="service"/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
