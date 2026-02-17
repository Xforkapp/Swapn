import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, FileText, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useApp } from '@/context/AppContext';
import { getUserById, getItemById } from '@/data/mock';
import ContractCard from '@/components/ContractCard';
import confetti from 'canvas-confetti';

export default function ChatRoom() {
    const { matchId } = useParams<{ matchId: string }>();
    const navigate = useNavigate();
    const { matches, getMatchMessages, addMessage, updateMatchStatus } = useApp();
    const [input, setInput] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    const match = matches.find((m) => m.id === matchId);
    const messages = getMatchMessages(matchId ?? '');

    const otherUserId = match ? (match.user1Id === 'user-me' ? match.user2Id : match.user1Id) : '';
    const otherUser = getUserById(otherUserId);
    const tradingItem = match ? getItemById(match.item2Id) : undefined;
    const myItem = match ? getItemById(match.item1Id) : undefined;

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages.length]);

    const sendMessage = () => {
        if (!input.trim() || !matchId) return;
        addMessage(matchId, 'user-me', input.trim(), 'text');
        setInput('');

        // Mock reply after 1s
        setTimeout(() => {
            const replies = [
                "いいですね！ぜひ交換しましょう🤝",
                "興味あります！もう少し詳しく教えてください。",
                "これは公平な取引になりそうですね！",
                "なるほど、状態はどんな感じですか？",
                "まさに探していたものです！",
            ];
            addMessage(matchId, otherUserId, replies[Math.floor(Math.random() * replies.length)], 'text');
        }, 1000);
    };

    const createContract = () => {
        if (!matchId) return;
        const deposit = 2000;
        const terms = `「${myItem?.title ?? '自分のアイテム'}」と「${tradingItem?.title ?? '相手のアイテム'}」を交換 — 両アイテムとも良好な状態で確認済み。`;
        addMessage(matchId, 'user-me', '契約案を提示', 'contract_request', deposit, terms);
        updateMatchStatus(matchId, 'proposed', deposit, terms);
    };

    const agreeToContract = () => {
        if (!matchId) return;
        addMessage(matchId, otherUserId, '契約に合意しました！🎉', 'contract_agreed');
        updateMatchStatus(matchId, 'agreed');

        // Fire confetti!
        const duration = 3000;
        const end = Date.now() + duration;
        const colors = ['#C9A84C', '#1B2A4A', '#10b981', '#f59e0b'];

        const frame = () => {
            confetti({
                particleCount: 4,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.7 },
                colors,
            });
            confetti({
                particleCount: 4,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.7 },
                colors,
            });
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    };

    if (!match || !otherUser) {
        return (
            <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">チャットが見つかりません</p>
            </div>
        );
    }

    const statusConfig: Record<string, { label: string; color: string; icon: typeof Shield }> = {
        none: { label: '契約なし', color: 'bg-slate-100 text-slate-600', icon: FileText },
        proposed: { label: '契約提案中', color: 'bg-amber-100 text-amber-700', icon: FileText },
        agreed: { label: '契約成立', color: 'bg-emerald-100 text-emerald-700', icon: Shield },
        fulfilled: { label: '履行済み', color: 'bg-primary/10 text-primary', icon: Shield },
    };

    const status = statusConfig[match.status] || statusConfig.none;

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex-shrink-0 border-b border-slate-100 bg-white px-3 py-3">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="p-1" onClick={() => navigate('/chat')}>
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <img
                        src={otherUser.avatar}
                        alt={otherUser.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-primary/10"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-slate-800">{otherUser.name}</p>
                        <p className="text-[10px] text-muted-foreground truncate">交換: {tradingItem?.title} ↔ {myItem?.title}</p>
                    </div>
                </div>
            </div>

            {/* Contract Status Bar */}
            <div className="flex-shrink-0 px-4 py-2 bg-slate-50/80 border-b border-slate-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <status.icon className="w-3.5 h-3.5" />
                        <Badge className={`${status.color} border-0 text-[10px] font-medium`}>{status.label}</Badge>
                    </div>
                    {match.status === 'none' && (
                        <Button
                            size="sm"
                            onClick={createContract}
                            className="h-7 text-[10px] bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 rounded-lg shadow-sm"
                        >
                            <FileText className="w-3 h-3 mr-1" />
                            契約案を作成
                        </Button>
                    )}
                </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 px-4 py-3" ref={scrollRef}>
                <div className="space-y-3">
                    {messages.map((msg) => {
                        const isMine = msg.senderId === 'user-me';

                        if (msg.type === 'contract_request') {
                            return (
                                <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                                    <ContractCard
                                        deposit={msg.contractDeposit ?? 2000}
                                        terms={msg.contractTerms ?? ''}
                                        isMine={isMine}
                                        matchStatus={match.status}
                                        onAgree={agreeToContract}
                                    />
                                </div>
                            );
                        }

                        if (msg.type === 'contract_agreed') {
                            return (
                                <motion.div
                                    key={msg.id}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="flex justify-center"
                                >
                                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3 text-center">
                                        <Shield className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                                        <p className="text-xs font-bold text-emerald-700">契約成立</p>
                                        <p className="text-[10px] text-emerald-600 mt-0.5">履行待ち</p>
                                    </div>
                                </motion.div>
                            );
                        }

                        return (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${isMine
                                            ? 'bg-primary text-white rounded-br-md'
                                            : 'bg-slate-100 text-slate-800 rounded-bl-md'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </ScrollArea>

            {/* Input */}
            <div className="flex-shrink-0 border-t border-slate-100 bg-white px-3 py-3 safe-area-bottom">
                <div className="flex items-center gap-2">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="メッセージを入力..."
                        className="flex-1 bg-slate-100 rounded-2xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                    <Button
                        size="sm"
                        onClick={sendMessage}
                        disabled={!input.trim()}
                        className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 p-0 shadow-md"
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
