// components/BasePillRadio.vue
<script setup lang="ts">
interface PillRadioProps {
    modelValue: any;
    value: any;
    label: string;
    disabled?: boolean;
    name: string; // Required for radio button groups
}

const props = withDefaults(defineProps<PillRadioProps>(), {
    disabled: false,
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

const inputId = computed(() => `pill-radio-${useId()}`);
</script>

<template>
    <div class="inline-flex">
        <label
            :for="inputId"
            class="relative flex w-full items-center rounded-full border bg-white px-4 py-2 cursor-pointer transition-colors duration-200"
            :class="{
                'opacity-50 cursor-not-allowed': disabled,
                'border-gray-300 hover:bg-gray-50': !isSelected && !disabled,
                'border-primary-600 bg-primary-50 hover:bg-primary-100': isSelected && !disabled,
            }"
        >
            <input
                :id="inputId"
                v-model="isSelected"
                type="radio"
                :name="name"
                :value="true"
                :disabled="disabled"
                class="form-radio h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-0 disabled:cursor-not-allowed"
            />
            <span
                class="ml-2 text-sm"
                :class="{
                    'cursor-not-allowed text-gray-500': disabled,
                    'text-gray-700': !isSelected && !disabled,
                    'text-primary-700': isSelected && !disabled,
                }"
            >
                {{ label }}
            </span>
        </label>
    </div>
</template>
