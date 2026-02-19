import { useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform, animate, type PanInfo } from 'framer-motion';
import { Star, Repeat, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { getUserById, MY_ITEMS } from '@/data/mock';
import { useNavigate } from 'react-router-dom';

const rankColors: Record<string, string> = {
    S: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white',
    A: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white',
    B: 'bg-gradient-to-r from-emerald-400 to-green-500 text-white',
    C: 'bg-gradient-to-r from-slate-400 to-gray-500 text-white',
};

export default function Home() {
    const { availableItems, markItemSwiped, addMatch, addMessage } = useApp();
    const [showMatch, setShowMatch] = useState(false);
    const [matchUserName, setMatchUserName] = useState('');
    const [matchItemTitle, setMatchItemTitle] = useState('');
    const [currentMatchId, setCurrentMatchId] = useState('');
    const [selectedMyItemIndex, setSelectedMyItemIndex] = useState(0);
    const navigate = useNavigate();

    const selectedMyItem = MY_ITEMS[selectedMyItemIndex];

    const handleSwipe = useCallback((direction: 'left' | 'right', itemId: string) => {
        const item = availableItems.find((i) => i.id === itemId);
        if (!item) return;

        markItemSwiped(itemId);

        if (direction === 'right') {
            // 30% match probability
            if (Math.random() < 0.3) {
                const user = getUserById(item.ownerId);
                const match = addMatch(item.ownerId, item.id, selectedMyItem.id);
                setMatchUserName(user?.name ?? '誰か');
                setMatchItemTitle(item.title);
                setCurrentMatchId(match.id);
                setShowMatch(true);

                // Auto-generate a greeting from the other user
                setTimeout(() => {
                    addMessage(match.id, item.ownerId, `こんにちは！${item.title}をぜひ交換しましょう！🎉`, 'text');
                }, 500);
            }
        }
    }, [availableItems, markItemSwiped, addMatch, addMessage, selectedMyItem.id]);

    const goToChat = () => {
        setShowMatch(false);
        navigate(`/chat/${currentMatchId}`);
    };

    const cycleMyItem = () => {
        setSelectedMyItemIndex((prev) => (prev + 1) % MY_ITEMS.length);
    };

    return (
        <div className="h-full flex flex-col">
            {/* Card Stack */}
            <div className="flex-1 relative flex items-center justify-center px-3 pt-2 pb-1 min-h-0">
                {availableItems.length === 0 ? (
                    <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-primary/5 mx-auto mb-3 flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-accent" />
                        </div>
                        <p className="text-base font-semibold text-slate-700">すべてチェック済み！</p>
                        <p className="text-xs text-muted-foreground mt-1">新しいアイテムが追加されるのをお待ちください</p>
                    </div>
                ) : (
                    <div className="relative w-full h-full">
                        {availableItems.slice(0, 3).map((item, index) => (
                            <SwipeCard
                                key={item.id}
                                item={item}
                                index={index}
                                total={Math.min(availableItems.length, 3)}
                                onSwipe={handleSwipe}
                                onTap={(id) => navigate(`/item/${id}`)}
                            />
                        )).reverse()}
                    </div>
                )}
            </div>

            {/* My Item Circle — replaces Like/Pass buttons */}
            {availableItems.length > 0 && (
                <div className="flex flex-col items-center pb-2 pt-1 flex-shrink-0">
                    <motion.button
                        onClick={cycleMyItem}
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                        className="relative group"
                    >
                        {/* Outer ring glow */}
                        <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-sm group-hover:blur-md transition-all" />
                        {/* Circle image */}
                        <div className="relative w-14 h-14 rounded-full overflow-hidden border-3 border-white shadow-lg">
                            <motion.img
                                key={selectedMyItem.id}
                                initial={{ scale: 1.2, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.25 }}
                                src={selectedMyItem.image}
                                alt={selectedMyItem.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Cycle indicator */}
                        <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center">
                            <Repeat className="w-2.5 h-2.5 text-primary" />
                        </div>
                    </motion.button>
                    <p className="text-[10px] text-muted-foreground mt-1.5 font-medium">{selectedMyItem.title}</p>
                </div>
            )}

            {/* Match Overlay */}
            {showMatch && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 z-50 flex items-center justify-center"
                >
                    <div className="absolute inset-0 bg-primary/90 backdrop-blur-md" />
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }}
                        className="relative text-center px-8"
                    >
                        <motion.div
                            initial={{ rotate: -10, scale: 0 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                            className="mb-6"
                        >
                            <div className="inline-flex items-center gap-2 bg-accent/20 rounded-full px-6 py-3">
                                <Star className="w-6 h-6 text-accent" fill="#C9A84C" />
                                <span className="text-accent font-bold text-lg">マッチング成立！</span>
                                <Star className="w-6 h-6 text-accent" fill="#C9A84C" />
                            </div>
                        </motion.div>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-white text-xl font-semibold mb-2"
                        >
                            {matchUserName}
                        </motion.p>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-white/70 mb-3"
                        >
                            <span className="text-accent font-semibold">{matchItemTitle}</span> を交換したい！
                        </motion.p>
                        <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="mb-8 flex items-center justify-center gap-3"
                        >
                            <div className="bg-white/10 rounded-xl px-3 py-2 text-center">
                                <img src={selectedMyItem.image} className="w-12 h-12 rounded-lg object-cover mx-auto mb-1" alt="" />
                                <p className="text-white/80 text-[10px]">{selectedMyItem.title}</p>
                            </div>
                            <Repeat className="w-5 h-5 text-accent" />
                            <div className="bg-white/10 rounded-xl px-3 py-2 text-center">
                                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mx-auto mb-1">
                                    <Sparkles className="w-5 h-5 text-accent" />
                                </div>
                                <p className="text-white/80 text-[10px]">{matchItemTitle}</p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="flex flex-col gap-3"
                        >
                            <Button
                                onClick={goToChat}
                                className="bg-accent hover:bg-accent/90 text-primary font-semibold text-base py-6 rounded-2xl shadow-lg"
                            >
                                チャットを始める 💬
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => setShowMatch(false)}
                                className="text-white/60 hover:text-white hover:bg-white/10"
                            >
                                スワイプを続ける
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}

function SwipeCard({
    item,
    index,
    total,
    onSwipe,
    onTap,
}: {
    item: { id: string; image: string; title: string; rank: string; estimatedPrice: number; ownerId: string; description: string };
    index: number;
    total: number;
    onSwipe: (dir: 'left' | 'right', id: string) => void;
    onTap: (id: string) => void;
}) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const likeOpacity = useTransform(x, [0, 100], [0, 1]);
    const passOpacity = useTransform(x, [-100, 0], [1, 0]);

    const isTop = index === total - 1;
    const scale = 1 - (total - 1 - index) * 0.04;
    const yOffset = (total - 1 - index) * 8;

    const owner = getUserById(item.ownerId);

    const handleDragEnd = (_: unknown, info: PanInfo) => {
        const threshold = 100;
        if (Math.abs(info.offset.x) > threshold) {
            const direction = info.offset.x > 0 ? 'right' : 'left';
            animate(x, info.offset.x > 0 ? 500 : -500, {
                duration: 0.3,
                onComplete: () => onSwipe(direction, item.id),
            });
        } else {
            animate(x, 0, { type: 'spring', stiffness: 500, damping: 30 });
        }
    };

    return (
        <motion.div
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            style={{
                x: isTop ? x : 0,
                rotate: isTop ? rotate : 0,
                scale,
                y: yOffset,
                zIndex: index,
            }}
            drag={isTop ? 'x' : false}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.9}
            onDragEnd={isTop ? handleDragEnd : undefined}
            onTap={isTop ? () => onTap(item.id) : undefined}
        >
            <div className="w-full h-full rounded-3xl overflow-hidden shadow-xl bg-white border border-slate-100 relative">
                {/* Image */}
                <div className="absolute inset-0">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>

                {/* Like/Pass indicators */}
                {isTop && (
                    <>
                        <motion.div
                            style={{ opacity: likeOpacity }}
                            className="absolute top-8 left-6 z-10 border-4 border-green-400 rounded-xl px-4 py-2 -rotate-12"
                        >
                            <span className="text-green-400 font-extrabold text-3xl">LIKE</span>
                        </motion.div>
                        <motion.div
                            style={{ opacity: passOpacity }}
                            className="absolute top-8 right-6 z-10 border-4 border-rose-400 rounded-xl px-4 py-2 rotate-12"
                        >
                            <span className="text-rose-400 font-extrabold text-3xl">PASS</span>
                        </motion.div>
                    </>
                )}

                {/* Rank Badge */}
                <div className="absolute top-4 right-4 z-10">
                    <Badge className={`${rankColors[item.rank]} text-sm px-3 py-1 shadow-md font-bold`}>
                        ランク {item.rank}
                    </Badge>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    <div className="flex items-center gap-2 mb-2">
                        {owner && (
                            <img src={owner.avatar} className="w-7 h-7 rounded-full border-2 border-white/50" alt={owner.name} />
                        )}
                        <span className="text-white/80 text-xs">{owner?.name}</span>
                    </div>
                    <h3 className="text-white font-bold text-xl mb-1">{item.title}</h3>
                    <p className="text-white/60 text-xs mb-2 line-clamp-1">{item.description}</p>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm text-xs">
                            ¥{item.estimatedPrice.toLocaleString()}
                        </Badge>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
