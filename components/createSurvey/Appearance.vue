// components/settings/ColorSettings.vue
<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import { ArrowRight } from 'lucide-vue-next';
import { surveyColors } from '~/constants/colors';
import type { BorderRadius, Padding, Placement } from '~/types';
import { placementConfigs } from '~/constants/placement';
import { QuestionType } from '~/types/survey';

const { colors, setColors, survey, position, setPosition, activeQuestion, updateCurrentIndex } = useGlobal();

// Initialize with refs
const backgroundColor = ref('');
const questionColor = ref('');
const labelColor = ref('');
const emojiBackgroundColor = ref('');
const emojiHoverColor = ref('');
const emojiActiveColor = ref('');
const nextButtonBgColor = ref('');
const nextButtonTextColor = ref('');

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

    if (position.value) {
        borderRadius.value = getBorderRadiusPreset(position.value.borderRadius);
        customBorderRadius.value = position.value.borderRadius;
        padding.value = getPaddingPreset(position.value.padding);
        customPadding.value = position.value.padding;
    }
});

// Helper functions to determine presets
function getBorderRadiusPreset(value: string): BorderRadius {
    switch (value) {
        case '0px':
            return 'none';
        case '4px':
            return 'sm';
        case '8px':
            return 'md';
        case '12px':
            return 'lg';
        case '16px':
            return 'xl';
        case '9999px':
            return 'full';
        default:
            return 'custom';
    }
}

function getPaddingPreset(value: string): Padding {
    switch (value) {
        case '0px':
            return 'none';
        case '8px':
            return 'sm';
        case '16px':
            return 'md';
        case '24px':
            return 'lg';
        case '32px':
            return 'xl';
        default:
            return 'custom';
    }
}

// Computed for current placement configuration
const currentPlacementConfig = computed(() => {
    return placementConfigs(survey.value?.type ?? 'popover');
});

// Handle placement changes
const handlePlacementChange = (newPlacement: Placement) => {
    setPosition({
        placement: newPlacement,
        borderRadius: previewBorderRadius.value,
        padding: previewPadding.value,
    });
};

// Watch for border radius changes
watch([borderRadius, customBorderRadius], () => {
    setPosition({
        borderRadius: previewBorderRadius.value,
        placement: position.value.placement,
        padding: position.value.padding,
    });
});

// Watch for padding changes
watch([padding, customPadding], () => {
    setPosition({
        padding: previewPadding.value,
        placement: position.value.placement,
        borderRadius: position.value.borderRadius,
    });
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
</script>

<template>
    <div class="flex flex-col gap-8">
        <div
            class="bg-white w-full dark:bg-gray-800 flex flex-col gap-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-shadow"
        >
            <div class="flex flex-col gap-8">
                <div class="grid grid-cols-2 gap-1 bg-gray-50 p-1 rounded-2xl">
                    <div class="bg-white shadow-sm p-1 rounded-2xl">
                        <UiColorPicker
                            v-model="backgroundColor"
                            :predefinedColors="surveyColors.backgroundColor"
                            label="Background color"
                        />
                    </div>
                    <div class="bg-white shadow-sm p-1 rounded-2xl">
                        <UiColorPicker
                            v-model="questionColor"
                            :predefinedColors="surveyColors.questionColor"
                            label="Question color"
                        />
                    </div>
                    <div
                        v-if="activeQuestion?.type !== QuestionType.THANK_YOU"
                        class="bg-white shadow-sm p-1 rounded-2xl"
                    >
                        <UiColorPicker
                            v-model="labelColor"
                            :predefinedColors="surveyColors.labelColor"
                            label="Label color"
                        />
                    </div>
                    <div
                        v-if="activeQuestion?.type === QuestionType.REACTION"
                        class="bg-white shadow-sm p-1 rounded-2xl"
                    >
                        <UiColorPicker
                            v-model="emojiBackgroundColor"
                            :predefinedColors="surveyColors.emojiBackgroundColor"
                            label="Emoji background color"
                        />
                    </div>
                    <div
                        v-if="activeQuestion?.type === QuestionType.REACTION"
                        class="bg-white shadow-sm p-1 rounded-2xl"
                    >
                        <UiColorPicker
                            v-model="emojiHoverColor"
                            :predefinedColors="surveyColors.emojiHoverColor"
                            label="Emoji hover color"
                        />
                    </div>
                    <div
                        v-if="activeQuestion?.type === QuestionType.REACTION"
                        class="bg-white shadow-sm p-1 rounded-2xl"
                    >
                        <UiColorPicker
                            v-model="emojiActiveColor"
                            :predefinedColors="surveyColors.emojiActiveColor"
                            label="Emoji active color"
                        />
                    </div>
                    <div class="bg-white shadow-sm p-1 rounded-2xl">
                        <UiColorPicker
                            v-model="nextButtonBgColor"
                            :predefinedColors="surveyColors.nextButtonBgColor"
                            label="Next button background color"
                        />
                    </div>
                    <div class="bg-white shadow-sm p-1 rounded-2xl">
                        <UiColorPicker
                            v-model="nextButtonTextColor"
                            :predefinedColors="surveyColors.nextButtonTextColor"
                            label="Next button text color"
                        />
                    </div>
                </div>
                <SharedPositionSelector
                    :modelValue="position.placement"
                    :available-placements="currentPlacementConfig.availablePlacements"
                    @update:modelValue="handlePlacementChange"
                />

                <div class="flex flex-col gap-8">
                    <div class="grid grid-cols-2 gap-8">
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
            <UiBaseButton size="md" class="flex items-center gap-2" @click="updateCurrentIndex(4)">
                Next
                <ArrowRight class="w-4 h-4" />
            </UiBaseButton>
        </div>
    </div>
</template>
