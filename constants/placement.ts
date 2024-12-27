import type { FeedbackTab, Placement } from '~/types';

export const placementConfigs = (
    type?: FeedbackTab
): {
    placement: Placement;
    availablePlacements: Placement[];
} => {
    switch (type) {
        case 'popover':
            return {
                placement: 'bottom-right',
                availablePlacements: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
            };
        case 'button':
            return {
                placement: 'right',
                availablePlacements: ['left', 'right'],
            };
        case 'bubble':
            return {
                placement: 'bottom-right',
                availablePlacements: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
            };
        case 'embedded':
            return {
                placement: 'bottom-right',
                availablePlacements: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
            };
        case 'fullScreen':
            return {
                placement: 'center',
                availablePlacements: ['center'],
            };
        case 'link':
            return {
                placement: 'center',
                availablePlacements: ['center'],
            };
        default:
            return {
                placement: 'bottom-right',
                availablePlacements: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
            };
    }
};
