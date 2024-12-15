<script setup lang="ts">
type Props = {
    isOpen?: boolean;
    handleClick: () => void;
};

defineProps<Props>();
</script>

<template>
    <button
        class="sticky z-50 right-0 bottom-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
        :class="[isOpen ? 'bg-red-500' : 'bg-red-500 hover:bg-red-600']"
        @click="handleClick"
        :aria-label="isOpen ? 'Close menu' : 'Open menu'"
        :aria-expanded="Boolean(isOpen)"
    >
        <transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition duration-300 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <svg
                v-if="!isOpen"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-6 h-6 text-white"
                fill="currentColor"
            >
                <path
                    d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm4-8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-6 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm8.924 2.924a.5.5 0 0 1-.848.53A5.989 5.989 0 0 1 12 17a5.989 5.989 0 0 1-6.076-2.546.5.5 0 0 1 .848-.53A4.989 4.989 0 0 0 12 16a4.989 4.989 0 0 0 5.228-2.546z"
                />
            </svg>
            <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-6 h-6 text-white"
                fill="currentColor"
            >
                <path d="M12 16l-6-6h12l-6 6z" />
            </svg>
        </transition>
    </button>
</template>
