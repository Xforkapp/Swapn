import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Tag, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getItemById, getUserById } from '@/data/mock';

const rankColors: Record<string, string> = {
    S: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white',
    A: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white',
    B: 'bg-gradient-to-r from-emerald-400 to-green-500 text-white',
    C: 'bg-gradient-to-r from-slate-400 to-gray-500 text-white',
};

const rankLabels: Record<string, string> = {
    S: '最高ランク',
    A: '高ランク',
    B: '標準ランク',
    C: '一般ランク',
};

export default function ItemDetail() {
    const { itemId } = useParams<{ itemId: string }>();
    const navigate = useNavigate();
    const item = getItemById(itemId ?? '');
    const owner = item ? getUserById(item.ownerId) : undefined;

    if (!item) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-center">
                    <p className="text-base font-semibold text-slate-700">アイテムが見つかりません</p>
                    <Button variant="ghost" onClick={() => navigate(-1)} className="mt-3">
                        戻る
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Hero Image */}
            <div className="relative flex-shrink-0">
                <motion.img
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    src={item.image}
                    alt={item.title}
                    className="w-full aspect-square object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-3 left-3 w-9 h-9 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                </button>

                {/* Rank badge */}
                <div className="absolute top-3 right-3">
                    <Badge className={`${rankColors[item.rank]} text-sm px-3 py-1 font-bold shadow-lg border-0`}>
                        ランク {item.rank}
                    </Badge>
                </div>
            </div>

            {/* Details */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex-1 overflow-y-auto"
            >
                <div className="px-5 pt-4 pb-6">
                    {/* Title & Price */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                        <h1 className="text-xl font-bold text-slate-800">{item.title}</h1>
                        <div className="flex items-center gap-1 bg-primary/5 rounded-xl px-3 py-1.5 flex-shrink-0">
                            <Tag className="w-3.5 h-3.5 text-primary" />
                            <span className="text-sm font-bold text-primary">¥{item.estimatedPrice.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{item.description}</p>

                    {/* Rank info card */}
                    <div className="bg-slate-50 rounded-2xl p-3.5 mb-4">
                        <div className="flex items-center gap-2.5 mb-2">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${rankColors[item.rank]}`}>
                                <Star className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-700">取引ランク {item.rank}</p>
                                <p className="text-[10px] text-muted-foreground">{rankLabels[item.rank]}</p>
                            </div>
                        </div>
                    </div>

                    {/* Owner info */}
                    {owner && (
                        <div className="bg-slate-50 rounded-2xl p-3.5 mb-4">
                            <p className="text-[10px] text-muted-foreground mb-2 font-medium">出品者</p>
                            <div className="flex items-center gap-3">
                                <img
                                    src={owner.avatar}
                                    alt={owner.name}
                                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-slate-800 truncate">{owner.name}</p>
                                    <div className="flex items-center gap-1 mt-0.5">
                                        <Shield className="w-3 h-3 text-emerald-500" />
                                        <span className="text-[10px] text-emerald-600 font-medium">信頼スコア {owner.trustScore}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action button */}
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-5 rounded-2xl text-base shadow-lg">
                        交換をリクエスト
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
