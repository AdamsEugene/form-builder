<script setup lang="ts">
import SurveyRating from '../shared/SurveyRating.vue';
import type { FeedbackTab as FBT, Placement } from '~/types';
import FeedbackTab from '../shared/FeedbackTab.vue';

const rating = ref<number>(0);
const deviceType = ref<'mobile' | 'desktop' | 'tablet'>('desktop');
const feedbackType = ref<FBT>('popover');
const isOpen = ref(true);

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

const handleRefresh = () => {
    // Handle refresh
    console.log('Refreshing preview...');
};

const handleNext = () => {
    console.log('Selected rating:', rating.value);
};
</script>

<template>
    <div class="p-4 relative h-[560px] w-full">
        <FeedbackTab
            v-model="isOpen"
            :placement="configs(feedbackType).placement"
            content-width="max-content"
            :device-type="deviceType"
            :feedback-type="feedbackType"
            @next="handleNext"
        >
            <SurveyRating
                v-model="rating"
                :device-type="deviceType"
                v-model:isOpen="isOpen"
                :feedback-type="feedbackType"
                :placement="configs(feedbackType).placement"
                question="Hoyou with our service?"
                leftLabel="Not satisfied"
                rightLabel="Very satisfied"
                :ratings="customRatings"
                nextButtonText="Submit"
                @next="handleNext"
                background-color=""
            />
        </FeedbackTab>
        <div
            v-show="feedbackType === 'fullScreen' && isOpen"
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 z-10"
        />
    </div>
</template>
