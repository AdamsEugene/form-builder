import {
    MehIcon,
    Smile,
    Heart,
    ThumbsDown,
    ThumbsUp,
    Star,
    UserX2,
    User,
    UserCheck,
    UserPlus,
    UserMinus,
    Frown,
    SmileIcon,
} from 'lucide-vue-next';
import { ReactionType } from '~/types/survey';

// const SMILEYS = [
//     { emoji: '😡', value: 1 },
//     { emoji: '😕', value: 2 },
//     { emoji: '😐', value: 3 },
//     { emoji: '😊', value: 4 },
//     { emoji: '🥰', value: 5 },
// ];

// const EMOJIS = [
//     { emoji: '👎', value: 1 },
//     { emoji: '🤔', value: 2 },
//     { emoji: '😌', value: 3 },
//     { emoji: '👍', value: 4 },
//     { emoji: '❤️', value: 5 },
// ];

// Using Lucide icons for smileys
const SMILEYS = [
    { component: Frown, props: { class: 'text-red-500', size: 32 }, value: 1 },
    { component: Smile, props: { class: 'text-orange-500', size: 32 }, value: 2 },
    { component: MehIcon, props: { class: 'text-gray-500', size: 32 }, value: 3 },
    { component: SmileIcon, props: { class: 'text-blue-500', size: 32 }, value: 4 },
    { component: Heart, props: { class: 'text-green-500', size: 32 }, value: 5 },
];

// Using Lucide icons for emojis
const EMOJIS = [
    { component: ThumbsDown, props: { class: 'text-red-500', size: 32 }, value: 1 },
    { component: Smile, props: { class: 'text-orange-500', size: 32 }, value: 2 },
    { component: MehIcon, props: { class: 'text-gray-500', size: 32 }, value: 3 },
    { component: ThumbsUp, props: { class: 'text-blue-500', size: 32 }, value: 4 },
    { component: Heart, props: { class: 'text-green-500', size: 32 }, value: 5 },
];

// Using Lucide icons for stars
const STARS = [
    { component: Star, props: { class: 'text-red-500', size: 32 }, value: 1 },
    { component: Star, props: { class: 'text-orange-500', size: 32 }, value: 2 },
    { component: Star, props: { class: 'text-gray-500', size: 32 }, value: 3 },
    { component: Star, props: { class: 'text-blue-500', size: 32 }, value: 4 },
    { component: Star, props: { class: 'text-green-500', size: 32 }, value: 5 },
];

// Using Lucide icons for buddies
const BUDDIES = [
    { component: UserX2, props: { class: 'text-red-500', size: 32 }, value: 1 },
    { component: UserMinus, props: { class: 'text-orange-500', size: 32 }, value: 2 },
    { component: User, props: { class: 'text-gray-500', size: 32 }, value: 3 },
    { component: UserCheck, props: { class: 'text-blue-500', size: 32 }, value: 4 },
    { component: UserPlus, props: { class: 'text-green-500', size: 32 }, value: 5 },
];

// Helper function to get the appropriate reaction set
export const getReactionSet = (type: ReactionType) => {
    switch (type) {
        case ReactionType.SMILEYS:
            return SMILEYS;
        case ReactionType.EMOJIS:
            return EMOJIS;
        case ReactionType.STARS:
            return STARS;
        case ReactionType.BUDDIES:
            return BUDDIES;
        default:
            return SMILEYS;
    }
};

export interface EmojiReaction {
    emoji: string;
    value: number;
}

export interface IconReaction {
    component: any; // Lucide component type
    props: {
        fill?: string;
        class: string;
        [key: string]: any;
    };
    value: number;
}

export type Reaction = EmojiReaction | IconReaction;

export const isEmojiReaction = (reaction: Reaction): reaction is EmojiReaction => {
    return 'emoji' in reaction;
};

export const isIconReaction = (reaction: Reaction): reaction is IconReaction => {
    return 'component' in reaction;
};
