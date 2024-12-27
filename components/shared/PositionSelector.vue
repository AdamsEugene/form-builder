<script setup lang="ts">
import type { Placement } from '~/types';

interface Props {
    modelValue: Placement;
    availablePlacements?: Placement[];
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: 'right',
    availablePlacements: () => ['left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'center'],
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: Placement): void;
}>();

const selectedPosition = computed({
    get: () => props.modelValue,
    set: (value: Placement) => emit('update:modelValue', value),
});

// Helper function to format placement label
const formatPlacementLabel = (placement: Placement): string => {
    return placement
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
</script>

<template>
    <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300"> Position </label>
        <p class="text-sm text-gray-500 dark:text-gray-400">Select where on the page to show this survey</p>

        <div class="flex flex-col gap-3 mt-2">
            <UiBaseRadio
                v-for="placement in availablePlacements"
                :key="placement"
                v-model="selectedPosition"
                name="placements"
                :value="placement"
                :label="formatPlacementLabel(placement)"
                labelPlacement="right"
            />
        </div>
    </div>
</template>
