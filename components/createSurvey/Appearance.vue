// components/settings/ColorSettings.vue
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { ArrowRight } from 'lucide-vue-next';
import { surveyColors } from '~/constants/colors';
import type { BorderRadius, Padding, Placement } from '~/types';

const { colors, setColors } = useGlobal();

const sidePlacements: Placement[] = ['left', 'right'];

// Initialize with refs
const backgroundColor = ref('');
const questionColor = ref('');
const labelColor = ref('');
const emojiBackgroundColor = ref('');
const emojiHoverColor = ref('');
const emojiActiveColor = ref('');
const nextButtonBgColor = ref('');
const nextButtonTextColor = ref('');

const position = ref<'left' | 'right'>('right');
const borderRadius = ref<BorderRadius>('md');
const customBorderRadius = ref('8px');
const padding = ref<Padding>('md');
const customPadding = ref('16px');

// Initialize local refs with values from global store
onMounted(() => {
    backgroundColor.value = colors.value.backgroundColor;
    questionColor.value = colors.value.questionColor;
    labelColor.value = colors.value.labelColor;
    emojiBackgroundColor.value = colors.value.emojiBackgroundColor;
    emojiHoverColor.value = colors.value.emojiHoverColor;
    emojiActiveColor.value = colors.value.emojiActiveColor;
    nextButtonBgColor.value = colors.value.nextButtonBgColor;
    nextButtonTextColor.value = colors.value.nextButtonTextColor;
});

// Watch for changes in individual color refs
watch(backgroundColor, (newValue) => {
    if (newValue) setColors({ backgroundColor: newValue });
});

watch(questionColor, (newValue) => {
    if (newValue) setColors({ questionColor: newValue });
});

watch(labelColor, (newValue) => {
    if (newValue) setColors({ labelColor: newValue });
});

watch(emojiBackgroundColor, (newValue) => {
    if (newValue) setColors({ emojiBackgroundColor: newValue });
});

watch(emojiHoverColor, (newValue) => {
    if (newValue) setColors({ emojiHoverColor: newValue });
});

watch(emojiActiveColor, (newValue) => {
    if (newValue) setColors({ emojiActiveColor: newValue });
});

watch(nextButtonBgColor, (newValue) => {
    if (newValue) setColors({ nextButtonBgColor: newValue });
});

watch(nextButtonTextColor, (newValue) => {
    if (newValue) setColors({ nextButtonTextColor: newValue });
});

// Watch for changes in the global store
watch(
    () => colors.value,
    (newColors) => {
        backgroundColor.value = newColors.backgroundColor;
        questionColor.value = newColors.questionColor;
        labelColor.value = newColors.labelColor;
        emojiBackgroundColor.value = newColors.emojiBackgroundColor;
        emojiHoverColor.value = newColors.emojiHoverColor;
        emojiActiveColor.value = newColors.emojiActiveColor;
        nextButtonBgColor.value = newColors.nextButtonBgColor;
        nextButtonTextColor.value = newColors.nextButtonTextColor;
    },
    { deep: true }
);

// Preview styles computed
const previewBorderRadius = computed(() => {
    switch (borderRadius.value) {
        case 'custom':
            return customBorderRadius.value;
        case 'none':
            return '0px';
        case 'sm':
            return '4px';
        case 'md':
            return '8px';
        case 'lg':
            return '12px';
        case 'xl':
            return '16px';
        case 'full':
            return '9999px';
        default:
            return '8px';
    }
});

const previewPadding = computed(() => {
    switch (padding.value) {
        case 'custom':
            return customPadding.value;
        case 'none':
            return '0px';
        case 'sm':
            return '8px';
        case 'md':
            return '16px';
        case 'lg':
            return '24px';
        case 'xl':
            return '32px';
        default:
            return '16px';
    }
});

const handleNext = () => {
    // Add your navigation logic here
};
</script>

<template>
    <div class="flex flex-col gap-8">
        <div
            class="bg-white w-full dark:bg-gray-800 flex flex-col gap-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
        >
            <div class="flex flex-col gap-8">
                <UiColorPicker
                    v-model="backgroundColor"
                    :predefinedColors="surveyColors.backgroundColor"
                    label="Background color"
                />
                <UiColorPicker
                    v-model="questionColor"
                    :predefinedColors="surveyColors.questionColor"
                    label="Question color"
                />
                <UiColorPicker v-model="labelColor" :predefinedColors="surveyColors.labelColor" label="Label color" />
                <UiColorPicker
                    v-model="emojiBackgroundColor"
                    :predefinedColors="surveyColors.emojiBackgroundColor"
                    label="Emoji background color"
                />
                <UiColorPicker
                    v-model="emojiHoverColor"
                    :predefinedColors="surveyColors.emojiHoverColor"
                    label="Emoji hover color"
                />
                <UiColorPicker
                    v-model="emojiActiveColor"
                    :predefinedColors="surveyColors.emojiActiveColor"
                    label="Emoji active color"
                />
                <UiColorPicker
                    v-model="nextButtonBgColor"
                    :predefinedColors="surveyColors.nextButtonBgColor"
                    label="Next button background color"
                />
                <UiColorPicker
                    v-model="nextButtonTextColor"
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
                            borderRadius: previewBorderRadius,
                            padding: previewPadding,
                            backgroundColor: backgroundColor,
                        }"
                    >
                        <div class="w-full h-full" :style="{ backgroundColor: questionColor }" />
                    </div>
                </div>
            </div>
        </div>

        <div class="flex justify-end w-full">
            <UiBaseButton size="md" class="flex items-center gap-2" @click="handleNext">
                Next
                <ArrowRight class="w-4 h-4" />
            </UiBaseButton>
        </div>
    </div>
</template>
