import globalStore from '@/utils/indexedDB';
import type { GlobalState, Survey } from '~/types';

export const useGlobal = () => {
    const isCollapsed = useState('global-collapsed', () => false);
    const isMiniCollapsed = useState('global-mini-collapsed', () => false);
    const currentIndex = useState('current-index', () => 0);
    const survey = useState<Survey | null>('survey-data', () => null);

    // Initialize state from IndexedDB
    const initializeState = async () => {
        try {
            const savedState = await globalStore.getValue<GlobalState>('general');

            if (savedState) {
                isCollapsed.value = savedState.sidebarCollapsed ?? false;
                isMiniCollapsed.value = savedState.miniSidebarCollapsed ?? false;
                currentIndex.value = savedState.currentIndex ?? 0;
                survey.value = savedState.surveyData ?? null;
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
                surveyData: survey.value ? toRaw(survey.value) : null,
            };
            await globalStore.setValue('general', currentState);
        } catch (err) {
            console.error('Error saving state to IndexedDB:', err);
        }
    };

    const toggleSidebar = async () => {
        isCollapsed.value = !isCollapsed.value;
    };

    const toggleMiniSidebar = async () => {
        isMiniCollapsed.value = !isMiniCollapsed.value;
    };

    const updateSidebarState = async (state: boolean) => {
        isCollapsed.value = state;
    };

    const updateMiniSidebarState = async (state: boolean) => {
        isMiniCollapsed.value = state;
    };

    const updateCurrentIndex = async (index: number) => {
        currentIndex.value = index;
    };

    const setSurvey = (data: Partial<Survey> | null) => {
        if (data === null) {
            survey.value = null;
        } else {
            // Handle partial updates
            survey.value = {
                // If survey.value exists, spread its properties, otherwise use empty defaults
                ...(survey.value ?? {
                    email: '',
                    description: '',
                    type: 'popover', // assuming this is your default FeedbackTab type
                }),
                // Spread the new partial data to override existing values
                ...data,
            } as Survey;
        }
    };

    const clearStorage = () => {
        survey.value = null;
        // add any state your saving in the index DB here to clear it when we logout
    };

    // Watch for any state changes and save to IndexedDB
    watch([isCollapsed, isMiniCollapsed, survey, currentIndex], async () => {
        await saveState();
    });

    return {
        isCollapsed: readonly(isCollapsed),
        isMiniCollapsed: readonly(isMiniCollapsed),
        currentIndex: readonly(currentIndex),
        survey: readonly(survey),
        toggleSidebar,
        toggleMiniSidebar,
        setSurvey,
        updateSidebarState,
        updateMiniSidebarState,
        updateCurrentIndex,
        clearStorage,
    };
};
