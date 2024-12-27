<script setup lang="ts">
import type { BorderRadius } from '~/types';

interface Props {
    modelValue: BorderRadius;
    customValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: 'md',
    customValue: '8px',
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: BorderRadius): void;
    (e: 'update:customValue', value: string): void;
}>();

const selectedRadius = computed({
    get: () => props.modelValue,
    set: (value: BorderRadius) => emit('update:modelValue', value),
});

const customRadiusValue = computed({
    get: () => props.customValue,
    set: (value: string) => emit('update:customValue', value),
});

const radiusPresets = [
    { value: 'none', label: 'None', preview: '0px' },
    { value: 'sm', label: 'Small', preview: '4px' },
    { value: 'md', label: 'Medium', preview: '8px' },
    { value: 'lg', label: 'Large', preview: '12px' },
    { value: 'xl', label: 'Extra Large', preview: '16px' },
    { value: 'full', label: 'Full', preview: '9999px' },
] as const;
</script>

<template>
    <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300"> Border Radius </label>
        <p class="text-sm text-gray-500 dark:text-gray-400">Select the corner roundness</p>

        <div class="flex flex-col gap-3 mt-2">
            <UiBaseRadio
                v-for="preset in radiusPresets"
                :key="preset.value"
                v-model="selectedRadius"
                name="border-radius"
                :value="preset.value"
                :label="preset.label"
                labelPlacement="right"
            >
                <template #helper>
                    <div
                        class="w-6 h-6 border-2 border-gray-300 dark:border-gray-600"
                        :style="{ borderRadius: preset.preview }"
                    />
                </template>
            </UiBaseRadio>

            <!-- Custom Option -->
            <div class="flex items-center gap-3">
                <UiBaseRadio
                    v-model="selectedRadius"
                    name="border-radius"
                    value="custom"
                    label="Custom"
                    labelPlacement="right"
                />
                <input
                    v-if="selectedRadius === 'custom'"
                    type="text"
                    v-model="customRadiusValue"
                    placeholder="e.g. 8px"
                    class="w-20 px-2 py-1 text-sm border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                />
            </div>
        </div>
    </div>
</template>
