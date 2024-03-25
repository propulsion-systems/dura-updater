<script setup>
import { ref } from 'vue'
import { useWizard } from '../../composables/wizard.js'

import ManualDfuModal from '../ManualDfuModal.vue'

const { send } = useWizard()

const open = ref(false)
</script>

<template>
    <div class="container py-10 max-w-sm mx-auto">
        <div class="p-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 265 265" class="m-auto w-36 md:w-64">
                <g id="danger" transform="translate(-3 -3)">
                    <path id="Path_50" data-name="Path 50"
                        d="M29.75,9A13.25,13.25,0,0,1,43,22.25v79.5a13.25,13.25,0,0,1-26.5,0V22.25A13.25,13.25,0,0,1,29.75,9Z"
                        transform="translate(105.75 47)" fill="#ff453a" />
                    <path id="Path_51" data-name="Path 51"
                        d="M29.75,24A13.25,13.25,0,1,0,43,37.25,13.25,13.25,0,0,0,29.75,24Z"
                        transform="translate(105.75 164.5)" fill="#ff453a" />
                    <path id="Path_52" data-name="Path 52"
                        d="M135.5,3A132.5,132.5,0,1,0,268,135.5,132.5,132.5,0,0,0,135.5,3ZM29.5,135.5a106,106,0,1,0,106-106A106,106,0,0,0,29.5,135.5Z"
                        fill="#ff453a" fill-rule="evenodd" />
                </g>
            </svg>
        </div>
        <h3 class="text-xl font-semibold">Update failed please try again</h3>
        <button @click="send('RETRY')"
            class="bg-durablue text-white py-2 px-24 rounded-md text-xl m-10 transition delay-100 hover:bg-duraaccent">Try
            again</button>
        <p>
            If you manually put your LinkTouch in update mode you can skip this step
        </p>
        <a href="#" class="text-duraaccent hover:text-durablue duration-300 underline underline-offset-4" @click="open = true">How to manually put the LinkTouch in update mode?</a>
        <a href="#" class="text-duraaccent hover:text-durablue duration-300 underline underline-offset-4" @click="open = true">My LinkTouch doesnt react anymore</a>

        <ManualDfuModal :open="open">
            <button @click="open = false" type="button"
                class="inline-flex w-full justify-center rounded-md border border-transparent bg-durablue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-duraaccent transition duration-300 focus:outline-none sm:text-sm">Understood</button>
        </ManualDfuModal>
    </div>
</template>