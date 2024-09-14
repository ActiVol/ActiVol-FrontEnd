<template>
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
        id="my-modal">
        <div
            class="relative bg-white rounded-lg shadow-xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl overflow-hidden">
            <div class="max-h-[calc(100vh-2rem)] overflow-y-auto p-6">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Modal",
    emits: ["close"],
};
</script>
