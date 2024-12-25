<script setup lang="ts">
import { QuestionType, questionTypes, ReactionType, type DropdownOption, type Question } from '~/types/survey';
import { ArrowRight } from 'lucide-vue-next';

const INITIAL_QUESTION: Question[] = [
    {
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
    },
    {
        id: crypto.randomUUID(),
        type: QuestionType.THANK_YOU,
        title: 'How would you rate your experience?',
        required: false,
        logic: {
            nextQuestion: 'Thank you message',
            options: [{ id: '1', label: 'Next question' }],
        },
    },
];

const questions = ref<Question[]>([...INITIAL_QUESTION]);
const questionsContainer = ref<HTMLElement | null>(null);
const lastAddedQuestion = ref<Element | ComponentPublicInstance | null>(null);

const addQuestion = () => {
    const newQuestion = {
        ...INITIAL_QUESTION[0],
        id: crypto.randomUUID(),
    };

    // Insert the new question before the last question (Thank you message)
    const insertIndex = Math.max(0, questions.value.length - 1);
    questions.value.splice(insertIndex, 0, newQuestion);

    // Wait for DOM to update
    nextTick(() => {
        // Get the last question element
        const elements = document.querySelectorAll('[data-question]');
        const lastElement = elements[elements.length - 1];
        if (lastElement) {
            lastElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
};
const deleteQuestion = (index: number) => {
    questions.value.splice(index, 1);
};

const handleChange = (option: DropdownOption | null) => {
    if (!option) return;
    // console.log('Selected option:', option);
};
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
                    @change="handleChange"
                    data-question
                />
            </div>
        </TransitionGroup>

        <UiBaseButton size="md" class="w-max self-end">Next <ArrowRight /></UiBaseButton>
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
