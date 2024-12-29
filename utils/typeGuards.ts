import { QuestionType, type Question, type ReactionQuestion } from '~/types/survey';

export function isReactionQuestion(question: Question | undefined): question is ReactionQuestion {
    return question?.type === QuestionType.REACTION;
}
