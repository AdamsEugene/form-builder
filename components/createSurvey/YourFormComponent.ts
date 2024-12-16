import { defineComponent, ref } from 'vue';
import PopoverTypes from '~/components/shared/PopoverTypes.vue';
import BaseButton from '../ui/BaseButton.vue';
import SurveyPreview from '../shared/SurveyPreview.vue';
import SurveyRating from '../shared/SurveyRating.vue';
import FeedbackTab from '../shared/FeedbackTab.vue';
import type { FeedbackTab as FBT, Placement } from '~/types';

export default defineComponent({
    name: 'SurveyPopover',

    components: {
        PopoverTypes,
        BaseButton,
        SurveyPreview,
        SurveyRating,
        FeedbackTab,
    },

    data() {
        return {
            rating: 0,
            deviceType: 'desktop' as 'mobile' | 'desktop' | 'tablet',
            feedbackType: 'popover' as FBT,
            isOpen: true,
            customRatings: [
                { emoji: '😡', value: 1 },
                { emoji: '😕', value: 2 },
                { emoji: '😐', value: 3 },
                { emoji: '😊', value: 4 },
                { emoji: '🥰', value: 5 },
            ],
        };
    },

    methods: {
        configs(type: FBT): { placement: Placement } {
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
        },

        handleNext() {
            console.log('Selected rating:', this.rating);
        },
    },

    template: `
        <div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 w-full">
            <div class="flex flex-col gap-8">
            okay
                <PopoverTypes v-model:feedbackType="feedbackType" />
                <BaseButton size="md">Done</BaseButton>
            </div>
            <div>
                <SurveyPreview>
                    <div class="p-4 relative h-[calc(100%-18px)] w-full">
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
                                question="How satisfied are you with our service?"
                                leftLabel="Not satisfied"
                                rightLabel="Very satisfied"
                                :ratings="customRatings"
                                nextButtonText="Submit"
                                @next="handleNext"
                            />
                        </FeedbackTab>
                        <div
                            v-show="feedbackType === 'fullScreen' && isOpen"
                            class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 z-10"
                        />
                    </div>
                </SurveyPreview>
            </div>
        </div>
    `,
});
