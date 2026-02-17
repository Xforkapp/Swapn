import { useApp } from '@/context/AppContext';
import { getUserById, getItemById } from '@/data/mock';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ChatList() {
    const { matches, messages } = useApp();
    const navigate = useNavigate();

    const getLastMessage = (matchId: string) => {
        const matchMsgs = messages.filter((m) => m.matchId === matchId);
        return matchMsgs[matchMsgs.length - 1];
    };

    const statusLabels: Record<string, { label: string; color: string }> = {
        none: { label: '新規', color: 'bg-blue-100 text-blue-700' },
        proposed: { label: '契約提案中', color: 'bg-amber-100 text-amber-700' },
        agreed: { label: '契約成立', color: 'bg-emerald-100 text-emerald-700' },
        fulfilled: { label: '履行済み', color: 'bg-primary/10 text-primary' },
    };

    return (
        <div className="h-full flex flex-col">
            <div className="px-5 pt-6 pb-3">
                <h1 className="text-2xl font-bold text-primary tracking-tight">メッセージ</h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                    {matches.length}件の会話
                </p>
            </div>

            <div className="flex-1 overflow-y-auto">
                {matches.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full px-8">
                        <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mb-4">
                            <MessageSquare className="w-8 h-8 text-primary/40" />
                        </div>
                        <p className="text-slate-700 font-semibold text-lg">マッチングなし</p>
                        <p className="text-sm text-muted-foreground text-center mt-1">
                            スワイプしてアイテムを見つけ、交換相手とマッチしよう！
                        </p>
                    </div>
                ) : (
                    <div className="px-3">
                        {matches.map((match) => {
                            const otherUserId = match.user1Id === 'user-me' ? match.user2Id : match.user1Id;
                            const user = getUserById(otherUserId);
                            const item = getItemById(match.item2Id);
                            const lastMsg = getLastMessage(match.id);
                            const status = statusLabels[match.status] || statusLabels.none;

                            return (
                                <button
                                    key={match.id}
                                    onClick={() => navigate(`/chat/${match.id}`)}
                                    className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors text-left"
                                >
                                    <div className="relative flex-shrink-0">
                                        <img
                                            src={user?.avatar}
                                            alt={user?.name}
                                            className="w-14 h-14 rounded-full object-cover border-2 border-slate-100"
                                        />
                                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <span className="font-semibold text-sm text-slate-800">{user?.name}</span>
                                            <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
                                        </div>
                                        <p className="text-xs text-muted-foreground truncate mb-1">
                                            {lastMsg?.type === 'contract_request'
                                                ? '📋 契約案を送信しました'
                                                : lastMsg?.type === 'contract_agreed'
                                                    ? '✅ 契約が成立しました！'
                                                    : lastMsg?.text ?? `交換: ${item?.title}`}
                                        </p>
                                        <Badge className={`${status.color} text-[10px] border-0 font-medium px-2 py-0`}>
                                            {status.label}
                                        </Badge>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
