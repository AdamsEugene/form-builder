// types/survey.ts

import {
    ThumbsUp,
    MessageSquare,
    FileText,
    Mail,
    CheckSquare,
    Circle,
    CheckSquare2,
    Star,
    Stars,
    PieChart,
    TextQuote,
    type LucideIcon,
} from 'lucide-vue-next';

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
    logic?: {
        nextQuestion: string | null; // id of next question or null for default flow
        options?: DropdownOption[];
    };
}

// Reaction Question
interface ReactionQuestion extends BaseQuestion {
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
export interface ChoiceQuestion extends BaseQuestion {
    type: QuestionType.YES_NO | QuestionType.RADIO | QuestionType.CHECKBOX;
    randomized: boolean;
    options: Array<{
        id: string;
        text: string;
    }>;
}

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

export const questionTypes = [
    {
        id: QuestionType.REACTION,
        label: 'Reaction',
        icon: ThumbsUp,
        description: 'Simple reaction feedback',
    },
    {
        id: QuestionType.SHORT_TEXT,
        label: 'Short text answer',
        icon: MessageSquare,
        description: 'Brief text response',
    },
    {
        id: QuestionType.LONG_TEXT,
        label: 'Long text answer',
        icon: FileText,
        description: 'Detailed text response',
    },
    {
        id: QuestionType.EMAIL,
        label: 'Email',
        icon: Mail,
        description: 'Collect email addresses',
    },
    {
        id: QuestionType.YES_NO,
        label: 'Yes / No',
        icon: CheckSquare,
        description: 'Binary choice question',
    },
    {
        id: QuestionType.RADIO,
        label: 'Radio options',
        icon: Circle,
        description: 'Single choice from multiple options',
    },
    {
        id: QuestionType.CHECKBOX,
        label: 'Checkbox options',
        icon: CheckSquare2,
        description: 'Multiple choice selection',
    },
    {
        id: QuestionType.RATING_5,
        label: '1 - 5 Rating scale',
        icon: Star,
        description: 'Five-point rating scale',
    },
    {
        id: QuestionType.RATING_7,
        label: '1 - 7 Rating scale',
        icon: Stars,
        description: 'Seven-point rating scale',
    },
    {
        id: QuestionType.NPS,
        label: 'Net Promoter Score',
        icon: PieChart,
        description: 'Measure customer loyalty (0-10)',
    },
    {
        id: QuestionType.STATEMENT,
        label: 'Statement',
        icon: TextQuote,
        description: 'Display text without requiring response',
    },
];
