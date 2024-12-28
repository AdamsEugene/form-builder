// types/survey.ts

import { type LucideIcon } from 'lucide-vue-next';

// Question Types
export enum QuestionType {
    REACTION = 'reaction',
    SHORT_TEXT = 'short_text',
    LONG_TEXT = 'long_text',
    EMAIL = 'email',
    YES_NO = 'yes_no',
    RADIO = 'radio',
    CHECKBOX = 'checkbox',
    RATING_5 = 'rating_5',
    RATING_7 = 'rating_7',
    NPS = 'nps',
    STATEMENT = 'statement',
    THANK_YOU = 'thank_you',
}

// Reaction Types
export enum ReactionType {
    SMILEYS = 'smileys',
    EMOJIS = 'emojis',
    STARS = 'stars',
    BUDDIES = 'buddies',
}

// Base Question Interface
interface BaseQuestion {
    id: string;
    type: QuestionType;
    title: string;
    required: boolean;
    questionNo: number;
    logic?: {
        nextQuestion: string | null; // id of next question or null for default flow
        options?: DropdownOption[];
    };
}

// Reaction Question
export interface ReactionQuestion extends BaseQuestion {
    type: QuestionType.REACTION;
    reactionType: ReactionType;
    lowScoreLabel: string;
    highScoreLabel: string;
    image?: {
        url: string;
        width: number;
        height: number;
    };
}

// Text Questions
interface TextQuestion extends BaseQuestion {
    type: QuestionType.SHORT_TEXT | QuestionType.LONG_TEXT | QuestionType.EMAIL | QuestionType.THANK_YOU;
    placeholder?: string;
}

// Choice Questions
interface BaseChoiceOption {
    id: string;
    text: string;
    withStatement: boolean;
    statement: string;
}

interface CheckboxOption extends BaseChoiceOption {
    isSelected: boolean;
}

export interface BaseChoiceQuestion extends BaseQuestion {
    randomized: boolean;
}

export interface RadioOrYesNoQuestion extends BaseChoiceQuestion {
    type: QuestionType.YES_NO | QuestionType.RADIO;
    options: Array<BaseChoiceOption>;
}

export interface CheckboxQuestion extends BaseChoiceQuestion {
    type: QuestionType.CHECKBOX;
    options: Array<CheckboxOption>;
}

export type ChoiceQuestion = RadioOrYesNoQuestion | CheckboxQuestion;

// Rating Questions
interface RatingQuestion extends BaseQuestion {
    type: QuestionType.RATING_5 | QuestionType.RATING_7 | QuestionType.NPS;
    lowScoreLabel: string;
    highScoreLabel: string;
}

// Statement Question
interface StatementQuestion extends BaseQuestion {
    type: QuestionType.STATEMENT;
    content: string;
}

// Union type of all question types
export type Question = ReactionQuestion | TextQuestion | ChoiceQuestion | RatingQuestion | StatementQuestion;

// Survey interface
export interface SurveyData {
    id: string;
    title: string;
    questions: Question[];
}

export interface DropdownOption {
    id: QuestionType | string;
    label: string;
    icon?: LucideIcon;
    disabled?: boolean;
    description?: string;
}

export interface Integration {
    id: string;
    name: string;
    icon: LucideIcon;
    badge?: 'BUSINESS' | 'SCALE';
    enabled: boolean;
    external?: boolean;
    isNested?: boolean;
    iconColor: string;
}
