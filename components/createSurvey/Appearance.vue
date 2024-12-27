// YourComponent.vue
<script setup lang="ts">
import { ref } from 'vue';
import { ArrowRight } from 'lucide-vue-next';
import { surveyColors } from '~/constants/colors';
import type { BorderRadius, Padding, Placement } from '~/types';

const sidePlacements: Placement[] = ['left', 'right'];

// Initialize with a default color
const selectedColor = ref('#E0E0E0');
const position = ref<'left' | 'right'>('right');

const borderRadius = ref<BorderRadius>('md');
const customBorderRadius = ref('8px');
const padding = ref<Padding>('md');
const customPadding = ref('16px');
</script>

<template>
    <div class="flex flex-col gap-8">
        <div
            class="bg-white w-full dark:bg-gray-800 flex flex-col gap-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
        >
            <div class="flex flex-col gap-8">
                <UiColorPicker
                    v-model="selectedColor"
                    :predefinedColors="surveyColors.backgroundColor"
                    label="Background color"
                />
                <UiColorPicker
                    v-model="selectedColor"
                    :predefinedColors="surveyColors.questionColor"
                    label="Question color"
                />
                <UiColorPicker
                    v-model="selectedColor"
                    :predefinedColors="surveyColors.labelColor"
                    label="Label color"
                />
                <UiColorPicker
                    v-model="selectedColor"
                    :predefinedColors="surveyColors.emojiBackgroundColor"
                    label="Emoji background color"
                />
                <UiColorPicker
                    v-model="selectedColor"
                    :predefinedColors="surveyColors.emojiHoverColor"
                    label="Emoji hover color"
                />
                <UiColorPicker
                    v-model="selectedColor"
                    :predefinedColors="surveyColors.emojiActiveColor"
                    label="Emoji active color"
                />
                <UiColorPicker
                    v-model="selectedColor"
                    :predefinedColors="surveyColors.nextButtonBgColor"
                    label="Next button background color"
                />
                <UiColorPicker
                    v-model="selectedColor"
                    :predefinedColors="surveyColors.nextButtonTextColor"
                    label="Next button text color"
                />
                <SharedPositionSelector v-model="position" :available-placements="sidePlacements" />

                <div class="flex gap-8 items-center">
                    <div class="flex flex-col gap-8">
                        <SharedBorderRadiusControl v-model="borderRadius" v-model:customValue="customBorderRadius" />
                        <SharedPaddingControl v-model="padding" v-model:customValue="customPadding" />
                    </div>
                    <!-- Preview -->
                    <div
                        class="w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600"
                        :style="{
                            borderRadius:
                                borderRadius === 'custom'
                                    ? customBorderRadius
                                    : borderRadius === 'none'
                                    ? '0px'
                                    : borderRadius === 'sm'
                                    ? '4px'
                                    : borderRadius === 'md'
                                    ? '8px'
                                    : borderRadius === 'lg'
                                    ? '12px'
                                    : borderRadius === 'xl'
                                    ? '16px'
                                    : borderRadius === 'full'
                                    ? '9999px'
                                    : '8px',
                            padding:
                                padding === 'custom'
                                    ? customPadding
                                    : padding === 'none'
                                    ? '0px'
                                    : padding === 'sm'
                                    ? '8px'
                                    : padding === 'md'
                                    ? '16px'
                                    : padding === 'lg'
                                    ? '24px'
                                    : padding === 'xl'
                                    ? '32px'
                                    : '16px',
                        }"
                    >
                        <div class="w-full h-full bg-blue-500/20" />
                    </div>
                </div>
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
