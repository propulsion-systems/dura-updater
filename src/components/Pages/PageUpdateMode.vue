<template>
            <div class="container py-10 ">
                <h3 class="text-xl font-semibold">First we need to put the LinkTouch in update mode.</h3>
                <p class="text-lg pt-10">Please select 
                    <span class="text-duraaccent">DURALink LinkTouch</span> and click connect
                </p>
                <div class="flex flex-col items-center mt-5">
                    <button class="bg-durablue text-white py-2 px-24 rounded-md mt-5 text-xl transition delay-100 hover:bg-duraaccent">Select LinkTouch</button>
                    <button class="bg-duraaccent text-white py-2 px-24 rounded-md mt-5 text-xl transition delay-100 hover:bg-durablue">Manually put in update mode</button>
                </div>
                <p class="pt-10 text-gray-400">
                    If you manually put your LinkTouch in update mode you can skip this step
                </p>
                <a data-modal-toggle="defaultModal" class="text-duraaccent">How to manually put the LinkTouch in update mode?</a>

                <!-- Main modal -->
                <div id="defaultModal" tabindex="-1" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex hidden" aria-modal="true" role="dialog">
                    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
                        <!-- Modal content -->
                        <div class="relative bg-white rounded-lg shadow">
                            <!-- Modal header -->
                            <div class="flex justify-between items-start p-4 rounded-t border-b">
                                <h3 class="text-xl font-semibold text-gray-900">
                                    How to manually put the LinkTouch in update mode?
                                </h3>
                                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="defaultModal">
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            <!-- Modal body -->
                            <div class="p-6 space-y-6 text-left">
                                <p class="text-base leading-relaxed text-gray-500">
                                    Lorem ipsum
                                </p>
                                <p class="text-base leading-relaxed text-gray-500">
                                    Lorem ipsum
                                </p>
                            </div>
                            <!-- Modal footer -->
                            <div class="flex items-center m-auto p-6 space-x-2 rounded-b border-t border-gray-200 items-center">
                                <button  data-modal-toggle="defaultModal" class="bg-durablue text-white py-2 rounded-md text-xl transition delay-100 hover:bg-duraaccent w-2/6">Continue</button>
                            </div>
                        </div>
                    </div>
                </div>
  
                
            </div>

</template>