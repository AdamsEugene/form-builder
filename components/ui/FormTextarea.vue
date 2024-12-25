<script setup lang="ts">
interface Props {
    modelValue: string;
    label?: string;
    placeholder?: string;
    helper?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    id?: string;
    name?: string;
    rows?: number;
    maxlength?: number;
    minlength?: number;
    autogrow?: boolean;
    size?: 'sm' | 'md' | 'lg';
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const props = withDefaults(defineProps<Props>(), {
    rows: 4,
    required: false,
    disabled: false,
    size: 'md',
    resize: 'vertical',
    autogrow: false,
});

const emit = defineEmits<{
    'update:modelValue': [value: string];
    blur: [event: FocusEvent];
    focus: [event: FocusEvent];
    input: [event: Event];
}>();

const textareaRef = ref<HTMLTextAreaElement | null>(null);
const inputId = computed(() => props.id || `textarea-${Math.random().toString(36).slice(2)}`);

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

const textareaClasses = computed(() => [
    'w-full rounded-form border transition-colors duration-200',
    sizeClasses.value,
    'placeholder:text-gray-400 dark:placeholder:text-gray-500',
    props.error
        ? 'border-error-light focus:border-error-light focus:ring-2 focus:ring-error-light/20 dark:border-error-dark dark:focus:border-error-dark'
        : 'border-gray-300 focus:border-primary-600 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600',
    'bg-light-background dark:bg-dark-background',
    'text-gray-700 dark:text-gray-200',
    props.disabled && 'bg-light-surface text-gray-500 cursor-not-allowed dark:bg-dark-surface/60',
    `resize-${props.resize}`,
]);

const containerClasses = computed(() => ['group relative', props.disabled && 'opacity-75']);

const updateValue = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    emit('update:modelValue', target.value);
    emit('input', event);

    if (props.autogrow) {
        adjustHeight();
    }
};

// Function to handle auto-growing textarea
const adjustHeight = () => {
    if (!textareaRef.value) return;
    textareaRef.value.style.height = 'auto';
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
};

// Character count
const charCount = computed(() => props.modelValue.length);
const showCharCount = computed(() => props.maxlength !== undefined);

// Watch for content changes if autogrow is enabled
watch(
    () => props.modelValue,
    () => {
        if (props.autogrow) {
            nextTick(adjustHeight);
        }
    }
);

// Initialize autogrow
onMounted(() => {
    if (props.autogrow) {
        adjustHeight();
    }
});
</script>

<template>
    <div :class="containerClasses">
        <!-- Label -->
        <label v-if="label" :for="inputId" class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
            {{ label }}
            <span v-if="required" class="text-error-light dark:text-error-dark ml-1">*</span>
        </label>

        <!-- Textarea -->
        <textarea
            ref="textareaRef"
            class="!rounded-2xl"
            :id="inputId"
            :value="modelValue"
            :placeholder="placeholder"
            :required="required"
            :disabled="disabled"
            :name="name"
            :rows="rows"
            :maxlength="maxlength"
            :minlength="minlength"
            :class="textareaClasses"
            @input="updateValue"
            @blur="$emit('blur', $event)"
            @focus="$emit('focus', $event)"
        />

        <!-- Helper Text, Error Message, and Character Count -->
        <div class="mt-1 flex justify-between items-start">
            <div
                v-if="helper || error"
                :class="[
                    'text-sm',
                    error ? 'text-error-light dark:text-error-dark' : 'text-gray-500 dark:text-gray-400',
                ]"
            >
                {{ error || helper }}
            </div>

            <div v-if="showCharCount" class="text-sm text-gray-500 dark:text-gray-400">
                {{ charCount }} / {{ maxlength }}
            </div>
        </div>
    </div>
</template>
