<script setup lang="ts">
import { QuestionType, type ChoiceQuestion, type DropdownOption, type Question } from '~/types/survey';
import { ArrowRight } from 'lucide-vue-next';

// Refs
const questions = ref<Question[]>([INITIAL_QUESTIONS.reaction, INITIAL_QUESTIONS.thank_you]);
const questionsContainer = ref<HTMLElement | null>(null);
const lastAddedQuestion = ref<Element | ComponentPublicInstance | null>(null);

// Utility functions
const scrollToElement = (element: Element) => {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
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
    // Create a new question using the REACTION template as default
    const newQuestion = {
        ...INITIAL_QUESTIONS[QuestionType.REACTION],
        id: crypto.randomUUID(), // Ensure unique ID
    };

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

    const questionType = option.id as QuestionType;
    const template = INITIAL_QUESTIONS[questionType];

    if (!template) {
        console.error(`No template found for question type: ${questionType}`);
        return;
    }

    // Create new question from template with unique ID
    const newQuestion = {
        ...template,
        id: crypto.randomUUID(),
    };

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

watch(
    () => questions.value,
    (questions) => {
        console.log(questions);
    },
    { deep: true }
);
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
