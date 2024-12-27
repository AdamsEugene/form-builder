//components/ui/BaseSwitch.vue
<script setup lang="ts">
interface Props {
    modelValue: boolean;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    label?: string;
}

const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    size: 'md',
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();

const toggle = () => {
    if (!props.disabled) {
        emit('update:modelValue', !props.modelValue);
    }
};

// Computed classes for dynamic sizing
const containerClasses = computed(() => ({
    'h-6 w-11': props.size === 'sm',
    'h-7 w-14': props.size === 'md',
    'h-8 w-16': props.size === 'lg',
    'opacity-50 cursor-not-allowed': props.disabled,
    'cursor-pointer': !props.disabled,
}));

const toggleClasses = computed(() => ({
    'h-5 w-5': props.size === 'sm',
    'h-6 w-6': props.size === 'md',
    'h-7 w-7': props.size === 'lg',
    // Adjust translations for perfect centering
    'translate-x-5': props.size === 'sm' && props.modelValue,
    'translate-x-7': props.size === 'md' && props.modelValue,
    'translate-x-8': props.size === 'lg' && props.modelValue,
}));
</script>

<template>
    <div class="flex items-center">
        <button
            type="button"
            role="switch"
            :aria-checked="modelValue"
            :aria-label="label"
            :disabled="disabled"
            @click="toggle"
            class="relative inline-flex items-center shrink-0 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            :class="[containerClasses, modelValue ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700']"
        >
            <span
                class="absolute inline-block rounded-full bg-white shadow-lg transform ring-0 transition duration-200 ease-in-out left-0.5"
                :class="toggleClasses"
            />
        </button>
        <span v-if="label" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
            {{ label }}
        </span>
    </div>
</template>
