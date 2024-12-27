// components/SurveyPreview.vue
<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import SurveyRating from '@/components/shared/SurveyRating.vue';
import FeedbackTab from '@/components/shared/FeedbackTab.vue';
import type { FeedbackTab as FBT } from '~/types';
import { useGlobal } from '@/composables/useGlobal';
import type { ReactionQuestion } from '~/types/survey';
import { getReactionSet } from '@/utils/reactionType';
import { ReactionType } from '~/types/survey';

const { survey, activeQuestion, colors, position } = useGlobal();

const rating = ref<number>(0);
const deviceType = ref<'mobile' | 'desktop' | 'tablet'>('desktop');
const feedbackType = ref<FBT>(survey.value?.type || 'popover');
const isOpen = ref(true);

// Get the reaction type from the active question and compute the ratings
const reactionType = computed(() => {
    if (activeQuestion.value && 'reactionType' in activeQuestion.value) {
        return (activeQuestion.value as ReactionQuestion).reactionType;
    }
    return ReactionType.SMILEYS; // default fallback
});

// Get the appropriate reaction set based on the type
const ratings = computed(() => getReactionSet(reactionType.value));

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
            :placement="position.placement"
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
                :placement="position.placement"
                :question="activeQuestion"
                :ratings="ratings"
                nextButtonText="Submit"
                :backgroundColor="colors.backgroundColor"
                :questionColor="colors.questionColor"
                :labelColor="colors.labelColor"
                :emojiBackgroundColor="colors.emojiBackgroundColor"
                :emojiHoverColor="colors.emojiHoverColor"
                :emojiActiveColor="colors.emojiActiveColor"
                :nextButtonBgColor="colors.nextButtonBgColor"
                :nextButtonTextColor="colors.nextButtonTextColor"
                :padding="position.padding"
                :border-radius="position.borderRadius"
                @next="handleNext"
            />
        </FeedbackTab>

        <!-- Overlay with lower z-index -->
        <div
            v-show="feedbackType === 'fullScreen' && isOpen"
            class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 z-20"
        />
    </div>
</template>
