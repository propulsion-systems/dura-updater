
<script setup>
import { useWizard } from '../composables/wizard.js'

import PageStart from './Pages/PageStart.vue'
import PageUpdateMode from './Pages/PageUpdateMode.vue'
import PageUpdating from './Pages/PageUpdating.vue'
import PageUpdatingProgress from './Pages/PageUpdatingProgress.vue'
import PageDone from './Pages/PageDone.vue'
import PageError from './Pages/PageError.vue'
import PageBrowserNotSupported from './Pages/PageBrowserNotSupported.vue'

const { state } = useWizard()
</script>

<template>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 text-center text-gray-400">
        <PageError v-if="state.matches('error')"></PageError>
        <PageBrowserNotSupported v-if="state.matches('unsupported')"></PageBrowserNotSupported>
        <PageStart v-if="state.matches('start')"></PageStart>
        <PageUpdateMode v-if="state.matches('dfu')"></PageUpdateMode>
        <PageUpdating v-if="state.matches('update.info') || state.matches('update.select')"></PageUpdating>
        <PageUpdatingProgress v-if="state.matches('update.updating')"></PageUpdatingProgress>
        <PageDone v-if="state.matches('updated')"></PageDone>
    </div>
</template>