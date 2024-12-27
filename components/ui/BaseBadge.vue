//components/ui/BaseBadge.vue
<script setup lang="ts">
interface Props {
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
    size?: 'sm' | 'md' | 'lg';
    pill?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'primary',
    size: 'md',
    pill: false,
});

const baseClasses = 'inline-flex items-center justify-center font-medium';

const variantClasses = computed(() => ({
    // Primary
    'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300': props.variant === 'primary',
    // Secondary
    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300': props.variant === 'secondary',
    // Success
    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300': props.variant === 'success',
    // Danger
    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300': props.variant === 'danger',
    // Warning
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300': props.variant === 'warning',
}));

const sizeClasses = computed(() => ({
    'text-xs px-2 py-0.5': props.size === 'sm',
    'text-sm px-2.5 py-0.5': props.size === 'md',
    'text-base px-3 py-1': props.size === 'lg',
}));

const roundedClasses = computed(() => (props.pill ? 'rounded-full' : 'rounded-md'));
</script>

<template>
    <span :class="[baseClasses, variantClasses, sizeClasses, roundedClasses]">
        <slot />
    </span>
</template>
