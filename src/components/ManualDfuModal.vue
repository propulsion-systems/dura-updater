<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

defineProps({
    open: {}
})
</script>

<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto ">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 max-w-7xl sm:p-6">
                <div>
                    <div class="mt-3 sm:mt-5">
                        <DialogTitle as="h3" class="text-base font-semibold text-gray-900">How to put your LinkTouch in update mode?</DialogTitle>
                        <div>
                            <img src="/assets/linktouch_manual_dfu.jpg" alt="" class="md:w-2/4 mx-auto pb-6 md:py-6">
                            <p class="text-sm text-gray-500 leading-relaxed">
                                To manually put your "LinkTouch" device into DFU mode, follow these steps:
                                <ul class="list-decimal list-inside py-6">
                                    <li>Turn you LinkTouch around, here you will find two small pins</li>
                                    <li>Press and hold down the "BOOT" button on your device.</li>
                                    <li>While continuing to hold down the "BOOT" button, press and hold down the "RESET" button on your device.</li>
                                    <li>Keep holding both buttons down for a brief moment, and then release the "RESET" button while still holding down the "BOOT" button.</li>
                                    <li>Finally, release the "BOOT" button to complete the process.</li>
                                </ul>
                                After following these steps, your "LinkTouch" device should now be in DFU mode and ready for further actions.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="mt-5 sm:mt-6 flex gap-2">
                    <slot />
                </div>
                </DialogPanel>
            </TransitionChild>
            </div>
        </div>
        </Dialog>
    </TransitionRoot>
</template>