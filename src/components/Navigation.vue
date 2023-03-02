<script setup>
import { computed } from 'vue'
import { useWizard } from '../composables/wizard.js'

import NavigationItem from './NavigationItem.vue'

const { state } = useWizard()

const steps = [
    'start',
    'dfu.info',
    'dfu.select',
    'dfu.set',
    'update.info',
    'update.select',
    'update.updating',
    'updated',
    'unsupported',
    'error'
]

const step = computed(() => {
    const stepStrings = state.value.toStrings()
    return steps.indexOf(stepStrings[stepStrings.length - 1])
})

const error = computed(() => state.value.matches('error') || state.value.matches('unsupported'))
</script>

<template>
    <header class="bg-durablue shadow">
        <div class="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold leading-tight text-center text-white">LinkTouch Updater</h1>
            <div class="mx-4 p-6 pt-10">
                <div class="flex items-center">
                    <NavigationItem index="0" :step="step" name="Start" :error="error">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="feather feather-play-circle ">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polygon points="10 8 16 12 10 16 10 8"></polygon>
                        </svg>
                    </NavigationItem>
                    <NavigationItem index="1" :step="step" name="Update Mode" :error="error">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="feather feather-tool ">
                            <path
                                d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z">
                            </path>
                        </svg>
                    </NavigationItem>
                    <NavigationItem index="6" :step="step" name="Updating" :error="error">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="feather feather-refresh-cw ">
                            <polyline points="23 4 23 10 17 10"></polyline>
                            <polyline points="1 20 1 14 7 14"></polyline>
                            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                        </svg>
                    </NavigationItem>
                    <NavigationItem index="7" :step="step" name="Done" :error="error">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="feather feather-check-circle ">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                    </NavigationItem>
                </div>
            </div>
        </div>
    </header>
</template>