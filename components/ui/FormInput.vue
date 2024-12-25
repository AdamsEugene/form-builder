<script setup lang="ts">
interface Props {
    modelValue: string | number;
    label?: string;
    placeholder?: string;
    helper?: string;
    error?: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
    required?: boolean;
    disabled?: boolean;
    id?: string;
    name?: string;
    autocomplete?: string;
    min?: number;
    max?: number;
    pattern?: string;
    size?: 'sm' | 'md' | 'lg';
    leftIcon?: string;
    rightIcon?: string;
    labelPlacement?: 'top' | 'right' | 'bottom' | 'left';
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    required: false,
    disabled: false,
    size: 'md',
    labelPlacement: 'top',
});

const emit = defineEmits<{
    'update:modelValue': [value: string | number];
    blur: [event: FocusEvent];
    focus: [event: FocusEvent];
}>();

const inputId = computed(() => props.id || `input-${Math.random().toString(36).slice(2)}`);

const sizeClasses = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'px-2 py-1 text-sm';
        case 'lg':
            return 'px-4 py-3 text-lg';
        default:
            return 'px-3 py-2 text-base';
    }
});

const inputClasses = computed(() => [
    'w-full rounded-2xl border transition-colors duration-200',
    sizeClasses.value,
    'placeholder:text-gray-400 dark:placeholder:text-gray-500',
    'bg-light-background dark:bg-dark-background',
    'text-gray-700 dark:text-gray-200',
    props.error
        ? 'border-error-light focus:border-error-light focus:ring-2 focus:ring-error-light/20 dark:border-error-dark dark:focus:border-error-dark'
        : 'border-gray-300 focus:border-primary-600 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600',
    props.disabled && 'bg-light-surface text-gray-500 cursor-not-allowed dark:bg-dark-surface/60',
    props.leftIcon && 'pl-10',
    props.rightIcon && 'pr-10',
]);

const containerClasses = computed(() => [
    'group relative',
    props.disabled && 'opacity-75',
    // Label placement classes
    props.labelPlacement === 'left' && 'flex flex-row-reverse items-center gap-4',
    props.labelPlacement === 'right' && 'flex flex-row items-center gap-4',
    props.labelPlacement === 'bottom' && 'flex flex-col-reverse gap-1',
    props.labelPlacement === 'top' && 'flex flex-col gap-1',
]);

const labelClasses = computed(() => [
    'block text-sm font-medium text-gray-700 dark:text-gray-200',
    // Label placement specific styles
    props.labelPlacement === 'left' && 'text-right',
    props.labelPlacement === 'right' && 'text-left',
    props.labelPlacement === 'top' && 'text-left',
    props.labelPlacement === 'bottom' && 'text-left',
    // Flex adjustments
    (props.labelPlacement === 'left' || props.labelPlacement === 'right') && 'flex-shrink-0 w-max',
]);

const inputContainerClasses = computed(() => [
    'relative rounded-2xl',
    (props.labelPlacement === 'left' || props.labelPlacement === 'right') && 'flex-grow',
]);

const updateValue = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = props.type === 'number' ? parseFloat(target.value) : target.value;
    emit('update:modelValue', value);
};
</script>

<template>
    <div :class="containerClasses">
        <!-- Label -->
        <label v-if="label" :for="inputId" :class="labelClasses">
            {{ label }}
            <span v-if="required" class="text-error-light dark:text-error-dark ml-1">*</span>
        </label>

        <!-- Input Container -->
        <div :class="inputContainerClasses">
            <!-- Left Icon -->
            <div v-if="leftIcon" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                <i :class="leftIcon"></i>
            </div>

            <!-- Input -->
            <input
                :id="inputId"
                :type="type"
                :value="modelValue"
                :placeholder="placeholder"
                :required="required"
                :disabled="disabled"
                :name="name"
                :autocomplete="autocomplete"
                :min="min"
                :max="max"
                :pattern="pattern"
                :class="inputClasses"
                @input="updateValue"
                @blur="$emit('blur', $event)"
                @focus="$emit('focus', $event)"
            />

            <!-- Right Icon -->
            <div v-if="rightIcon" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                <i :class="rightIcon"></i>
            </div>
        </div>

        <!-- Helper Text or Error Message -->
        <div
            v-if="helper || error"
            :class="[
                'text-sm',
                error ? 'text-error-light dark:text-error-dark' : 'text-gray-500 dark:text-gray-400',
                // Adjust margin based on label placement
                props.labelPlacement === 'bottom' ? 'mt-0' : 'mt-1',
            ]"
        >
            {{ error || helper }}
        </div>
    </div>
</template>
