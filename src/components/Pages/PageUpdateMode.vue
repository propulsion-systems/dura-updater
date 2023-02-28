<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
    const props = defineProps({
        machine: {}
    })


    const open = ref(false)

</script>

<template>
            <div class="container py-10 ">
                <h3 class="text-xl font-semibold">First we need to put the LinkTouch in update mode.</h3>
                <p class="text-lg pt-10">Please select 
                    <span class="text-duraaccent">DURALink LinkTouch</span> and click connect
                </p>
                <div class="flex flex-col items-center mt-5">
                    <button @click="machine.send('CONTINUE')" class="bg-durablue text-white py-2 px-24 rounded-md mt-5 text-xl transition duration-300 hover:bg-duraaccent">Select LinkTouch</button>
                    <button class="bg-duraaccent text-white py-2 px-24 rounded-md mt-5 text-xl transition duration-300 hover:bg-durablue">Manually put in update mode</button>
                </div>
                <p class="pt-10 text-gray-400">
                    If you manually put your LinkTouch in update mode you can skip this step
                </p>
                <a href="#" class="text-duraaccent" @click="open = true">How to manually put the LinkTouch in update mode?</a>

                <TransitionRoot as="template" :show="open">
                    <Dialog as="div" class="relative z-10" @close="open = false">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </TransitionChild>

                    <div class="fixed inset-0 z-10 overflow-y-auto">
                        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                            <div>
                                <div class="mt-3 text-center sm:mt-5">
                                <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">How to put your LinkTouch in update mode?</DialogTitle>
                                <div class="mt-2">
                                    <p class="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.</p>
                                </div>
                                </div>
                            </div>
                            <div class="mt-5 sm:mt-6">
                                <button type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-duraaccent px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-durablue transition duration-300 focus:outline-none sm:text-sm" @click="open = false">Understood</button>
                            </div>
                            </DialogPanel>
                        </TransitionChild>
                        </div>
                    </div>
                    </Dialog>
                </TransitionRoot>
  
                
            </div>

</template>