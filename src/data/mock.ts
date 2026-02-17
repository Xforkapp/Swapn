import type { User, Item, Match, Message } from '@/types';

export const CURRENT_USER: User = {
    id: 'user-me',
    name: '田中 ゆうと',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    trustScore: 80,
};

export const MOCK_USERS: User[] = [
    CURRENT_USER,
    {
        id: 'user-1',
        name: '山田 さくら',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
        trustScore: 92,
    },
    {
        id: 'user-2',
        name: '佐藤 けんじ',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
        trustScore: 75,
    },
    {
        id: 'user-3',
        name: '鈴木 みな',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
        trustScore: 88,
    },
    {
        id: 'user-4',
        name: '伊藤 はると',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
        trustScore: 65,
    },
];

export const MOCK_ITEMS: Item[] = [
    {
        id: 'item-1',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=800&fit=crop',
        title: 'プレミアム腕時計',
        rank: 'A',
        estimatedPrice: 35000,
        ownerId: 'user-1',
        description: 'レザーストラップ付きのミニマルなデザイン腕時計',
    },
    {
        id: 'item-2',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=800&fit=crop',
        title: 'ワイヤレスヘッドホン',
        rank: 'B',
        estimatedPrice: 18000,
        ownerId: 'user-2',
        description: '高品質ノイズキャンセリングヘッドホン',
    },
    {
        id: 'item-3',
        image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=800&fit=crop',
        title: 'ポラロイドカメラ',
        rank: 'A',
        estimatedPrice: 25000,
        ownerId: 'user-3',
        description: '完動品のヴィンテージインスタントカメラ',
    },
    {
        id: 'item-4',
        image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&h=800&fit=crop',
        title: 'デザイナーサングラス',
        rank: 'S',
        estimatedPrice: 42000,
        ownerId: 'user-4',
        description: '限定コラボのアビエーターサングラス',
    },
    {
        id: 'item-5',
        image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=800&fit=crop',
        title: 'ランニングシューズ',
        rank: 'B',
        estimatedPrice: 15000,
        ownerId: 'user-1',
        description: 'ほぼ新品のプレミアムランニングシューズ 27cm',
    },
    {
        id: 'item-6',
        image: 'https://images.unsplash.com/photo-1434056886845-dbe89f0b9571?w=600&h=800&fit=crop',
        title: 'ヴィンテージギター',
        rank: 'S',
        estimatedPrice: 68000,
        ownerId: 'user-2',
        description: '温かみのある音色のアコースティックギター',
    },
    {
        id: 'item-7',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop',
        title: 'レトロスニーカー',
        rank: 'A',
        estimatedPrice: 22000,
        ownerId: 'user-3',
        description: '限定カラーのクラシックレトロスニーカー',
    },
    {
        id: 'item-8',
        image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=600&h=800&fit=crop',
        title: 'メカニカルキーボード',
        rank: 'B',
        estimatedPrice: 12000,
        ownerId: 'user-4',
        description: 'Cherry MXスイッチ搭載カスタムキーボード',
    },
    {
        id: 'item-9',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop',
        title: 'レザーバッグ',
        rank: 'A',
        estimatedPrice: 30000,
        ownerId: 'user-1',
        description: 'ハンドメイドのイタリアンレザーメッセンジャーバッグ',
    },
    {
        id: 'item-10',
        image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=800&fit=crop',
        title: '限定スニーカー',
        rank: 'S',
        estimatedPrice: 55000,
        ownerId: 'user-3',
        description: 'レアコラボスニーカー・新品未使用',
    },
];

export const MY_ITEMS: Item[] = [
    {
        id: 'my-item-1',
        image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&h=800&fit=crop',
        title: 'ヴィンテージバックパック',
        rank: 'A',
        estimatedPrice: 20000,
        ownerId: 'user-me',
        description: 'キャンバス&レザーのヴィンテージリュック',
    },
    {
        id: 'my-item-2',
        image: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600&h=800&fit=crop',
        title: 'スマートウォッチ',
        rank: 'B',
        estimatedPrice: 28000,
        ownerId: 'user-me',
        description: 'フィットネス機能付きスマートウォッチ・美品',
    },
    {
        id: 'my-item-3',
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=800&fit=crop',
        title: 'スタジオヘッドホン',
        rank: 'A',
        estimatedPrice: 32000,
        ownerId: 'user-me',
        description: 'プロ仕様のスタジオモニタリングヘッドホン',
    },
];

// localStorage helpers
const STORAGE_KEYS = {
    matches: 'trustbarter_matches',
    messages: 'trustbarter_messages',
    swipedItems: 'trustbarter_swiped',
} as const;

export function getMatches(): Match[] {
    const data = localStorage.getItem(STORAGE_KEYS.matches);
    return data ? JSON.parse(data) : [];
}

export function saveMatches(matches: Match[]) {
    localStorage.setItem(STORAGE_KEYS.matches, JSON.stringify(matches));
}

export function getMessages(): Message[] {
    const data = localStorage.getItem(STORAGE_KEYS.messages);
    return data ? JSON.parse(data) : [];
}

export function saveMessages(messages: Message[]) {
    localStorage.setItem(STORAGE_KEYS.messages, JSON.stringify(messages));
}

export function getSwipedItemIds(): string[] {
    const data = localStorage.getItem(STORAGE_KEYS.swipedItems);
    return data ? JSON.parse(data) : [];
}

export function saveSwipedItemIds(ids: string[]) {
    localStorage.setItem(STORAGE_KEYS.swipedItems, JSON.stringify(ids));
}

export function getUserById(id: string): User | undefined {
    return MOCK_USERS.find((u) => u.id === id);
}

export function getItemById(id: string): Item | undefined {
    return [...MOCK_ITEMS, ...MY_ITEMS].find((i) => i.id === id);
}

export function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
