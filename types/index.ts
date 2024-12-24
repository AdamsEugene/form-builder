// types.ts
export type PopoverPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
export type SidePlacement = 'left' | 'right';
export type FeedbackTab = 'popover' | 'button' | 'bubble' | 'embedded' | 'fullScreen' | 'link';

// Create separate props interfaces for each type
interface BaseProps {
    modelValue?: boolean;
    backgroundColor?: string;
    textColor?: string;
    width?: string;
    height?: string;
    borderRadius?: string;
    offset?: string;
    showIcon?: boolean;
    contentWidth?: string;
}

export interface PopoverProps extends BaseProps {
    type: 'popover';
    placement?: PopoverPlacement;
}

export interface ButtonProps extends BaseProps {
    type: 'button';
    placement?: SidePlacement;
}

export interface OtherProps extends BaseProps {
    type: 'bubble' | 'embedded' | 'fullScreen' | 'link';
}

export type Placement = SidePlacement | PopoverPlacement;

export interface Survey {
    email: string;
    description: string;
    type: FeedbackTab;
}

export interface GlobalState {
    sidebarCollapsed: boolean;
    miniSidebarCollapsed: boolean;
    surveyData: Survey | null;
}
