<script setup lang="ts">
import type { FeedbackTab as FBT, Placement } from '~/types';
import Preview from '../shared/Preview.vue';
import Popover from './Popover.vue';

const rating = ref<number>(0);
const deviceType = ref<'mobile' | 'desktop' | 'tablet'>('desktop');
const feedbackType = ref<FBT>('popover');
const isOpen = ref(true);
const shouldRefresh = ref(false);

const customRatings = [
    { emoji: '😡', value: 1 },
    { emoji: '😕', value: 2 },
    { emoji: '😐', value: 3 },
    { emoji: '😊', value: 4 },
    { emoji: '🥰', value: 5 },
];

const configs = (type: FBT): { placement: Placement } => {
    switch (type) {
        case 'popover':
            return { placement: 'bottom-right' };
        case 'button':
            return { placement: 'right' };
        case 'bubble':
            return { placement: 'bottom-right' };
        case 'embedded':
            return { placement: 'bottom-right' };
        case 'fullScreen':
            return { placement: 'center' };
        case 'link':
            return { placement: 'center' };
    }
};

const handleNext = () => {
    console.log('Selected rating:', rating.value);
};

const handleRefresh = () => {
    shouldRefresh.value = true;
    // Reset the refresh flag after a brief delay
    setTimeout(() => {
        shouldRefresh.value = false;
    }, 100);
};
</script>

<template>
    <div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 w-full">
        <div class="flex flex-col gap-8">
            <UiBaseButton size="md">Done</UiBaseButton>
            <!-- <Preview /> -->
        </div>
        <div class="flex flex-col gap-8">
            <SharedSurveyPreview v-model:deviceType="deviceType" @refresh="handleRefresh">
                <SharedIframePreview :component="Preview" :refresh="shouldRefresh" />
            </SharedSurveyPreview>
        </div>
    </div>
</template>
