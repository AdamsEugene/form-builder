<script setup lang="ts">
import { getReactionSet } from '@/utils/reactionType';
import type { Question } from '~/types/survey';

const rating = ref<number>(0);
</script>

<template>
    <div class="p-0 px-4 mb-4">
        <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Browse Templates</h1>
        <div class="mt-6 flex flex-wrap gap-4 items-center justify-center">
            <SharedSurveyRating
                v-for="template in surveyTemplates"
                v-model="rating"
                :feedback-type="template.surveyData?.type"
                :question="template.surveyData?.questions[0] as Question"
                :ratings="
                    isReactionQuestion(template.surveyData?.questions?.[0])
                        ? getReactionSet(template.surveyData.questions[0].reactionType)
                        : []
                "
                nextButtonText="Submit"
                :backgroundColor="template.colors.backgroundColor"
                :questionColor="template.colors.questionColor"
                :labelColor="template.colors.labelColor"
                :emojiBackgroundColor="template.colors.emojiBackgroundColor"
                :emojiHoverColor="template.colors.emojiHoverColor"
                :emojiActiveColor="template.colors.emojiActiveColor"
                :nextButtonBgColor="template.colors.nextButtonBgColor"
                :nextButtonTextColor="template.colors.nextButtonTextColor"
            />
        </div>
    </div>
</template>
