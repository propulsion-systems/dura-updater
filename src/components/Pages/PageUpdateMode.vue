<script setup>
import { ref } from 'vue'
import { useWizard } from '../../composables/wizard.js'

import ManualDfuModal from '../ManualDfuModal.vue'

const { send } = useWizard()

const open = ref(false)
</script>

<template>
    <div class="py-10 max-w-xs md:max-w-md mx-auto">
        <h3 class="text-xl font-semibold">First we need to put the LinkTouch in update mode.</h3>
        <p class="text-lg pt-10">Please select
            <span class="text-duraaccent">DURALink LinkTouch</span> and click connect
        </p>
        <div class="flex flex-col gap-4 items-center mt-5 max-w-xs md:max-w-md mx-auto">
            <button @click="send('CONTINUE')"
                class="bg-durablue text-white w-full py-2 px-4 rounded-md md:text-xl transition duration-300 hover:bg-duraaccent">Select
                LinkTouch</button>
            <button @click="send('SKIP')"
                class="bg-duraaccent text-white w-full py-2 px-4 rounded-md md:text-xl transition duration-300 hover:bg-durablue">Already
                in update mode</button>
        </div>
        <p class="pt-10 text-gray-400">
            If you manually put your LinkTouch in update mode you can skip this step
        </p>

        <a href="#" class="text-duraaccent" @click="open = true">How to manually put the LinkTouch in update mode?</a>

        <ManualDfuModal :open="open">
            <button @click="open = false" type="button"
                class="inline-flex w-full justify-center rounded-md border border-transparent bg-durablue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-duraaccent transition duration-300 focus:outline-none sm:text-sm">Cancel</button>
            <button @click="send('SKIP')" type="button"
                class="inline-flex w-full justify-center rounded-md border border-transparent bg-duraaccent px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-durablue transition duration-300 focus:outline-none sm:text-sm">Understood</button>
        </ManualDfuModal>


    </div>
</template>