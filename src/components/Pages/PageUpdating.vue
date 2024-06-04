<script setup>
import { ref } from 'vue'
import { useWizard } from '../../composables/wizard.js'

import ManualDfuModal from '../ManualDfuModal.vue'

const { send } = useWizard()

const open = ref(false)
</script>
<template>
    <div class="container py-10 max-w-xs md:max-w-md mx-auto">
        <h3 class="text-xl font-semibold">LinkTouch is now in update mode</h3>
        <p class="text-lg pt-10">Please select
            <span class="text-duraaccent">STM32 BOOTLOADER - Paired</span> and click connect
        </p>

        <div class="flex flex-col items-center gap-4 mt-5 max-w-xs md:max-w-md mx-auto">
            <button @click="send('CONTINUE')"
                class="bg-durablue text-white py-2 px-4 rounded-md md:text-xl transition duration-300 hover:bg-duraaccent w-full">Select
                Bootloader</button>
        </div>
        <div class="grid pt-10 gap-4">
            <a href="#" class="text-duraaccent" @click="open = true">How to manually put the LinkTouch in update mode?</a>
            <div class="grid">
                <p class="text-gray-400">
                Restart the updating procedure by clicking below.
            </p>
            <a href="#" @click="send('RETRY')"
                class="text-duraaccent">Restart the updater</a>
            </div>
        </div>  

        <div class="mt-5">

            <ManualDfuModal :open="open">
                <button @click="open = false" type="button"
                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-durablue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-duraaccent transition duration-300 focus:outline-none sm:text-sm">Understood</button>
            </ManualDfuModal>
        </div>
    </div>
</template>