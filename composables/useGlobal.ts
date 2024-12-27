import globalStore from '@/utils/indexedDB';
import { DEFAULT_COLORS } from '~/constants/colors';
import type { ColorSettings, GlobalState, Survey } from '~/types';
import type { Question } from '~/types/survey';

// Simple JSON-based clone function
const safeClone = <T>(obj: T): T => {
    if (!obj) return obj;
    return JSON.parse(JSON.stringify(obj));
};

export const useGlobal = () => {
    const isCollapsed = useState('global-collapsed', () => false);
    const isMiniCollapsed = useState('global-mini-collapsed', () => false);
    const currentIndex = useState('current-index', () => 0);
    const survey = useState<Survey | null>('survey-data', () => null);
    const activeQuestion = useState<Question | null>('active-question', () => null);
    const colors = useState<ColorSettings>('color-settings', () => ({ ...DEFAULT_COLORS }));

    // Initialize state from IndexedDB
    const initializeState = async () => {
        try {
            const savedState = await globalStore.getValue<GlobalState>('general');

            if (savedState) {
                isCollapsed.value = savedState.sidebarCollapsed ?? false;
                isMiniCollapsed.value = savedState.miniSidebarCollapsed ?? false;
                currentIndex.value = savedState.currentIndex ?? 0;
                colors.value = savedState.colors
                    ? { ...DEFAULT_COLORS, ...safeClone(savedState.colors) }
                    : { ...DEFAULT_COLORS };

                if (savedState.surveyData) {
                    survey.value = safeClone(savedState.surveyData);
                    activeQuestion.value = savedState.surveyData.questions[0]
                        ? safeClone(savedState.surveyData.questions[0])
                        : null;
                }
            }
        } catch (err) {
            console.error('Error loading state from IndexedDB:', err);
        }
    };

    initializeState();

    // Save entire state to IndexedDB
    const saveState = async () => {
        try {
            const currentState: GlobalState = {
                sidebarCollapsed: isCollapsed.value,
                miniSidebarCollapsed: isMiniCollapsed.value,
                currentIndex: currentIndex.value,
                surveyData: survey.value ? safeClone(toRaw(survey.value)) : null,
                activeQuestion: activeQuestion.value ? safeClone(toRaw(activeQuestion.value)) : null,
                colors: safeClone(toRaw(colors.value)),
            };
            await globalStore.setValue('general', currentState);
        } catch (err) {
            console.error('Error saving state to IndexedDB:', err);
        }
    };

    const setActiveQuestion = (question: Question) => {
        activeQuestion.value = safeClone(toRaw(question));
    };

    const setSurvey = (data: Partial<Survey> | null) => {
        if (data === null) {
            survey.value = null;
            activeQuestion.value = null;
            return;
        }

        const plainData = safeClone(toRaw(data));

        survey.value = {
            ...(survey.value ?? {
                email: '',
                description: '',
                type: 'popover',
            }),
            ...plainData,
        } as Survey;

        // If questions are being updated and there's no active question,
        // set the first question as active
        if (plainData.questions && !activeQuestion.value) {
            activeQuestion.value = safeClone(plainData.questions[0]);
        }
    };

    const toggleSidebar = () => {
        isCollapsed.value = !isCollapsed.value;
    };

    const toggleMiniSidebar = () => {
        isMiniCollapsed.value = !isMiniCollapsed.value;
    };

    const updateSidebarState = (state: boolean) => {
        isCollapsed.value = state;
    };

    const updateMiniSidebarState = (state: boolean) => {
        isMiniCollapsed.value = state;
    };

    const updateCurrentIndex = (index: number) => {
        currentIndex.value = index;
    };

    // New function to update colors partially
    const setColors = (newColors: Partial<ColorSettings>) => {
        colors.value = {
            ...colors.value,
            ...safeClone(toRaw(newColors)),
        };
    };

    // Reset colors to defaults
    const resetColors = () => {
        colors.value = { ...DEFAULT_COLORS };
    };

    const clearStorage = () => {
        survey.value = null;
        activeQuestion.value = null;
    };

    // Watch for state changes and save to IndexedDB
    watch(
        [isCollapsed, isMiniCollapsed, survey, currentIndex, activeQuestion, colors],
        async () => {
            await saveState();
        },
        { deep: true }
    );

    return {
        isCollapsed: readonly(isCollapsed),
        isMiniCollapsed: readonly(isMiniCollapsed),
        currentIndex: readonly(currentIndex),
        colors: readonly(colors),
        setColors,
        resetColors,
        survey,
        activeQuestion,
        toggleSidebar,
        toggleMiniSidebar,
        setSurvey,
        updateSidebarState,
        updateMiniSidebarState,
        updateCurrentIndex,
        setActiveQuestion,
        clearStorage,
    };
};
