import type { AlignmentSetting, ColorSettings } from '~/types';

// constants/colors.ts
export const surveyColors = {
    // Background colors - Light and neutral tones
    backgroundColor: [
        '#FFFFFF', // White
        '#F8FAFC', // Light Gray
        '#F1F5F9', // Cool Gray
        '#E2E8F0', // Neutral Gray
        '#000000', // Black
    ],

    // Question colors - Strong, readable colors
    questionColor: [
        '#FFFFFF', // White
        '#1E293B', // Dark Blue Gray
        '#334155', // Slate Gray
        '#0F172A', // Deep Blue Gray
        '#000000', // Black
    ],

    // Label colors - Softer than question colors
    labelColor: [
        '#FFFFFF', // White
        '#475569', // Medium Gray
        '#64748B', // Blue Gray
        '#94A3B8', // Light Blue Gray
        '#000000', // Black
    ],

    // Emoji background colors - Soft, pastel tones
    emojiBackgroundColor: [
        '#FFFFFF', // White
        '#EFF6FF', // Light Blue
        '#F0FDF4', // Light Green
        '#FEF2F2', // Light Red
        '#000000', // Black
    ],

    // Emoji hover colors
    emojiHoverColor: [
        '#FFFFFF', // White
        '#DBEAFE', // Pale Blue
        '#DCFCE7', // Pale Green
        '#FEE2E2', // Pale Red
        '#000000', // Black
    ],

    // Emoji active colors
    emojiActiveColor: [
        '#FFFFFF', // White
        '#BFDBFE', // Soft Blue
        '#BBF7D0', // Soft Green
        '#FECACA', // Soft Red
        '#000000', // Black
    ],

    // Next button background colors - Bold, attention-grabbing
    nextButtonBgColor: [
        '#FFFFFF', // White
        '#3B82F6', // Blue
        '#22C55E', // Green
        '#EF4444', // Red
        '#000000', // Black
    ],

    // Next button text colors - High contrast colors
    nextButtonTextColor: [
        '#FFFFFF', // White
        '#F8FAFC', // Lightest Gray
        '#F1F5F9', // Light Gray
        '#E2E8F0', // Medium Gray
        '#000000', // Black
    ],
};

// Updated helper function with all color mappings
export const getColorName = (color: string): string => {
    const colorMap: Record<string, string> = {
        // Base colors
        '#FFFFFF': 'White',
        '#000000': 'Black',

        // Background and text colors
        '#F8FAFC': 'Light Gray',
        '#F1F5F9': 'Cool Gray',
        '#E2E8F0': 'Neutral Gray',

        // Question colors
        '#1E293B': 'Dark Blue Gray',
        '#334155': 'Slate Gray',
        '#0F172A': 'Deep Blue Gray',

        // Label colors
        '#475569': 'Medium Gray',
        '#64748B': 'Blue Gray',
        '#94A3B8': 'Light Blue Gray',

        // Emoji colors
        '#EFF6FF': 'Light Blue',
        '#F0FDF4': 'Light Green',
        '#FEF2F2': 'Light Red',
        '#DBEAFE': 'Pale Blue',
        '#DCFCE7': 'Pale Green',
        '#FEE2E2': 'Pale Red',
        '#BFDBFE': 'Soft Blue',
        '#BBF7D0': 'Soft Green',
        '#FECACA': 'Soft Red',

        // Button colors
        '#3B82F6': 'Blue',
        '#22C55E': 'Green',
        '#EF4444': 'Red',
    };

    return colorMap[color] || color;
};

// Default color settings
export const DEFAULT_COLORS: ColorSettings = {
    backgroundColor: '#FFFFFF',
    questionColor: '#1E293B',
    labelColor: '#475569',
    emojiBackgroundColor: '#EFF6FF',
    emojiHoverColor: '#DBEAFE',
    emojiActiveColor: '#BFDBFE',
    nextButtonTextColor: '#FFFFFF',
    nextButtonBgColor: '#3B82F6',
};

export const DEFAULT_POSITION: AlignmentSetting = {
    borderRadius: '8px',
    padding: '16px',
    placement: 'bottom-right',
};
