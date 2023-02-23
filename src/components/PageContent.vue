
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
    browser_supported: {},
    service: {},
})
</script>
<template>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 text-center text-gray-400">
        <PageError v-if="error"></PageError>
        <PageBrowserNotSupported v-else-if="!browser_supported"></PageBrowserNotSupported>
        <PageStart v-else-if="step == 0" :service="service"></PageStart>
        <PageUpdateMode v-else-if="step == 1"></PageUpdateMode>
        <template v-else-if="step == 2">
            <PageUpdating></PageUpdating>
            <PageUpdatingProgress></PageUpdatingProgress>
        </template>
        <PageDone v-else-if="step == 3"></PageDone>
    </div>
</template>