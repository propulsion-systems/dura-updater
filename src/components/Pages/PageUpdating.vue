<script setup>
import ManualDfuModal from '../ManualDfuModal.vue';
import { ref } from 'vue';
    const props = defineProps({
        machine: {}
    })

    const open = ref(false);
</script>
<template>

<div class="container py-10 max-w-xs mx-auto">
    <h3 class="text-xl font-semibold">LinkTouch is now in update mode</h3>
    <p class="text-lg pt-10">Please select 
        <span class="text-duraaccent">STM32 BOOTLOADER - Paired</span> and click connect
    </p>

    <div class="flex flex-col items-center gap-4 mt-5 max-w-xs md:max-w-md mx-auto">
        <button @click="machine.send('CONTINUE')" class="bg-durablue text-white py-2 px-4 rounded-md md:text-xl transition duration-300 hover:bg-duraaccent w-full">Select LinkTouch</button>
    <button @click="machine.send('RETRY')" class="bg-duraaccent text-white py-2 px-4 rounded-md md:text-xl transition duration-300 hover:bg-durablue w-full">Restart Updater</button>
    </div>

    <div class="mt-5">
        <a href="#" class="text-duraaccent" @click="open = true">How to manually put the LinkTouch in update mode?</a>

    <ManualDfuModal :open="open">
        <button @click="open = false" type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-durablue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-duraaccent transition duration-300 focus:outline-none sm:text-sm">Understood</button>
    </ManualDfuModal>
    </div>
</div>

</template>