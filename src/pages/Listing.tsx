import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Tag, FileText, Star, CheckCircle, ImagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Rank = 'S' | 'A' | 'B' | 'C';

const rankOptions: { value: Rank; label: string; desc: string; color: string }[] = [
    { value: 'S', label: 'S', desc: '最高ランク', color: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white' },
    { value: 'A', label: 'A', desc: '高ランク', color: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' },
    { value: 'B', label: 'B', desc: '標準ランク', color: 'bg-gradient-to-r from-emerald-400 to-green-500 text-white' },
    { value: 'C', label: 'C', desc: '一般ランク', color: 'bg-gradient-to-r from-slate-400 to-gray-500 text-white' },
];

export default function Listing() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [rank, setRank] = useState<Rank>('B');
    const [imageUrl, setImageUrl] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const canSubmit = title.trim() && description.trim() && price.trim();

    const handleSubmit = () => {
        if (!canSubmit) return;
        // In real app: save to backend/localStorage
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setTitle('');
            setDescription('');
            setPrice('');
            setRank('B');
            setImageUrl('');
        }, 2000);
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="px-5 pt-5 pb-3 flex-shrink-0">
                <h1 className="text-lg font-bold text-slate-800">アイテムを出品</h1>
                <p className="text-xs text-muted-foreground mt-0.5">交換に出したいアイテムの情報を入力してください</p>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-y-auto px-5 pb-6">
                {/* Image area */}
                <div className="mb-4">
                    <label className="text-[11px] font-semibold text-slate-600 mb-1.5 block">
                        <Camera className="w-3 h-3 inline mr-1" />
                        写真
                    </label>
                    {imageUrl ? (
                        <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                            <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                            <button
                                onClick={() => setImageUrl('')}
                                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center text-xs backdrop-blur-sm"
                            >
                                ✕
                            </button>
                        </div>
                    ) : (
                        <div className="border-2 border-dashed border-slate-200 rounded-2xl aspect-[4/3] flex flex-col items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                            <ImagePlus className="w-8 h-8 text-slate-300" />
                            <p className="text-[11px] text-muted-foreground">タップして写真を追加</p>
                            <input
                                type="text"
                                placeholder="画像URLを入力"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className="mt-1 w-3/4 text-center text-[11px] px-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
                            />
                        </div>
                    )}
                </div>

                {/* Title */}
                <div className="mb-3">
                    <label className="text-[11px] font-semibold text-slate-600 mb-1.5 block">
                        <Tag className="w-3 h-3 inline mr-1" />
                        タイトル
                    </label>
                    <input
                        type="text"
                        placeholder="例: ヴィンテージ腕時計"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all"
                    />
                </div>

                {/* Description */}
                <div className="mb-3">
                    <label className="text-[11px] font-semibold text-slate-600 mb-1.5 block">
                        <FileText className="w-3 h-3 inline mr-1" />
                        説明
                    </label>
                    <textarea
                        placeholder="アイテムの状態や特徴を記載してください"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all resize-none"
                    />
                </div>

                {/* Price */}
                <div className="mb-4">
                    <label className="text-[11px] font-semibold text-slate-600 mb-1.5 block">
                        推定価格
                    </label>
                    <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium">¥</span>
                        <input
                            type="number"
                            placeholder="10000"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full text-sm pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all"
                        />
                    </div>
                </div>

                {/* Rank selector */}
                <div className="mb-5">
                    <label className="text-[11px] font-semibold text-slate-600 mb-2 block">
                        <Star className="w-3 h-3 inline mr-1" />
                        ランク
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                        {rankOptions.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => setRank(opt.value)}
                                className={`relative rounded-xl py-2.5 text-center transition-all duration-200 ${rank === opt.value
                                    ? `${opt.color} shadow-md scale-105`
                                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                    }`}
                            >
                                <p className="text-sm font-bold">{opt.label}</p>
                                <p className={`text-[8px] mt-0.5 ${rank === opt.value ? 'opacity-80' : 'text-slate-400'}`}>
                                    {opt.desc}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Submit */}
                <AnimatePresence mode="wait">
                    {submitted ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex items-center justify-center gap-2 py-4 bg-emerald-50 rounded-2xl"
                        >
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                            <span className="text-sm font-semibold text-emerald-700">出品しました！</span>
                        </motion.div>
                    ) : (
                        <motion.div key="button" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <Button
                                onClick={handleSubmit}
                                disabled={!canSubmit}
                                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-5 rounded-2xl text-base shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                出品する
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
