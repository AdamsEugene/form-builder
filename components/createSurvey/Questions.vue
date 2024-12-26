<script setup lang="ts">
import {
    QuestionType,
    questionTypes,
    ReactionType,
    type ChoiceQuestion,
    type DropdownOption,
    type Question,
} from '~/types/survey';
import { ArrowRight } from 'lucide-vue-next';

// Constants and initial state
const INITIAL_REACTION_QUESTION: Question = {
    id: crypto.randomUUID(),
    type: QuestionType.REACTION,
    title: 'How would you rate your experience?',
    required: false,
    reactionType: ReactionType.SMILEYS,
    logic: {
        nextQuestion: 'Thank you message',
        options: [{ id: '1', label: 'Next question' }],
    },
    highScoreLabel: 'Very satisfied',
    lowScoreLabel: 'Not satisfied',
    image: { height: 20, width: 20, url: '' },
};

const THANK_YOU_QUESTION: Question = {
    id: crypto.randomUUID(),
    type: QuestionType.THANK_YOU,
    title: 'How would you rate your experience?',
    required: false,
    logic: {
        nextQuestion: 'Thank you message',
        options: [{ id: '1', label: 'Next question' }],
    },
};

// Refs
const questions = ref<Question[]>([INITIAL_REACTION_QUESTION, THANK_YOU_QUESTION]);
const questionsContainer = ref<HTMLElement | null>(null);
const lastAddedQuestion = ref<Element | ComponentPublicInstance | null>(null);

// Utility functions
const scrollToElement = (element: Element) => {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
};

const createQuestionWithType = (type: any): Question => {
    return {
        ...INITIAL_REACTION_QUESTION,
        id: crypto.randomUUID(),
        type,
        title: '',
        reactionType: ReactionType.SMILEYS,
        highScoreLabel: 'Very satisfied',
        lowScoreLabel: 'Not satisfied',
    };
};

// Logic options management
const updateLogicOptions = () => {
    const questionsExceptThankYou = questions.value.filter((q) => q.type !== QuestionType.THANK_YOU);

    const getQuestionOptions = (questionId: string) => {
        const otherQuestions = questionsExceptThankYou
            .filter((q) => q.id !== questionId)
            .map((q, idx) => ({
                id: q.id,
                label: `Question ${idx + 1}: ${q.title}`,
            }));

        return [...otherQuestions, { id: 'next', label: 'Next question' }];
    };

    questionsExceptThankYou.forEach((question) => {
        const newOptions = getQuestionOptions(question.id);

        if (!question.logic || JSON.stringify(question.logic.options) !== JSON.stringify(newOptions)) {
            question.logic = {
                nextQuestion: question.logic?.nextQuestion || 'next',
                options: newOptions,
            };
        }
    });
};

// Question management
const addQuestion = () => {
    const newQuestion = createQuestionWithType(QuestionType.REACTION);
    const insertIndex = Math.max(0, questions.value.length - 1);

    questions.value.splice(insertIndex, 0, newQuestion);
    updateLogicOptions();

    nextTick(() => {
        const elements = document.querySelectorAll('[data-question]');
        const lastElement = elements[elements.length - 1];
        if (lastElement) scrollToElement(lastElement);
    });
};

const deleteQuestion = (index: number) => {
    questions.value.splice(index, 1);
    updateLogicOptions();
};

// Answer management for choice questions
const addAnswer = (questionId: string) => {
    const question = questions.value.find((q) => q.id === questionId) as ChoiceQuestion | null;
    if (!question) return;

    const newOption = { id: crypto.randomUUID(), text: '' };
    question.options = [...(question.options || []), newOption];
};

const deleteAnswer = (questionId: string, answerId: string) => {
    const question = questions.value.find((q) => q.id === questionId) as ChoiceQuestion | null;
    if (!question?.options) return;

    question.options = question.options.filter((answer) => answer.id !== answerId);
};

// Change handlers
const handleChange = (option: DropdownOption | null, index: number) => {
    if (!option) return;

    const newQuestion = createQuestionWithType(option.id as QuestionType);
    const insertIndex = Math.max(0, questions.value.length - 1);

    questions.value.splice(insertIndex, 0, newQuestion);
    updateLogicOptions();

    nextTick(() => {
        const elements = document.querySelectorAll('[data-question]');
        const lastElement = elements[elements.length - 1];
        if (lastElement) scrollToElement(lastElement);
    });
};

// Lifecycle hooks
onMounted(() => {
    updateLogicOptions();
});
</script>

<template>
    <div class="flex flex-col gap-8">
        <TransitionGroup ref="questionsContainer" name="questions" tag="div" class="flex flex-col gap-4">
            <div
                v-for="(question, index) in questions"
                :key="question.id"
                class="transition-all duration-300"
                :ref="index === questions.length - 1 ? (el) => (lastAddedQuestion = el) : undefined"
            >
                <SharedSurveyQuestion
                    v-model="questions[index]"
                    :index="index"
                    @delete="deleteQuestion(index)"
                    @add-question="addQuestion"
                    @change="(type) => handleChange(type, index)"
                    @add-answer="addAnswer"
                    @delete-answer="deleteAnswer"
                    data-question
                />
            </div>
        </TransitionGroup>

        <UiBaseButton size="md" class="w-max self-end mb-4"> Next <ArrowRight /> </UiBaseButton>
    </div>
</template>

<style scoped>
.questions-move,
.questions-enter-active,
.questions-leave-active {
    transition: all 0.3s ease;
}

.questions-enter-from {
    opacity: 0;
    transform: translateY(30px);
}

.questions-leave-to {
    opacity: 0;
    transform: translateY(-30px);
}

.questions-leave-active {
    position: absolute;
}
</style>
