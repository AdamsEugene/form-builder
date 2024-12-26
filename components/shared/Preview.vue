<script setup lang="ts">
import { ref, watch } from 'vue';
import SurveyRating from '@/components/shared/SurveyRating.vue';
import FeedbackTab from '@/components/shared/FeedbackTab.vue';
import type { FeedbackTab as FBT, Placement } from '~/types';
import { useGlobal } from '@/composables/useGlobal'; // Assuming this is the correct path

const { survey, activeQuestion } = useGlobal();

const rating = ref<number>(0);
const deviceType = ref<'mobile' | 'desktop' | 'tablet'>('desktop');
const feedbackType = ref<FBT>(survey.value?.type || 'popover');
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

const handleNext = () => {
    console.log('Selected rating:', rating.value);
};

watch(
    () => survey.value?.type,
    (newType) => {
        if (newType) feedbackType.value = newType;
    }
);
</script>

<template>
    <div class="p-4 relative h-[560px] w-full">
        <!-- FeedbackTab with higher z-index -->
        <FeedbackTab
            v-model="isOpen"
            :placement="configs(feedbackType).placement"
            content-width="max-content"
            :device-type="deviceType"
            :feedback-type="feedbackType"
            class="relative z-30"
            @next="handleNext"
        >
            <SurveyRating
                v-model="rating"
                :device-type="deviceType"
                v-model:isOpen="isOpen"
                :feedback-type="feedbackType"
                :placement="configs(feedbackType).placement"
                :question="activeQuestion"
                :ratings="customRatings"
                nextButtonText="Submit"
                @next="handleNext"
                background-color=""
            />
        </FeedbackTab>

        <!-- Overlay with lower z-index -->
        <div
            v-show="feedbackType === 'fullScreen' && isOpen"
            class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 z-20"
        />
    </div>
</template>
