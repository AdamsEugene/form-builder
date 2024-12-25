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
    };
}

// Reaction Question
interface ReactionQuestion extends BaseQuestion {
    type: QuestionType.REACTION;
    reactionType: ReactionType;
    lowScoreLabel?: string;
    highScoreLabel?: string;
    image?: {
        url: string;
        width: number;
        height: number;
    };
}

// Text Questions
interface TextQuestion extends BaseQuestion {
    type: QuestionType.SHORT_TEXT | QuestionType.LONG_TEXT | QuestionType.EMAIL;
    placeholder?: string;
}

// Choice Questions
interface ChoiceQuestion extends BaseQuestion {
    type: QuestionType.YES_NO | QuestionType.RADIO | QuestionType.CHECKBOX;
    options: Array<{
        id: string;
        label: string;
    }>;
}

// Rating Questions
interface RatingQuestion extends BaseQuestion {
    type: QuestionType.RATING_5 | QuestionType.RATING_7 | QuestionType.NPS;
    lowScoreLabel?: string;
    highScoreLabel?: string;
}

// Statement Question
interface StatementQuestion extends BaseQuestion {
    type: QuestionType.STATEMENT;
    content: string;
}

// Union type of all question types
export type Question = ReactionQuestion | TextQuestion | ChoiceQuestion | RatingQuestion | StatementQuestion;

// Survey interface
export interface Survey {
    id: string;
    title: string;
    questions: Question[];
}

export const questionTypes = [
    {
        id: 'reaction',
        label: 'Reaction',
        icon: ThumbsUp,
        description: 'Simple reaction feedback',
    },
    {
        id: 'short_text',
        label: 'Short text answer',
        icon: MessageSquare,
        description: 'Brief text response',
    },
    {
        id: 'long_text',
        label: 'Long text answer',
        icon: FileText,
        description: 'Detailed text response',
    },
    {
        id: 'email',
        label: 'Email',
        icon: Mail,
        description: 'Collect email addresses',
    },
    {
        id: 'yes_no',
        label: 'Yes / No',
        icon: CheckSquare,
        description: 'Binary choice question',
    },
    {
        id: 'radio',
        label: 'Radio options',
        icon: Circle,
        description: 'Single choice from multiple options',
    },
    {
        id: 'checkbox',
        label: 'Checkbox options',
        icon: CheckSquare2,
        description: 'Multiple choice selection',
    },
    {
        id: 'rating_5',
        label: '1 - 5 Rating scale',
        icon: Star,
        description: 'Five-point rating scale',
    },
    {
        id: 'rating_7',
        label: '1 - 7 Rating scale',
        icon: Stars,
        description: 'Seven-point rating scale',
    },
    {
        id: 'nps',
        label: 'Net Promoter Score',
        icon: PieChart,
        description: 'Measure customer loyalty (0-10)',
    },
    {
        id: 'statement',
        label: 'Statement',
        icon: TextQuote,
        description: 'Display text without requiring response',
    },
];
