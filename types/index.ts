import type { Question, SurveyData } from './survey';

// types.ts
export type PopoverPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
export type SidePlacement = 'left' | 'right';
export type FeedbackTab = 'popover' | 'button' | 'bubble' | 'embedded' | 'fullScreen' | 'link';
export type DeviceType = 'desktop' | 'mobile' | 'tablet';

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

export interface Survey extends SurveyData {
    email: string;
    description: string;
    type: FeedbackTab;
}

export interface ColorSettings {
    backgroundColor: string;
    questionColor: string;
    labelColor: string;
    emojiBackgroundColor: string;
    emojiHoverColor: string;
    emojiActiveColor: string;
    nextButtonTextColor: string;
    nextButtonBgColor: string;
}

export interface AlignmentSetting {
    borderRadius: string;
    padding: string;
    placement: Placement;
}

export interface Targeting {
    devices: DeviceType[];
    pageType: 'all' | 'specific';
    userType: 'all' | 'specific';
    trafficCoverage: number;
}

export interface Behavior {
    reuseBehavior: boolean;
    timing: 'immediate' | 'delay' | 'abandon' | 'scroll';
    frequency: 'untilSubmit' | 'once' | 'always';
    includeScreenshot: boolean;
}

interface BaseChannel {
    sendScreenshot?: boolean;
    sendMetadata?: boolean;
}

export interface SlackConfig extends BaseChannel {
    channel: string;
}

export interface TeamsConfig extends BaseChannel {
    channel: string;
}

export interface WebhookConfig {
    url: string;
    method: 'POST' | 'PUT';
    headers: Record<string, string>;
}

export interface EmailConfig {
    recipients: string;
    subject: string;
    includeMetadata: boolean;
}

export interface ApiConfig {
    endpoint: string;
    apiKey: string;
    format: 'JSON' | 'XML';
}

export interface ZapierConfig {
    zapId: string;
    triggerUrl: string;
}

export interface ExcelConfig {
    spreadsheetId: string;
    sheetName: string;
    autoCreate: boolean;
}

export interface TrelloConfig {
    boardId: string;
    listId: string;
    labels: string[];
}

export interface MiroConfig {
    boardId: string;
    frameId: string;
}

export interface ForwardResponse {
    enabled: boolean;
    integrations: {
        slack?: SlackConfig;
        teams?: TeamsConfig;
        webhooks?: WebhookConfig;
        email?: EmailConfig;
        responsesApi?: ApiConfig;
        zapier?: ZapierConfig;
        excel?: ExcelConfig;
        trello?: TrelloConfig;
        miro?: MiroConfig;
    };
    // Global settings that apply to all enabled integrations
    globalSettings?: {
        includeUserMetadata: boolean;
        includeBrowserInfo: boolean;
        includeTimestamp: boolean;
        includePageUrl: boolean;
    };
}

export interface SurveySettings {
    targeting: Targeting;
    behavior: Behavior;
    forwardResponse: ForwardResponse;
}

export interface GlobalState {
    sidebarCollapsed: boolean;
    miniSidebarCollapsed: boolean;
    surveyData: Survey | null;
    currentIndex: number;
    activeQuestion: Question | null;
    colors: ColorSettings;
    position: AlignmentSetting;
    surveySettings: Partial<SurveySettings> | null;
}

export interface Color {
    id: string;
    name: string;
    value: string;
}

export type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'custom';
export type Padding = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'custom';
