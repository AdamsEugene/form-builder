// components/BasePillCheckbox.vue
<script setup lang="ts">
interface PillCheckboxProps {
    modelValue: boolean;
    label: string;
    disabled?: boolean;
    name?: string;
}

const props = withDefaults(defineProps<PillCheckboxProps>(), {
    modelValue: false,
    disabled: false,
    name: '',
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();

const isChecked = computed({
    get() {
        return props.modelValue;
    },
    set(value: boolean) {
        emit('update:modelValue', value);
    },
});

const inputId = computed(() => `pill-checkbox-${useId()}`);
</script>

<template>
    <div class="inline-flex">
        <label
            :for="inputId"
            class="relative flex items-center rounded-full border bg-white px-4 py-2 cursor-pointer transition-colors duration-200"
            :class="{
                'opacity-50 cursor-not-allowed': disabled,
                'border-gray-300 hover:bg-gray-50': !isChecked && !disabled,
                'border-primary-600 bg-primary-50 hover:bg-primary-100': isChecked && !disabled,
            }"
        >
            <input
                :id="inputId"
                v-model="isChecked"
                type="checkbox"
                :name="name"
                :disabled="disabled"
                class="form-checkbox h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-0 disabled:cursor-not-allowed"
            />
            <span
                class="ml-2 text-sm"
                :class="{
                    'cursor-not-allowed text-gray-500': disabled,
                    'text-gray-700': !isChecked && !disabled,
                    'text-primary-700': isChecked && !disabled,
                }"
            >
                {{ label }}
            </span>
        </label>
    </div>
</template>
