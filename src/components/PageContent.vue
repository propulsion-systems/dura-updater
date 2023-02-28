
<script setup>
import PageStart from './Pages/PageStart.vue'
import PageUpdateMode from './Pages/PageUpdateMode.vue'
import PageUpdating from './Pages/PageUpdating.vue';
import PageUpdatingProgress from './Pages/PageUpdatingProgress.vue';
import PageDone from './Pages/PageDone.vue'

import PageError from './Pages/PageError.vue';
import PageBrowserNotSupported from './Pages/PageBrowserNotSupported.vue'

const props = defineProps({
    step: {},
    error: {},
    browser_supported: {
        default: true
    },
    service: {},
    machine: {}
})

const { state, send } = props.machine;
</script>
<template>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 text-center text-gray-400">
        <PageError v-if="machine.state.matches('error')"></PageError>
        <PageBrowserNotSupported v-else-if="!browser_supported"></PageBrowserNotSupported>
        <PageStart v-if="machine.state.matches('start')" :service="service" :machine="machine"></PageStart>
        <PageUpdateMode v-if="machine.state.matches('dfu')" :machine="{state, send}"></PageUpdateMode>
        <PageUpdating v-if="machine.state.matches('update.info')" :machine="{state, send}"></PageUpdating>
        <PageUpdatingProgress v-if="machine.state.matches('update.updating')"></PageUpdatingProgress>
        <PageDone v-if="machine.state.matches('updated')"></PageDone>
    </div>
</template>