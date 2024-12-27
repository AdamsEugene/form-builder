import {
    SmilePlus, // Reaction
    TextCursor, // Short text
    MessageSquare, // Long text
    Mail, // Email
    ThumbsUp, // Yes/No
    ListChecks, // Radio
    CheckSquare, // Checkbox
    Star, // Rating 5
    Stars, // Rating 7
    Activity, // NPS
    StickyNote, // Statement
    Heart, // Thank you
    type LucideIcon,
} from 'lucide-vue-next';
import { QuestionType } from '~/types/survey';

export const useQuestionIcons = () => {
    const iconMap = new Map<QuestionType, LucideIcon>([
        [QuestionType.REACTION, SmilePlus],
        [QuestionType.SHORT_TEXT, TextCursor],
        [QuestionType.LONG_TEXT, MessageSquare],
        [QuestionType.EMAIL, Mail],
        [QuestionType.YES_NO, ThumbsUp],
        [QuestionType.RADIO, ListChecks],
        [QuestionType.CHECKBOX, CheckSquare],
        [QuestionType.RATING_5, Star],
        [QuestionType.RATING_7, Stars],
        [QuestionType.NPS, Activity],
        [QuestionType.STATEMENT, StickyNote],
        [QuestionType.THANK_YOU, Heart],
    ]);

    const getIconForType = (type: QuestionType): LucideIcon => {
        return iconMap.get(type) || MessageSquare; // Default to MessageSquare if type not found
    };

    return {
        getIconForType,
    };
};
