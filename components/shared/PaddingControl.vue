<script setup lang="ts">
import type { Padding } from '~/types';

interface Props {
    modelValue: Padding;
    customValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: 'md',
    customValue: '16px',
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: Padding): void;
    (e: 'update:customValue', value: string): void;
}>();

const selectedPadding = computed({
    get: () => props.modelValue,
    set: (value: Padding) => emit('update:modelValue', value),
});

const customPaddingValue = computed({
    get: () => props.customValue,
    set: (value: string) => emit('update:customValue', value),
});

const paddingPresets = [
    { value: 'none', label: 'None', preview: '0px' },
    { value: 'sm', label: 'Small', preview: '8px' },
    { value: 'md', label: 'Medium', preview: '16px' },
    { value: 'lg', label: 'Large', preview: '24px' },
    { value: 'xl', label: 'Extra Large', preview: '32px' },
] as const;
</script>

<template>
    <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300"> Padding </label>
        <p class="text-sm text-gray-500 dark:text-gray-400">Select the inner spacing</p>

        <div class="flex flex-col gap-3 mt-2">
            <UiBaseRadio
                v-for="preset in paddingPresets"
                :key="preset.value"
                v-model="selectedPadding"
                name="padding"
                :value="preset.value"
                :label="preset.label"
                labelPlacement="right"
            >
                <template #helper>
                    <div class="w-8 h-8 border border-gray-300 dark:border-gray-600">
                        <div class="w-full h-full bg-blue-500/20" :style="{ padding: preset.preview }">
                            <div class="w-full h-full bg-blue-500/20" />
                        </div>
                    </div>
                </template>
            </UiBaseRadio>

            <!-- Custom Option -->
            <div class="flex items-center gap-3">
                <UiBaseRadio
                    v-model="selectedPadding"
                    name="padding"
                    value="custom"
                    label="Custom"
                    labelPlacement="right"
                />
                <input
                    v-if="selectedPadding === 'custom'"
                    type="text"
                    v-model="customPaddingValue"
                    placeholder="e.g. 16px"
                    class="w-20 px-2 py-1 text-sm border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                />
            </div>
        </div>
    </div>
</template>
