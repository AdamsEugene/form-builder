<script setup lang="ts">
const selectedOption = ref<string | number | null>(null);

import { QuestionType, questionTypes, ReactionType, type Question } from '~/types/survey';
import { Plus, BrainCog, ArrowRight } from 'lucide-vue-next';

const INITIAL_QUESTION: Question = {
    id: crypto.randomUUID(),
    type: QuestionType.REACTION,
    title: 'asa',
    required: false,
    reactionType: ReactionType.SMILEYS,
    logic: {
        nextQuestion: 'Thank you message',
    },
    highScoreLabel: 'Very satisfied',
    lowScoreLabel: 'Not satisfied',
    image: { height: 20, width: 20, url: '' },
};

const questions = ref<Question[]>([INITIAL_QUESTION]);
const questionsContainer = ref<HTMLElement | null>(null);
const lastAddedQuestion = ref<Element | ComponentPublicInstance | null>(null);

const addQuestion = () => {
    const newQuestion = {
        ...INITIAL_QUESTION,
        id: crypto.randomUUID(),
    };
    questions.value.push(newQuestion);

    // Wait for DOM to update
    nextTick(() => {
        // Get the last question element
        const elements = document.querySelectorAll('[data-question]');
        const lastElement = elements[elements.length - 1];
        if (lastElement) {
            lastElement.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    });
};

const deleteQuestion = (index: number) => {
    questions.value.splice(index, 1);
};

const handleChange = (option: any) => {
    console.log('Selected option:', option);
};
</script>

<template>
    <div class="flex flex-col gap-8">
        <div class="grid grid-cols-3 gap-4 w-full">
            <UiBaseButton @click="addQuestion" class="gap-2">
                <Plus class="w-6 h-6" />
                Add question
                <BrainCog class="w-6 h-6" />
            </UiBaseButton>
            <UiBaseDropdown
                v-model="selectedOption"
                :options="questionTypes"
                placeholder="Select a question type"
                :searchable="true"
                @change="handleChange"
                class="col-span-2"
            />
        </div>

        <TransitionGroup ref="questionsContainer" name="questions" tag="div" class="flex flex-col gap-4">
            <div
                v-for="(question, index) in questions"
                :key="question.id"
                class="transform transition-all duration-300"
                :ref="index === questions.length - 1 ? (el) => (lastAddedQuestion = el) : undefined"
            >
                <SharedSurveyQuestion v-model="questions[index]" :index="index" @delete="deleteQuestion(index)" />
            </div>
        </TransitionGroup>

        <div class="flex gap-2">
            <UiBaseButton @click="addQuestion" class="gap-2">
                <Plus class="w-6 h-6" />
                Add question
                <BrainCog class="w-6 h-6" />
            </UiBaseButton>
            <UiBaseButton variant="outline">
                <div class="flex items-center gap-1">More options</div>
            </UiBaseButton>
        </div>

        <UiBaseButton size="md">Next <ArrowRight /></UiBaseButton>
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
