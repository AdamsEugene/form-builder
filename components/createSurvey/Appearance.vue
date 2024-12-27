// YourComponent.vue
<script setup lang="ts">
import { ref } from 'vue';
import { ArrowRight } from 'lucide-vue-next';
import type { Placement } from '~/types';

const cc = [
    '#E0E0E0',
    '#FF9800',
    '#FFC107',
    '#4CAF50',
    '#03A9F4',
    '#9C27B0',
    '#F44336',
    '#E91E63',
    '#2196F3',
    '#009688',
];

const sidePlacements: Placement[] = ['left', 'right'];

// Initialize with a default color
const selectedColor = ref('#E0E0E0');
const position = ref<'left' | 'right'>('right');
</script>

<template>
    <div class="flex flex-col gap-8">
        <div
            class="bg-white w-full dark:bg-gray-800 flex flex-col gap-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
        >
            <div class="flex flex-col gap-4">
                <UiColorPicker v-model="selectedColor" :predefinedColors="cc" label="Background color" />
                <UiColorPicker v-model="selectedColor" :predefinedColors="cc" label="Buttons color" />
                <UiColorPicker v-model="selectedColor" :predefinedColors="cc" label="Buttons text color" />
                <SharedPositionSelector v-model="position" :available-placements="sidePlacements" />
            </div>
        </div>

        <div class="flex justify-end w-full">
            <UiBaseButton size="md" class="flex items-center gap-2">
                Next
                <ArrowRight class="w-4 h-4" />
            </UiBaseButton>
        </div>
    </div>
</template>
