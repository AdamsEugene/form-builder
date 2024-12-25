<script setup lang="ts">
import { computed } from 'vue';
import type { ButtonHTMLAttributes } from 'vue';
import type { LucideIcon } from 'lucide-vue-next';

import { Loader2 } from 'lucide-vue-next';

interface Props {
    // Button variations
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    fullWidth?: boolean;
    loading?: boolean;
    disabled?: boolean;

    // Optional icon props
    leftIcon?: LucideIcon;
    rightIcon?: LucideIcon;

    // Native button attributes
    type?: ButtonHTMLAttributes['type'];
    name?: string;
    value?: string | number;
    form?: string;
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'primary',
    size: 'md',
    type: 'button',
    fullWidth: false,
    loading: false,
    disabled: false,
});

const emit = defineEmits<{
    click: [event: MouseEvent];
}>();

// Base classes that are always applied
const baseClasses = computed(() => [
    'inline-flex items-center justify-center',
    'font-medium transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    props.fullWidth ? 'w-full' : '',
]);

// Size specific classes
const sizeClasses = computed(() => {
    switch (props.size) {
        case 'xs':
            return 'px-2.5 py-1.5 text-xs rounded';
        case 'sm':
            return 'px-3 py-2 text-sm leading-4 rounded-2xl';
        case 'lg':
            return 'px-4 py-2.5 text-base rounded-2xl';
        case 'xl':
            return 'px-6 py-3 text-lg rounded-2xl';
        default: // md
            return 'px-4 py-2 text-sm rounded-2xl';
    }
});

// Variant specific classes
const variantClasses = computed(() => {
    switch (props.variant) {
        case 'primary':
            return [
                'bg-primary-600 text-white',
                'hover:bg-primary-700',
                'focus:ring-primary-500',
                'dark:bg-primary-500 dark:hover:bg-primary-600',
            ];
        case 'secondary':
            return [
                'bg-gray-100 text-gray-700',
                'hover:bg-gray-200',
                'focus:ring-gray-500',
                'dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
            ];
        case 'outline':
            return [
                'border border-gray-300 text-gray-700',
                'hover:bg-gray-50',
                'focus:ring-primary-500',
                'dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800',
            ];
        case 'ghost':
            return [
                'text-gray-700',
                'hover:bg-gray-100',
                'focus:ring-gray-500',
                'dark:text-gray-100 dark:hover:bg-gray-800',
            ];
        case 'link':
            return [
                'text-primary-600 underline-offset-4',
                'hover:underline',
                'focus:ring-primary-500',
                'dark:text-primary-400',
            ];
        case 'danger':
            return [
                'bg-red-600 text-white',
                'hover:bg-red-700',
                'focus:ring-red-500',
                'dark:bg-red-500 dark:hover:bg-red-600',
            ];
        default:
            return [];
    }
});

// Icon size based on button size
const iconSize = computed(() => {
    switch (props.size) {
        case 'xs':
            return 14;
        case 'sm':
            return 16;
        case 'lg':
            return 20;
        case 'xl':
            return 24;
        default: // md
            return 18;
    }
});

// Icon margin based on button size
const iconMargin = computed(() => {
    switch (props.size) {
        case 'xs':
            return 'mx-1';
        case 'sm':
            return 'mx-1.5';
        default:
            return 'mx-2';
    }
});
</script>

<template>
    <button
        :type="type"
        :disabled="disabled || loading"
        :class="[baseClasses, sizeClasses, variantClasses, loading ? 'relative !text-transparent' : '']"
        @click="emit('click', $event)"
    >
        <!-- Loading Spinner -->
        <Loader2
            v-if="loading"
            :size="iconSize"
            class="absolute animate-spin"
            :class="[variant === 'ghost' || variant === 'link' ? 'text-gray-900 dark:text-white' : 'text-white']"
        />

        <!-- Left Icon -->
        <i v-if="leftIcon && !loading" :class="[leftIcon, iconMargin]" />

        <!-- Content -->
        <slot />

        <!-- Right Icon -->
        <i v-if="rightIcon && !loading" :class="[rightIcon, iconMargin]" />
    </button>
</template>
