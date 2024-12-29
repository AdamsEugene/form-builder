import type { FeedbackTab, TemplateData } from '~/types';
import { QuestionType, ReactionType } from '~/types/survey';

export const surveyTemplates: TemplateData[] = [
    {
        // Modern Minimal
        surveyData: {
            id: crypto.randomUUID(),
            title: 'Customer Satisfaction',
            email: 'feedback@company.com',
            description: 'Help us improve your experience',
            type: 'popover' as FeedbackTab,
            questions: [
                {
                    id: crypto.randomUUID(),
                    type: QuestionType.REACTION,
                    title: 'How would you rate your experience?',
                    required: true,
                    reactionType: ReactionType.SMILEYS,
                    lowScoreLabel: 'Poor',
                    highScoreLabel: 'Excellent',
                },
            ],
        },
        colors: {
            backgroundColor: '#ffffff',
            questionColor: '#1a1a1a',
            labelColor: '#4b5563',
            emojiBackgroundColor: '#f3f4f6',
            emojiHoverColor: '#e5e7eb',
            emojiActiveColor: '#d1d5db',
            nextButtonTextColor: '#ffffff',
            nextButtonBgColor: '#3b82f6',
        },
    },

    // Deep Ocean
    {
        surveyData: {
            id: crypto.randomUUID(),
            title: 'Product Feedback',
            email: 'product@company.com',
            description: 'Share your thoughts on our latest features',
            type: 'embedded' as FeedbackTab,
            questions: [
                {
                    id: crypto.randomUUID(),
                    type: QuestionType.NPS,
                    title: 'How likely are you to recommend us?',
                    required: true,
                    lowScoreLabel: 'Not likely',
                    highScoreLabel: 'Very likely',
                },
            ],
        },
        colors: {
            backgroundColor: '#1e293b',
            questionColor: '#f8fafc',
            labelColor: '#cbd5e1',
            emojiBackgroundColor: '#334155',
            emojiHoverColor: '#475569',
            emojiActiveColor: '#64748b',
            nextButtonTextColor: '#ffffff',
            nextButtonBgColor: '#0ea5e9',
        },
    },

    // Forest Fresh
    {
        surveyData: {
            id: crypto.randomUUID(),
            title: 'Website Usability Survey',
            email: 'ux@company.com',
            description: 'Help us make our website better for you',
            type: 'bubble' as FeedbackTab,
            questions: [
                {
                    id: crypto.randomUUID(),
                    type: QuestionType.RATING_5,
                    title: 'How easy was it to find what you were looking for?',
                    required: true,
                    lowScoreLabel: 'Very difficult',
                    highScoreLabel: 'Very easy',
                },
            ],
        },
        colors: {
            backgroundColor: '#f0fdf4',
            questionColor: '#166534',
            labelColor: '#15803d',
            emojiBackgroundColor: '#dcfce7',
            emojiHoverColor: '#bbf7d0',
            emojiActiveColor: '#86efac',
            nextButtonTextColor: '#ffffff',
            nextButtonBgColor: '#16a34a',
        },
    },

    // Sunset Warmth
    {
        surveyData: {
            id: crypto.randomUUID(),
            title: 'Event Feedback',
            email: 'events@company.com',
            description: 'Tell us about your experience at our event',
            type: 'fullScreen' as FeedbackTab,
            questions: [
                {
                    id: crypto.randomUUID(),
                    type: QuestionType.REACTION,
                    title: 'How was the event?',
                    required: true,
                    reactionType: ReactionType.STARS,
                    lowScoreLabel: 'Poor',
                    highScoreLabel: 'Amazing',
                },
            ],
        },
        colors: {
            backgroundColor: '#fff7ed',
            questionColor: '#9a3412',
            labelColor: '#c2410c',
            emojiBackgroundColor: '#ffedd5',
            emojiHoverColor: '#fed7aa',
            emojiActiveColor: '#fdba74',
            nextButtonTextColor: '#ffffff',
            nextButtonBgColor: '#ea580c',
        },
    },

    // Purple Elegance
    {
        surveyData: {
            id: crypto.randomUUID(),
            title: 'Premium Service Feedback',
            email: 'premium@company.com',
            description: 'Share your premium membership experience',
            type: 'popover' as FeedbackTab,
            questions: [
                {
                    id: crypto.randomUUID(),
                    type: QuestionType.RATING_7,
                    title: 'How satisfied are you with our premium features?',
                    required: true,
                    lowScoreLabel: 'Not satisfied',
                    highScoreLabel: 'Very satisfied',
                },
            ],
        },
        colors: {
            backgroundColor: '#faf5ff',
            questionColor: '#6b21a8',
            labelColor: '#7e22ce',
            emojiBackgroundColor: '#f3e8ff',
            emojiHoverColor: '#e9d5ff',
            emojiActiveColor: '#d8b4fe',
            nextButtonTextColor: '#ffffff',
            nextButtonBgColor: '#9333ea',
        },
    },

    // Rose Garden
    {
        surveyData: {
            id: crypto.randomUUID(),
            title: 'Shopping Experience',
            email: 'retail@company.com',
            description: 'Tell us about your shopping experience',
            type: 'button' as FeedbackTab,
            questions: [
                {
                    id: crypto.randomUUID(),
                    type: QuestionType.REACTION,
                    title: 'How was your shopping experience?',
                    required: true,
                    reactionType: ReactionType.EMOJIS,
                    lowScoreLabel: 'Disappointing',
                    highScoreLabel: 'Delightful',
                },
            ],
        },
        colors: {
            backgroundColor: '#fff1f2',
            questionColor: '#9f1239',
            labelColor: '#be123c',
            emojiBackgroundColor: '#ffe4e6',
            emojiHoverColor: '#fecdd3',
            emojiActiveColor: '#fda4af',
            nextButtonTextColor: '#ffffff',
            nextButtonBgColor: '#e11d48',
        },
    },

    // Tech Modern
    {
        surveyData: {
            id: crypto.randomUUID(),
            title: 'App Experience Survey',
            email: 'app@company.com',
            description: 'Help us improve our app',
            type: 'embedded' as FeedbackTab,
            questions: [
                {
                    id: crypto.randomUUID(),
                    type: QuestionType.CHECKBOX,
                    title: 'Which features do you use most?',
                    required: true,
                    randomized: false,
                    options: [
                        {
                            id: crypto.randomUUID(),
                            text: 'Dashboard',
                            isSelected: false,
                            withStatement: false,
                            statement: '',
                        },
                        {
                            id: crypto.randomUUID(),
                            text: 'Analytics',
                            isSelected: false,
                            withStatement: false,
                            statement: '',
                        },
                    ],
                },
            ],
        },
        colors: {
            backgroundColor: '#f8fafc',
            questionColor: '#0f172a',
            labelColor: '#1e293b',
            emojiBackgroundColor: '#e2e8f0',
            emojiHoverColor: '#cbd5e1',
            emojiActiveColor: '#94a3b8',
            nextButtonTextColor: '#ffffff',
            nextButtonBgColor: '#0f172a',
        },
    },

    // Teal Serenity
    {
        surveyData: {
            id: crypto.randomUUID(),
            title: 'Support Feedback',
            email: 'support@company.com',
            description: 'Rate your support experience',
            type: 'popover' as FeedbackTab,
            questions: [
                {
                    id: crypto.randomUUID(),
                    type: QuestionType.REACTION,
                    title: 'How helpful was our support team?',
                    required: true,
                    reactionType: ReactionType.BUDDIES,
                    lowScoreLabel: 'Not helpful',
                    highScoreLabel: 'Very helpful',
                },
            ],
        },
        colors: {
            backgroundColor: '#f0fdfa',
            questionColor: '#115e59',
            labelColor: '#0f766e',
            emojiBackgroundColor: '#ccfbf1',
            emojiHoverColor: '#99f6e4',
            emojiActiveColor: '#5eead4',
            nextButtonTextColor: '#ffffff',
            nextButtonBgColor: '#14b8a6',
        },
    },

    // Amber Glow
    {
        surveyData: {
            id: crypto.randomUUID(),
            title: 'Restaurant Feedback',
            email: 'dining@company.com',
            description: 'Tell us about your dining experience',
            type: 'fullScreen' as FeedbackTab,
            questions: [
                {
                    id: crypto.randomUUID(),
                    type: QuestionType.RATING_5,
                    title: 'How would you rate your meal?',
                    required: true,
                    lowScoreLabel: 'Poor',
                    highScoreLabel: 'Excellent',
                },
            ],
        },
        colors: {
            backgroundColor: '#fffbeb',
            questionColor: '#854d0e',
            labelColor: '#a16207',
            emojiBackgroundColor: '#fef3c7',
            emojiHoverColor: '#fde68a',
            emojiActiveColor: '#fcd34d',
            nextButtonTextColor: '#ffffff',
            nextButtonBgColor: '#d97706',
        },
    },

    // Night Mode
    {
        surveyData: {
            id: crypto.randomUUID(),
            title: 'Dark Theme Feedback',
            email: 'design@company.com',
            description: 'Share your thoughts on our dark theme',
            type: 'button' as FeedbackTab,
            questions: [
                {
                    id: crypto.randomUUID(),
                    type: QuestionType.YES_NO,
                    title: 'Do you prefer the dark theme?',
                    required: true,
                    randomized: false,
                    options: [
                        {
                            id: crypto.randomUUID(),
                            text: 'Yes',
                            withStatement: false,
                            statement: '',
                        },
                        {
                            id: crypto.randomUUID(),
                            text: 'No',
                            withStatement: false,
                            statement: '',
                        },
                    ],
                },
            ],
        },
        colors: {
            backgroundColor: '#18181b',
            questionColor: '#fafafa',
            labelColor: '#e4e4e7',
            emojiBackgroundColor: '#27272a',
            emojiHoverColor: '#3f3f46',
            emojiActiveColor: '#52525b',
            nextButtonTextColor: '#18181b',
            nextButtonBgColor: '#e4e4e7',
        },
    },
    // Glacier Blue
    {
        surveyData: {
            id: crypto.randomUUID(),
            title: 'Software Update Feedback',
            email: 'updates@company.com',
            description: 'Tell us about your experience with the latest update',
            type: 'link' as FeedbackTab,
            questions: [
                {
                    id: crypto.randomUUID(),
                    type: QuestionType.RATING_7,
                    title: 'How smooth was the update process?',
                    required: true,
                    lowScoreLabel: 'Very Rough',
                    highScoreLabel: 'Very Smooth',
                },
            ],
        },
        colors: {
            backgroundColor: '#ecfeff',
            questionColor: '#164e63',
            labelColor: '#155e75',
            emojiBackgroundColor: '#cffafe',
            emojiHoverColor: '#a5f3fc',
            emojiActiveColor: '#67e8f9',
            nextButtonTextColor: '#ffffff',
            nextButtonBgColor: '#0891b2',
        },
    },

    // Desert Sand
    {
        surveyData: {
            id: crypto.randomUUID(),
            title: 'Travel Experience Survey',
            email: 'travel@company.com',
            description: 'Share your travel experience with us',
            type: 'bubble' as FeedbackTab,
            questions: [
                {
                    id: crypto.randomUUID(),
                    type: QuestionType.REACTION,
                    title: 'How was your journey?',
                    required: true,
                    reactionType: ReactionType.EMOJIS,
                    lowScoreLabel: 'Terrible',
                    highScoreLabel: 'Amazing',
                },
            ],
        },
        colors: {
            backgroundColor: '#fef2f2',
            questionColor: '#7f1d1d',
            labelColor: '#991b1b',
            emojiBackgroundColor: '#fee2e2',
            emojiHoverColor: '#fecaca',
            emojiActiveColor: '#fca5a5',
            nextButtonTextColor: '#ffffff',
            nextButtonBgColor: '#dc2626',
        },
    },

    // Emerald City
    {
        surveyData: {
            id: crypto.randomUUID(),
            title: 'Eco-Friendly Initiatives',
            email: 'sustainability@company.com',
            description: 'Help us evaluate our green initiatives',
            type: 'embedded' as FeedbackTab,
            questions: [
                {
                    id: crypto.randomUUID(),
                    type: QuestionType.CHECKBOX,
                    title: 'Which green initiatives have you noticed?',
                    required: true,
                    randomized: true,
                    options: [
                        {
                            id: crypto.randomUUID(),
                            text: 'Recycling Programs',
                            isSelected: false,
                            withStatement: false,
                            statement: '',
                        },
                        {
                            id: crypto.randomUUID(),
                            text: 'Energy Efficiency',
                            isSelected: false,
                            withStatement: false,
                            statement: '',
                        },
                    ],
                },
            ],
        },
        colors: {
            backgroundColor: '#ecfdf5',
            questionColor: '#065f46',
            labelColor: '#047857',
            emojiBackgroundColor: '#d1fae5',
            emojiHoverColor: '#a7f3d0',
            emojiActiveColor: '#6ee7b7',
            nextButtonTextColor: '#ffffff',
            nextButtonBgColor: '#059669',
        },
    },

    // Royal Purple
    {
        surveyData: {
            id: crypto.randomUUID(),
            title: 'VIP Member Survey',
            email: 'vip@company.com',
            description: 'Help us enhance your VIP experience',
            type: 'fullScreen' as FeedbackTab,
            questions: [
                {
                    id: crypto.randomUUID(),
                    type: QuestionType.NPS,
                    title: 'How likely are you to recommend our VIP program?',
                    required: true,
                    lowScoreLabel: 'Not at all likely',
                    highScoreLabel: 'Extremely likely',
                },
            ],
        },
        colors: {
            backgroundColor: '#f5f3ff',
            questionColor: '#5b21b6',
            labelColor: '#6d28d9',
            emojiBackgroundColor: '#ede9fe',
            emojiHoverColor: '#ddd6fe',
            emojiActiveColor: '#c4b5fd',
            nextButtonTextColor: '#ffffff',
            nextButtonBgColor: '#7c3aed',
        },
    },

    // Cherry Blossom
    {
        surveyData: {
            id: crypto.randomUUID(),
            title: 'Spring Collection Feedback',
            email: 'fashion@company.com',
            description: 'Share your thoughts on our spring collection',
            type: 'popover' as FeedbackTab,
            questions: [
                {
                    id: crypto.randomUUID(),
                    type: QuestionType.RATING_5,
                    title: 'How would you rate our new collection?',
                    required: true,
                    lowScoreLabel: 'Poor',
                    highScoreLabel: 'Excellent',
                },
            ],
        },
        colors: {
            backgroundColor: '#fdf2f8',
            questionColor: '#831843',
            labelColor: '#9d174d',
            emojiBackgroundColor: '#fce7f3',
            emojiHoverColor: '#fbcfe8',
            emojiActiveColor: '#f9a8d4',
            nextButtonTextColor: '#ffffff',
            nextButtonBgColor: '#db2777',
        },
    },

    // Coffee Break
    {
        surveyData: {
            id: crypto.randomUUID(),
            title: 'Café Experience',
            email: 'cafe@company.com',
            description: 'Tell us about your café visit',
            type: 'button' as FeedbackTab,
            questions: [
                {
                    id: crypto.randomUUID(),
                    type: QuestionType.REACTION,
                    title: 'How was your coffee experience?',
                    required: true,
                    reactionType: ReactionType.STARS,
                    lowScoreLabel: 'Disappointing',
                    highScoreLabel: 'Perfect',
                },
            ],
        },
        colors: {
            backgroundColor: '#fffbf1',
            questionColor: '#78350f',
            labelColor: '#92400e',
            emojiBackgroundColor: '#fef3c7',
            emojiHoverColor: '#fde68a',
            emojiActiveColor: '#fcd34d',
            nextButtonTextColor: '#ffffff',
            nextButtonBgColor: '#b45309',
        },
    },

    // Arctic Frost
    {
        surveyData: {
            id: crypto.randomUUID(),
            title: 'Winter Collection Review',
            email: 'winter@company.com',
            description: 'Rate our winter collection',
            type: 'link' as FeedbackTab,
            questions: [
                {
                    id: crypto.randomUUID(),
                    type: QuestionType.CHECKBOX,
                    title: 'Which winter items did you purchase?',
                    required: true,
                    randomized: false,
                    options: [
                        {
                            id: crypto.randomUUID(),
                            text: 'Winter Coat',
                            isSelected: false,
                            withStatement: false,
                            statement: '',
                        },
                        {
                            id: crypto.randomUUID(),
                            text: 'Snow Boots',
                            isSelected: false,
                            withStatement: false,
                            statement: '',
                        },
                    ],
                },
            ],
        },
        colors: {
            backgroundColor: '#f8fafc',
            questionColor: '#0f172a',
            labelColor: '#1e293b',
            emojiBackgroundColor: '#e2e8f0',
            emojiHoverColor: '#cbd5e1',
            emojiActiveColor: '#94a3b8',
            nextButtonTextColor: '#ffffff',
            nextButtonBgColor: '#334155',
        },
    },

    // Sunset Gold
    {
        surveyData: {
            id: crypto.randomUUID(),
            title: 'Luxury Experience',
            email: 'luxury@company.com',
            description: 'Rate your premium experience',
            type: 'bubble' as FeedbackTab,
            questions: [
                {
                    id: crypto.randomUUID(),
                    type: QuestionType.RATING_7,
                    title: 'How would you rate your luxury experience?',
                    required: true,
                    lowScoreLabel: 'Below Expectations',
                    highScoreLabel: 'Exceeded Expectations',
                },
            ],
        },
        colors: {
            backgroundColor: '#fffbeb',
            questionColor: '#854d0e',
            labelColor: '#a16207',
            emojiBackgroundColor: '#fef3c7',
            emojiHoverColor: '#fde68a',
            emojiActiveColor: '#fcd34d',
            nextButtonTextColor: '#ffffff',
            nextButtonBgColor: '#d97706',
        },
    },

    // Digital Wave
    {
        surveyData: {
            id: crypto.randomUUID(),
            title: 'Digital Experience',
            email: 'digital@company.com',
            description: 'Help us improve our digital services',
            type: 'embedded' as FeedbackTab,
            questions: [
                {
                    id: crypto.randomUUID(),
                    type: QuestionType.RADIO,
                    title: 'Which digital service do you use most?',
                    required: true,
                    randomized: true,
                    options: [
                        {
                            id: crypto.randomUUID(),
                            text: 'Mobile App',
                            withStatement: false,
                            statement: '',
                        },
                        {
                            id: crypto.randomUUID(),
                            text: 'Website',
                            withStatement: false,
                            statement: '',
                        },
                    ],
                },
            ],
        },
        colors: {
            backgroundColor: '#f0f9ff',
            questionColor: '#075985',
            labelColor: '#0369a1',
            emojiBackgroundColor: '#e0f2fe',
            emojiHoverColor: '#bae6fd',
            emojiActiveColor: '#7dd3fc',
            nextButtonTextColor: '#ffffff',
            nextButtonBgColor: '#0284c7',
        },
    },

    // Electric Lime
    {
        surveyData: {
            id: crypto.randomUUID(),
            title: 'Energy Drink Survey',
            email: 'beverages@company.com',
            description: 'Rate our new energy drink flavors',
            type: 'fullScreen' as FeedbackTab,
            questions: [
                {
                    id: crypto.randomUUID(),
                    type: QuestionType.REACTION,
                    title: 'How would you rate the new flavor?',
                    required: true,
                    reactionType: ReactionType.EMOJIS,
                    lowScoreLabel: 'Dislike',
                    highScoreLabel: 'Love it',
                },
            ],
        },
        colors: {
            backgroundColor: '#f7fee7',
            questionColor: '#3f6212',
            labelColor: '#4d7c0f',
            emojiBackgroundColor: '#ecfccb',
            emojiHoverColor: '#d9f99d',
            emojiActiveColor: '#bef264',
            nextButtonTextColor: '#ffffff',
            nextButtonBgColor: '#65a30d',
        },
    },
    {
        surveyData: {
            id: crypto.randomUUID(),
            title: 'Gaming Experience',
            email: 'gaming@company.com',
            description: 'Rate your gaming experience',
            type: 'bubble' as FeedbackTab,
            questions: [
                {
                    id: crypto.randomUUID(),
                    type: QuestionType.REACTION,
                    title: 'How enjoyable was your gaming session?',
                    required: true,
                    reactionType: ReactionType.STARS,
                    lowScoreLabel: 'Not Fun',
                    highScoreLabel: 'Super Fun',
                },
            ],
        },
        colors: {
            backgroundColor: '#030712',
            questionColor: '#e5e7eb',
            labelColor: '#d1d5db',
            emojiBackgroundColor: '#111827',
            emojiHoverColor: '#1f2937',
            emojiActiveColor: '#374151',
            nextButtonTextColor: '#030712',
            nextButtonBgColor: '#e5e7eb',
        },
    },

    // Lavender Dream
    {
        surveyData: {
            id: crypto.randomUUID(),
            title: 'Wellness Survey',
            email: 'wellness@company.com',
            description: 'Help us improve our wellness programs',
            type: 'popover' as FeedbackTab,
            questions: [
                {
                    id: crypto.randomUUID(),
                    type: QuestionType.CHECKBOX,
                    title: 'Which wellness activities interest you?',
                    required: true,
                    randomized: true,
                    options: [
                        {
                            id: crypto.randomUUID(),
                            text: 'Yoga Classes',
                            isSelected: false,
                            withStatement: false,
                            statement: '',
                        },
                        {
                            id: crypto.randomUUID(),
                            text: 'Meditation Sessions',
                            isSelected: false,
                            withStatement: false,
                            statement: '',
                        },
                    ],
                },
            ],
        },
        colors: {
            backgroundColor: '#faf5ff',
            questionColor: '#6b21a8',
            labelColor: '#7e22ce',
            emojiBackgroundColor: '#f3e8ff',
            emojiHoverColor: '#e9d5ff',
            emojiActiveColor: '#d8b4fe',
            nextButtonTextColor: '#ffffff',
            nextButtonBgColor: '#9333ea',
        },
    },

    // Ocean Breeze
    {
        surveyData: {
            id: crypto.randomUUID(),
            title: 'Hotel Stay Experience',
            email: 'hospitality@company.com',
            description: 'Tell us about your stay',
            type: 'embedded' as FeedbackTab,
            questions: [
                {
                    id: crypto.randomUUID(),
                    type: QuestionType.NPS,
                    title: 'How likely are you to recommend our hotel?',
                    required: true,
                    lowScoreLabel: 'Not Likely',
                    highScoreLabel: 'Very Likely',
                },
            ],
        },
        colors: {
            backgroundColor: '#f0fdff',
            questionColor: '#155e75',
            labelColor: '#0891b2',
            emojiBackgroundColor: '#e0faff',
            emojiHoverColor: '#bae7ff',
            emojiActiveColor: '#7dd4ff',
            nextButtonTextColor: '#ffffff',
            nextButtonBgColor: '#0e7490',
        },
    },

    // Autumn Harvest
    {
        surveyData: {
            id: crypto.randomUUID(),
            title: 'Seasonal Products',
            email: 'seasonal@company.com',
            description: 'Rate our fall collection',
            type: 'link' as FeedbackTab,
            questions: [
                {
                    id: crypto.randomUUID(),
                    type: QuestionType.RATING_5,
                    title: 'How would you rate our autumn selection?',
                    required: true,
                    lowScoreLabel: 'Poor',
                    highScoreLabel: 'Excellent',
                },
            ],
        },
        colors: {
            backgroundColor: '#fef3e7',
            questionColor: '#9a3412',
            labelColor: '#c2410c',
            emojiBackgroundColor: '#ffedd5',
            emojiHoverColor: '#fed7aa',
            emojiActiveColor: '#fdba74',
            nextButtonTextColor: '#ffffff',
            nextButtonBgColor: '#ea580c',
        },
    },

    // Mountain Pine
    {
        surveyData: {
            id: crypto.randomUUID(),
            title: 'Outdoor Equipment',
            email: 'outdoor@company.com',
            description: 'Rate your outdoor gear',
            type: 'fullScreen' as FeedbackTab,
            questions: [
                {
                    id: crypto.randomUUID(),
                    type: QuestionType.REACTION,
                    title: 'How did our gear perform?',
                    required: true,
                    reactionType: ReactionType.BUDDIES,
                    lowScoreLabel: 'Poor',
                    highScoreLabel: 'Excellent',
                },
            ],
        },
        colors: {
            backgroundColor: '#f1f8f6',
            questionColor: '#166534',
            labelColor: '#15803d',
            emojiBackgroundColor: '#dcfce7',
            emojiHoverColor: '#bbf7d0',
            emojiActiveColor: '#86efac',
            nextButtonTextColor: '#ffffff',
            nextButtonBgColor: '#16a34a',
        },
    },

    // Urban Gray
    {
        surveyData: {
            id: crypto.randomUUID(),
            title: 'City Services',
            email: 'city@company.com',
            description: 'Help improve city services',
            type: 'button' as FeedbackTab,
            questions: [
                {
                    id: crypto.randomUUID(),
                    type: QuestionType.RADIO,
                    title: 'Which city service do you use most?',
                    required: true,
                    randomized: false,
                    options: [
                        {
                            id: crypto.randomUUID(),
                            text: 'Public Transport',
                            withStatement: false,
                            statement: '',
                        },
                        {
                            id: crypto.randomUUID(),
                            text: 'Parks & Recreation',
                            withStatement: false,
                            statement: '',
                        },
                    ],
                },
            ],
        },
        colors: {
            backgroundColor: '#f8fafc',
            questionColor: '#334155',
            labelColor: '#475569',
            emojiBackgroundColor: '#f1f5f9',
            emojiHoverColor: '#e2e8f0',
            emojiActiveColor: '#cbd5e1',
            nextButtonTextColor: '#ffffff',
            nextButtonBgColor: '#64748b',
        },
    },

    // Cherry Red
    {
        surveyData: {
            id: crypto.randomUUID(),
            title: 'Valentine Special',
            email: 'special@company.com',
            description: 'Rate our Valentine collection',
            type: 'popover' as FeedbackTab,
            questions: [
                {
                    id: crypto.randomUUID(),
                    type: QuestionType.RATING_7,
                    title: 'How romantic was our selection?',
                    required: true,
                    lowScoreLabel: 'Not Romantic',
                    highScoreLabel: 'Very Romantic',
                },
            ],
        },
        colors: {
            backgroundColor: '#fff1f2',
            questionColor: '#9f1239',
            labelColor: '#be123c',
            emojiBackgroundColor: '#ffe4e6',
            emojiHoverColor: '#fecdd3',
            emojiActiveColor: '#fda4af',
            nextButtonTextColor: '#ffffff',
            nextButtonBgColor: '#e11d48',
        },
    },

    // Summer Sky
    {
        surveyData: {
            id: crypto.randomUUID(),
            title: 'Beach Resort Survey',
            email: 'resort@company.com',
            description: 'Tell us about your beach vacation',
            type: 'bubble' as FeedbackTab,
            questions: [
                {
                    id: crypto.randomUUID(),
                    type: QuestionType.REACTION,
                    title: 'How was your beach experience?',
                    required: true,
                    reactionType: ReactionType.EMOJIS,
                    lowScoreLabel: 'Poor',
                    highScoreLabel: 'Amazing',
                },
            ],
        },
        colors: {
            backgroundColor: '#f0f9ff',
            questionColor: '#075985',
            labelColor: '#0369a1',
            emojiBackgroundColor: '#e0f2fe',
            emojiHoverColor: '#bae6fd',
            emojiActiveColor: '#7dd3fc',
            nextButtonTextColor: '#ffffff',
            nextButtonBgColor: '#0284c7',
        },
    },

    // Electric Lime
    {
        surveyData: {
            id: crypto.randomUUID(),
            title: 'Sport Equipment',
            email: 'sports@company.com',
            description: 'Rate our sports gear',
            type: 'link' as FeedbackTab,
            questions: [
                {
                    id: crypto.randomUUID(),
                    type: QuestionType.YES_NO,
                    title: 'Would you recommend our equipment?',
                    required: true,
                    randomized: false,
                    options: [
                        {
                            id: crypto.randomUUID(),
                            text: 'Yes',
                            withStatement: false,
                            statement: '',
                        },
                        {
                            id: crypto.randomUUID(),
                            text: 'No',
                            withStatement: false,
                            statement: '',
                        },
                    ],
                },
            ],
        },
        colors: {
            backgroundColor: '#f7fee7',
            questionColor: '#3f6212',
            labelColor: '#4d7c0f',
            emojiBackgroundColor: '#ecfccb',
            emojiHoverColor: '#d9f99d',
            emojiActiveColor: '#bef264',
            nextButtonTextColor: '#ffffff',
            nextButtonBgColor: '#65a30d',
        },
    },
];
