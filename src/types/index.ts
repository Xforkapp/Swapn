export type ContractStatus = 'none' | 'proposed' | 'agreed' | 'fulfilled';

export interface User {
    id: string;
    name: string;
    avatar: string;
    trustScore: number;
}

export interface Item {
    id: string;
    image: string;
    title: string;
    rank: 'S' | 'A' | 'B' | 'C';
    estimatedPrice: number;
    ownerId: string;
    description: string;
}

export interface Match {
    id: string;
    user1Id: string;
    user2Id: string;
    item1Id: string;
    item2Id: string;
    status: ContractStatus;
    contractDeposit?: number;
    contractTerms?: string;
    createdAt: string;
}

export type MessageType = 'text' | 'contract_request' | 'contract_agreed';

export interface Message {
    id: string;
    matchId: string;
    senderId: string;
    text: string;
    type: MessageType;
    timestamp: string;
    contractDeposit?: number;
    contractTerms?: string;
}
