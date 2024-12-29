import { QuestionType, ReactionType, type Question } from '~/types/survey';

const INITIAL_REACTION_QUESTION: Question = {
    questionNo: undefined,
    id: crypto.randomUUID(),
    type: QuestionType.REACTION,
    title: 'How would you rate your experience?',
    required: false,
    reactionType: ReactionType.SMILEYS,
    logic: {
        nextQuestion: null,
        options: [{ id: '1', label: 'Next question' }],
    },
    highScoreLabel: 'Very satisfied',
    lowScoreLabel: 'Not satisfied',
    image: { height: 20, width: 20, url: '' },
};

const THANK_YOU_QUESTION: Question = {
    questionNo: undefined,
    id: crypto.randomUUID(),
    type: QuestionType.THANK_YOU,
    title: 'How would you rate your experience?',
    required: false,
    logic: {
        nextQuestion: null,
        options: [{ id: '1', label: 'Next question' }],
    },
};

const INITIAL_SHORT_TEXT_QUESTION: Question = {
    questionNo: undefined,
    id: crypto.randomUUID(),
    type: QuestionType.SHORT_TEXT,
    title: 'Please provide a brief response',
    required: false,
    placeholder: 'Enter your answer here',
    logic: {
        nextQuestion: null,
        options: [{ id: '1', label: 'Next question' }],
    },
};

const INITIAL_LONG_TEXT_QUESTION: Question = {
    questionNo: undefined,
    id: crypto.randomUUID(),
    type: QuestionType.LONG_TEXT,
    title: 'Please provide your detailed feedback',
    required: false,
    placeholder: 'Enter your detailed response here',
    logic: {
        nextQuestion: null,
        options: [{ id: '1', label: 'Next question' }],
    },
};

const INITIAL_EMAIL_QUESTION: Question = {
    questionNo: undefined,
    id: crypto.randomUUID(),
    type: QuestionType.EMAIL,
    title: 'What is your email address?',
    required: false,
    placeholder: 'example@email.com',
    logic: {
        nextQuestion: null,
        options: [{ id: '1', label: 'Next question' }],
    },
};

const INITIAL_YES_NO_QUESTION: Question = {
    questionNo: undefined,
    id: crypto.randomUUID(),
    type: QuestionType.YES_NO,
    title: 'Would you recommend our service?',
    required: false,
    randomized: false,
    options: [
        {
            id: 'yes',
            text: 'Yes',
            withStatement: false,
            statement: '',
        },
        {
            id: 'no',
            text: 'No',
            withStatement: false,
            statement: '',
        },
    ],
    logic: {
        nextQuestion: null,
        options: [{ id: '1', label: 'Next question' }],
    },
};

const INITIAL_RADIO_QUESTION: Question = {
    questionNo: undefined,
    id: crypto.randomUUID(),
    type: QuestionType.RADIO,
    title: 'Which option best describes your experience?',
    required: false,
    randomized: false,
    options: [
        {
            id: 'option1',
            text: 'Option 1',
            withStatement: false,
            statement: '',
        },
        {
            id: 'option2',
            text: 'Option 2',
            withStatement: false,
            statement: '',
        },
    ],
    logic: {
        nextQuestion: null,
        options: [{ id: '1', label: 'Next question' }],
    },
};

const INITIAL_CHECKBOX_QUESTION: Question = {
    questionNo: undefined,
    id: crypto.randomUUID(),
    type: QuestionType.CHECKBOX,
    title: 'Select all that apply',
    required: false,
    randomized: false,
    options: [
        {
            id: 'option1',
            text: 'Option 1',
            isSelected: false,
            withStatement: false,
            statement: '',
        },
        {
            id: 'option2',
            text: 'Option 2',
            isSelected: false,
            withStatement: false,
            statement: '',
        },
    ],
    logic: {
        nextQuestion: null,
        options: [{ id: '1', label: 'Next question' }],
    },
};

const INITIAL_RATING_5_QUESTION: Question = {
    questionNo: undefined,
    id: crypto.randomUUID(),
    type: QuestionType.RATING_5,
    title: 'How would you rate our service?',
    required: false,
    lowScoreLabel: 'Poor',
    highScoreLabel: 'Excellent',
    logic: {
        nextQuestion: null,
        options: [{ id: '1', label: 'Next question' }],
    },
};

const INITIAL_RATING_7_QUESTION: Question = {
    questionNo: undefined,
    id: crypto.randomUUID(),
    type: QuestionType.RATING_7,
    title: 'How would you rate our service?',
    required: false,
    lowScoreLabel: 'Very Poor',
    highScoreLabel: 'Outstanding',
    logic: {
        nextQuestion: null,
        options: [{ id: '1', label: 'Next question' }],
    },
};

const INITIAL_NPS_QUESTION: Question = {
    questionNo: undefined,
    id: crypto.randomUUID(),
    type: QuestionType.NPS,
    title: 'How likely are you to recommend us to others?',
    required: false,
    lowScoreLabel: 'Not at all likely',
    highScoreLabel: 'Extremely likely',
    logic: {
        nextQuestion: null,
        options: [{ id: '1', label: 'Next question' }],
    },
};

const INITIAL_STATEMENT_QUESTION: Question = {
    questionNo: undefined,
    id: crypto.randomUUID(),
    type: QuestionType.STATEMENT,
    title: 'Important Information',
    required: false,
    content: 'Please read the following information carefully.',
    logic: {
        nextQuestion: null,
        options: [{ id: '1', label: 'Next question' }],
    },
};

// Export all initial questions
export const INITIAL_QUESTIONS = {
    [QuestionType.REACTION]: INITIAL_REACTION_QUESTION,
    [QuestionType.SHORT_TEXT]: INITIAL_SHORT_TEXT_QUESTION,
    [QuestionType.LONG_TEXT]: INITIAL_LONG_TEXT_QUESTION,
    [QuestionType.EMAIL]: INITIAL_EMAIL_QUESTION,
    [QuestionType.YES_NO]: INITIAL_YES_NO_QUESTION,
    [QuestionType.RADIO]: INITIAL_RADIO_QUESTION,
    [QuestionType.CHECKBOX]: INITIAL_CHECKBOX_QUESTION,
    [QuestionType.RATING_5]: INITIAL_RATING_5_QUESTION,
    [QuestionType.RATING_7]: INITIAL_RATING_7_QUESTION,
    [QuestionType.NPS]: INITIAL_NPS_QUESTION,
    [QuestionType.STATEMENT]: INITIAL_STATEMENT_QUESTION,
    [QuestionType.THANK_YOU]: THANK_YOU_QUESTION,
};
