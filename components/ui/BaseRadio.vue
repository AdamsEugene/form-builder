// components/BaseRadio.vue
<script setup lang="ts">
type RadioSize = 'sm' | 'md' | 'lg';
type LabelPlacement = 'right' | 'left' | 'top' | 'bottom';

interface RadioProps {
    modelValue: any;
    value: any;
    label?: string;
    description?: string;
    name?: string;
    disabled?: boolean;
    required?: boolean;
    error?: string;
    helperText?: string;
    size?: RadioSize;
    labelPlacement?: LabelPlacement;
}

const props = withDefaults(defineProps<RadioProps>(), {
    label: '',
    description: '',
    name: '',
    disabled: false,
    required: false,
    error: '',
    helperText: '',
    size: 'md',
    labelPlacement: 'right',
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: any): void;
}>();

const isSelected = computed({
    get() {
        return props.modelValue === props.value;
    },
    set(checked: boolean) {
        if (checked) {
            emit('update:modelValue', props.value);
        }
    },
});

const inputId = computed(() => `radio-${useId()}`);
const hasError = computed(() => Boolean(props.error));

const ariaDescribedby = computed(() => {
    const ids: string[] = [];
    if (props.description) ids.push(`${inputId.value}-description`);
    if (props.helperText) ids.push(`${inputId.value}-helper`);
    if (props.error) ids.push(`${inputId.value}-error`);
    return ids.join(' ') || undefined;
});

const radioSizeClasses = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'h-3 w-3';
        case 'lg':
            return 'h-5 w-5';
        default:
            return 'h-4 w-4';
    }
});

const labelSizeClasses = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'text-xs';
        case 'lg':
            return 'text-base';
        default:
            return 'text-sm';
    }
});

const wrapperClasses = computed(() => {
    const baseClasses = 'relative';

    switch (props.labelPlacement) {
        case 'left':
            return `${baseClasses} flex flex-row-reverse justify-end items-center`;
        case 'top':
            return `${baseClasses} flex flex-col-reverse items-start`;
        case 'bottom':
            return `${baseClasses} flex flex-col items-start`;
        default: // right
            return `${baseClasses} flex items-center`;
    }
});

const labelSpacingClasses = computed(() => {
    switch (props.labelPlacement) {
        case 'left':
            return 'mr-3';
        case 'top':
            return 'mb-2';
        case 'bottom':
            return 'mt-2';
        default: // right
            return 'ml-3';
    }
});
</script>

<template>
    <div :class="wrapperClasses">
        <div class="flex items-center">
            <input
                :id="inputId"
                v-model="isSelected"
                type="radio"
                :name="name"
                :value="true"
                :required="required"
                :disabled="disabled"
                :aria-describedby="ariaDescribedby"
                :class="[
                    radioSizeClasses,
                    'form-radio border-gray-300 text-primary-600 focus:ring-primary-500',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    'dark:border-gray-600 dark:bg-dark-surface dark:checked:border-primary-500 dark:checked:bg-primary-500',
                    'dark:focus:ring-primary-500/20',
                    hasError && 'border-error-light focus:ring-error-light/20 dark:border-error-light',
                ]"
            />
        </div>
        <div v-if="label || description || helperText || error" :class="[labelSpacingClasses, labelSizeClasses]">
            <label
                :for="inputId"
                class="font-medium text-gray-700 dark:text-gray-200"
                :class="{
                    'cursor-not-allowed opacity-50': disabled,
                    'text-error-light dark:text-error-light': hasError,
                }"
            >
                {{ label }}
                <span v-if="required" class="text-error-light">*</span>
            </label>
            <p
                v-if="description"
                :id="`${inputId}-description`"
                class="text-gray-500 dark:text-gray-400"
                :class="{ 'cursor-not-allowed opacity-50': disabled }"
            >
                {{ description }}
            </p>
            <p v-if="helperText && !error" :id="`${inputId}-helper`" class="mt-1 text-gray-500 dark:text-gray-400">
                {{ helperText }}
            </p>
            <p v-if="error" :id="`${inputId}-error`" class="mt-1 text-error-light dark:text-error-light">
                {{ error }}
            </p>
        </div>
    </div>
</template>
