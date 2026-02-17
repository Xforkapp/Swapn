import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { Match, Message, ContractStatus } from '@/types';
import {
    getMatches, saveMatches,
    getMessages, saveMessages,
    getSwipedItemIds, saveSwipedItemIds,
    generateId, MOCK_ITEMS,
} from '@/data/mock';

interface AppContextType {
    matches: Match[];
    messages: Message[];
    swipedItemIds: string[];
    availableItems: typeof MOCK_ITEMS;
    addMatch: (otherUserId: string, otherItemId: string, myItemId: string) => Match;
    addMessage: (matchId: string, senderId: string, text: string, type: Message['type'], contractDeposit?: number, contractTerms?: string) => void;
    updateMatchStatus: (matchId: string, status: ContractStatus, deposit?: number, terms?: string) => void;
    markItemSwiped: (itemId: string) => void;
    getMatchMessages: (matchId: string) => Message[];
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
    const [matches, setMatches] = useState<Match[]>(getMatches);
    const [messages, setMessages] = useState<Message[]>(getMessages);
    const [swipedItemIds, setSwipedItemIds] = useState<string[]>(getSwipedItemIds);

    useEffect(() => { saveMatches(matches); }, [matches]);
    useEffect(() => { saveMessages(messages); }, [messages]);
    useEffect(() => { saveSwipedItemIds(swipedItemIds); }, [swipedItemIds]);

    const availableItems = MOCK_ITEMS.filter((item) => !swipedItemIds.includes(item.id));

    const markItemSwiped = useCallback((itemId: string) => {
        setSwipedItemIds((prev) => [...prev, itemId]);
    }, []);

    const addMatch = useCallback((otherUserId: string, otherItemId: string, myItemId: string): Match => {
        const newMatch: Match = {
            id: generateId(),
            user1Id: 'user-me',
            user2Id: otherUserId,
            item1Id: myItemId,
            item2Id: otherItemId,
            status: 'none',
            createdAt: new Date().toISOString(),
        };
        setMatches((prev) => [...prev, newMatch]);
        return newMatch;
    }, []);

    const addMessage = useCallback((
        matchId: string,
        senderId: string,
        text: string,
        type: Message['type'],
        contractDeposit?: number,
        contractTerms?: string,
    ) => {
        const newMsg: Message = {
            id: generateId(),
            matchId,
            senderId,
            text,
            type,
            timestamp: new Date().toISOString(),
            contractDeposit,
            contractTerms,
        };
        setMessages((prev) => [...prev, newMsg]);
    }, []);

    const updateMatchStatus = useCallback((matchId: string, status: ContractStatus, deposit?: number, terms?: string) => {
        setMatches((prev) =>
            prev.map((m) =>
                m.id === matchId ? { ...m, status, contractDeposit: deposit ?? m.contractDeposit, contractTerms: terms ?? m.contractTerms } : m
            )
        );
    }, []);

    const getMatchMessages = useCallback((matchId: string) => {
        return messages.filter((m) => m.matchId === matchId);
    }, [messages]);

    return (
        <AppContext.Provider value={{
            matches, messages, swipedItemIds, availableItems,
            addMatch, addMessage, updateMatchStatus, markItemSwiped, getMatchMessages,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useApp must be used within AppProvider');
    return ctx;
}
