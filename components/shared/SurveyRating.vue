<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { ChevronUp, ChevronDown, X } from 'lucide-vue-next';
import type { FeedbackTab, PopoverPlacement, SidePlacement } from '~/types';
import { QuestionType, type Question } from '~/types/survey';
import { type Reaction, isEmojiReaction, isIconReaction } from '@/utils/reactionType';

type DeviceType = 'mobile' | 'desktop' | 'tablet';

interface Props {
    // Content
    question: Question | null;
    nextButtonText?: string;

    // Rating configuration
    modelValue: number | null;
    ratings?: Reaction[];

    // Rest of the props remain the same
    placement?: SidePlacement | PopoverPlacement;
    isOpen?: boolean;
    deviceType?: DeviceType;
    backgroundColor?: string;
    questionColor?: string;
    labelColor?: string;
    emojiBackgroundColor?: string;
    emojiHoverColor?: string;
    emojiActiveColor?: string;
    nextButtonBgColor?: string;
    nextButtonTextColor?: string;
    maxWidth?: string;
    borderRadius?: string;
    padding?: string;
    gap?: string;
    showNextButton?: boolean;
    nextButtonDisabled?: boolean;
    feedbackType?: FeedbackTab;
}

const props = withDefaults(defineProps<Props>(), {
    // Default content
    question: () => INITIAL_QUESTIONS[QuestionType.REACTION],
    nextButtonText: 'Next',
    modelValue: null,

    // Default ratings now come from parent component
    ratings: () => [
        { emoji: '😠', value: 1 },
        { emoji: '☹️', value: 2 },
        { emoji: '😐', value: 3 },
        { emoji: '🙂', value: 4 },
        { emoji: '😍', value: 5 },
    ],

    // Rest of the defaults remain the same
    isOpen: true,
    deviceType: 'desktop',
    backgroundColor: 'white',
    questionColor: '#000000',
    labelColor: '#666666',
    emojiBackgroundColor: '#FFB800',
    emojiHoverColor: '#FFD700',
    emojiActiveColor: '#FFA500',
    nextButtonBgColor: '#F3F4F6',
    nextButtonTextColor: '#4B5563',
    maxWidth: '400px',
    borderRadius: '8px',
    padding: '24px',
    gap: '20px',
    showNextButton: true,
    nextButtonDisabled: false,
});

const emit = defineEmits<{
    'update:modelValue': [value: number];
    'update:isOpen': [value: boolean];
    next: [];
    click: [];
}>();

const textAnswer = ref('');
const value = ref(5);
// Computed styles based on device type and placement
const containerStyles = computed<CSSProperties>(() => {
    return {
        position: 'relative',
        width: props.deviceType === 'mobile' ? '100%' : 'auto',
        maxWidth: props.deviceType === 'mobile' ? '100%' : props.maxWidth,
        backgroundColor: props.backgroundColor,
        borderRadius: props.borderRadius,
        padding: !props.isOpen ? '8px 24px' : props.padding,
        boxShadow: '0px 0px 12px 1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        // transformOrigin,
    };
});

// Compute emoji container styles
const getEmojiContainerStyle = (value: number): CSSProperties => ({
    backgroundColor: props.modelValue === value ? props.emojiActiveColor : props.emojiBackgroundColor,
});

// Event handlers
const updateRating = (value: number) => {
    emit('update:modelValue', value);
};

const handleNext = () => {
    emit('next');
};

const handleClick = () => {
    emit('update:isOpen', !props.isOpen);
    emit('click');
};
</script>

<template>
    <div
        class="feedback-preview shadow-lg transition-all duration-300 ease-in-out"
        :style="[
            containerStyles,
            // { maxWidth: !isOpen ? '300px' : '100%' }
        ]"
    >
        <div class="w-[320px] flex gap-2 items-center mb-4 cursor-pointer" @click="handleClick">
            <h3 class="text-lg font-medium flex-1" :style="{ color: questionColor }">
                {{ question?.title }}
            </h3>
            <div v-if="feedbackType === 'fullScreen' || feedbackType === 'link'" class="flex items-center justify-end">
                <X />
            </div>
            <div
                v-if="feedbackType === 'popover' || feedbackType === 'embedded'"
                class="flex items-center justify-end absolute top-2 right-3 z-30"
            >
                <ChevronUp v-if="!isOpen" />
                <ChevronDown v-else />
            </div>
        </div>

        <!-- Rating Section -->
        <div class="space-y-6 truncate">
            <!-- Updated Emojis/Reactions section -->
            <div
                v-if="question?.type === QuestionType.REACTION"
                class="flex justify-between items-center"
                :style="{ gap }"
            >
                <div
                    v-for="rating in ratings"
                    :key="rating.value"
                    @click="updateRating(rating.value)"
                    class="cursor-pointer transition-all duration-200 hover:scale-110"
                >
                    <div
                        class="w-12 h-12 flex items-center justify-center rounded-2xl text-2xl transition-colors duration-200"
                        :class="{
                            'transform scale-110': modelValue === rating.value,
                        }"
                        :style="getEmojiContainerStyle(rating.value)"
                    >
                        <template v-if="isEmojiReaction(rating)">
                            {{ rating.emoji }}
                        </template>
                        <component v-else-if="isIconReaction(rating)" :is="rating.component" v-bind="rating.props" />
                    </div>
                </div>
            </div>

            <!-- LONG TEXT -->
            <div
                v-if="question?.type === QuestionType.LONG_TEXT"
                class="flex justify-between items-center"
                :style="{ gap }"
            >
                <UiFormTextarea
                    v-model="textAnswer"
                    placeholder="Enter your description"
                    class="w-full"
                    autogrow
                    required
                />
            </div>

            <!-- LONG TEXT -->
            <div
                v-if="question?.type === QuestionType.SHORT_TEXT || question?.type === QuestionType.EMAIL"
                class="flex justify-between items-center"
                :style="{ gap }"
            >
                <div class="w-full">
                    <UiFormInput v-model="textAnswer" placeholder="Enter your description" class="w-full" required />
                </div>
            </div>

            <!-- YES OR NO -->
            <div
                v-if="question?.type === QuestionType.YES_NO"
                class="flex justify-between items-center"
                :style="{ gap }"
            >
                <div class="w-full flex items-center justify-around">
                    <UiBaseButton variant="secondary">YES</UiBaseButton>
                    <UiBaseButton variant="secondary">NO</UiBaseButton>
                </div>
            </div>

            <!-- RADIO -->
            <div
                v-if="question?.type === QuestionType.RADIO"
                class="flex flex-col justify-between items-center"
                :style="{ gap }"
            >
                <div v-for="answer in question.options" class="flex items-center gap-2 w-full">
                    <UiBasePillRadio
                        v-model="answer.id"
                        name="options"
                        :value="answer.id"
                        :label="answer.text"
                        class="w-full"
                    />
                </div>
            </div>

            <!-- CHECKBOX -->
            <div
                v-if="question?.type === QuestionType.CHECKBOX"
                class="flex flex-col justify-between items-center"
                :style="{ gap }"
            >
                <div v-for="answer in question.options" class="flex items-center gap-2 w-full">
                    <UiBasePillCheckbox v-model="answer.isSelected" :label="answer.text" class="w-full" />
                </div>
            </div>

            <!-- RATING 1-5 -->
            <div
                v-if="question?.type === QuestionType.RATING_5 || question?.type === QuestionType.RATING_7"
                class="flex justify-between items-center"
                :style="{ gap }"
            >
                <div class="w-full flex items-center justify-around">
                    <UiBaseButton
                        v-for="i in question?.type === QuestionType.RATING_5 ? 5 : 7"
                        :key="i"
                        variant="secondary"
                        >{{ i }}</UiBaseButton
                    >
                </div>
            </div>

            <!-- RATING 1-5 -->
            <div v-if="question?.type === QuestionType.NPS" class="flex justify-between items-center" :style="{ gap }">
                <div class="w-full flex items-center justify-around">
                    <UiRangeSlider
                        v-model="value"
                        :min="0"
                        :max="10"
                        :step="1"
                        track-color="#ef4444"
                        thumb-color="#ffffff"
                        show-labels
                    />
                </div>
            </div>

            <!-- Labels -->
            <div
                v-if="
                    question?.type === QuestionType.REACTION ||
                    question?.type === QuestionType.RATING_5 ||
                    question?.type === QuestionType.RATING_7 ||
                    question?.type === QuestionType.NPS
                "
                class="flex justify-between text-sm"
                :style="{ color: labelColor }"
            >
                <span>{{ question?.highScoreLabel }}</span>
                <span>{{ question?.lowScoreLabel }}</span>
            </div>

            <!-- Next Button -->
            <div v-if="showNextButton" class="flex items-center gap-6 justify-end">
                <UiBaseButton v-if="!question?.required && question?.type !== QuestionType.THANK_YOU" variant="ghost">
                    Skip
                </UiBaseButton>

                <UiBaseButton
                    :disabled="nextButtonDisabled || !modelValue"
                    :style="{
                        backgroundColor: nextButtonBgColor,
                        color: nextButtonTextColor,
                    }"
                    @click="handleNext"
                >
                    {{ nextButtonText }}</UiBaseButton
                >
                <!-- IS REQUIRED -->
            </div>
        </div>
    </div>
</template>
