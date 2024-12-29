<script setup lang="ts">
import { QuestionType, type ChoiceQuestion, type DropdownOption, type Question } from '~/types/survey';
import { ArrowRight } from 'lucide-vue-next';

const { survey, setSurvey, setActiveQuestion, activeQuestion, updateCurrentIndex } = useGlobal();

// Refs
const questions = ref<Question[]>(
    survey.value?.questions
        ? addQuestionNumbers(survey.value?.questions)
        : addQuestionNumbers([INITIAL_QUESTIONS.reaction, INITIAL_QUESTIONS.thank_you])
);
const questionsContainer = ref<HTMLElement | null>(null);
const lastAddedQuestion = ref<Element | ComponentPublicInstance | null>(null);

// Function to add/update question numbers
function addQuestionNumbers(questions: Question[]): Question[] {
    return questions.map((question, index) => ({
        ...question,
        questionNo: index + 1,

        // questionNo: question.type !== QuestionType.THANK_YOU ? index + 1 : undefined,
    }));
}

// Function to update all question numbers
function updateQuestionNumbers() {
    questions.value = questions.value.map((question, index) => ({
        ...question,
        questionNo: index + 1,

        // questionNo: question.type !== QuestionType.THANK_YOU ? index + 1 : undefined,
    }));
}

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
            .map((q) => ({
                id: q.id,
                label: `Question ${q.questionNo}: ${q.title}`,
            }));

        return [...otherQuestions, { id: 'next', label: 'Next question' }];
    };

    questionsExceptThankYou.forEach((question) => {
        const newOptions = getQuestionOptions(question.id);

        if (!question.logic || JSON.stringify(question.logic.options) !== JSON.stringify(newOptions)) {
            question.logic = {
                nextQuestion: question.logic?.nextQuestion || 'Next question',
                options: newOptions,
            };
        }
    });
};

// Question management
const addQuestion = () => {
    const newQuestion = JSON.parse(
        JSON.stringify({
            ...INITIAL_QUESTIONS[QuestionType.REACTION],
            id: crypto.randomUUID(),
            type: QuestionType.REACTION,
        })
    );

    const insertIndex = Math.max(0, questions.value.length - 1);
    questions.value.splice(insertIndex, 0, newQuestion);
    updateQuestionNumbers();
    updateLogicOptions();

    nextTick(() => {
        const elements = document.querySelectorAll('[data-question]');
        const lastElement = elements[elements.length - 1];
        if (lastElement) scrollToElement(lastElement);
    });
};

const deleteQuestion = (index: number) => {
    questions.value.splice(index, 1);
    updateQuestionNumbers();
    updateLogicOptions();
};

// Answer management for choice questions
const addAnswer = (questionId: string) => {
    const question = questions.value.find((q) => q.id === questionId) as ChoiceQuestion | null;
    if (!question) return;

    const newOption = { id: crypto.randomUUID(), text: '', withStatement: false, statement: '' };
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

    const newQuestion = {
        ...template,
        id: crypto.randomUUID(),
    };

    const isLastQuestion = index === questions.value.length - 1;
    const insertIndex = isLastQuestion ? index : index + 1;
    questions.value.splice(insertIndex, 0, newQuestion);
    updateQuestionNumbers();
    updateLogicOptions();

    nextTick(() => {
        const elements = document.querySelectorAll('[data-question]');
        const targetElement = elements[insertIndex];
        if (targetElement) scrollToElement(targetElement);
    });
};

// Replace handlers
const handleReplace = (option: DropdownOption | null, index: number) => {
    if (!option) return;

    const questionType = option.id as QuestionType;
    const template = INITIAL_QUESTIONS[questionType];

    if (!template) {
        console.error(`No template found for question type: ${questionType}`);
        return;
    }

    const existingId = questions.value[index].id;

    questions.value[index] = JSON.parse(
        JSON.stringify({
            ...template,
            id: existingId,
            type: questionType,
            questionNo: questions.value[index].questionNo,
        })
    );

    updateLogicOptions();
};

// Lifecycle hooks
onMounted(() => {
    updateQuestionNumbers();
    updateLogicOptions();
});

watch(
    () => questions.value,
    (questions) => {
        if (questions) {
            const rawQuestions = JSON.parse(JSON.stringify(toRaw(questions))) as Question[];
            setSurvey({ questions: rawQuestions });

            const updatedActiveQuestion = rawQuestions.find((q) => q.id === activeQuestion?.value?.id);
            if (updatedActiveQuestion) {
                setActiveQuestion(updatedActiveQuestion);
            }
        }
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
                    data-question
                    v-model="questions[index]"
                    :index="index"
                    :no-delete="questions.length === 2"
                    @delete="deleteQuestion(index)"
                    @add-question="addQuestion"
                    @change="(type) => handleChange(type, index)"
                    @replace="(type) => handleReplace(type, index)"
                    @add-answer="addAnswer"
                    @delete-answer="deleteAnswer"
                />
            </div>
        </TransitionGroup>

        <UiBaseButton size="md" class="w-max self-end mb-4" @click="updateCurrentIndex(3)">
            Next <ArrowRight />
        </UiBaseButton>
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
