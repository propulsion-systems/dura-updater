<script setup>
import { ref, inject } from 'vue';

import Navigation from './components/Navigation.vue';
import PageContent from './components/PageContent.vue';
import { wizard } from './machines/wizard.js';

import { useMachine } from '@xstate/vue';
const { state, send } = useMachine(wizard);



const step = ref(0);
const error = ref(false);
const browser_supported = ref(true);

//const service = inject('service');

</script>

<template>
  <Navigation :step="step" :error="error" :machine="{state,send}"/>
  <PageContent :step="step" :error="error" :browser_supported="browser_supported" :machine="{ state, send }"/>
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
