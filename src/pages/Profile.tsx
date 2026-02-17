import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';
import { CURRENT_USER, MY_ITEMS, getUserById, getItemById } from '@/data/mock';
import { Shield, Package, Star, TrendingUp } from 'lucide-react';

export default function Profile() {
    const { matches } = useApp();

    const agreedMatches = matches.filter((m) => m.status === 'agreed' || m.status === 'fulfilled');

    const rankColors: Record<string, string> = {
        S: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white',
        A: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white',
        B: 'bg-gradient-to-r from-emerald-400 to-green-500 text-white',
        C: 'bg-gradient-to-r from-slate-400 to-gray-500 text-white',
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="px-5 pt-6 pb-5 bg-gradient-to-b from-primary/5 to-transparent">
                <div className="flex items-center gap-4">
                    <img
                        src={CURRENT_USER.avatar}
                        alt={CURRENT_USER.name}
                        className="w-20 h-20 rounded-full object-cover border-3 border-accent/30 shadow-lg"
                    />
                    <div>
                        <h1 className="text-xl font-bold text-slate-800">{CURRENT_USER.name}</h1>
                        <p className="text-xs text-muted-foreground mt-0.5">2025年から利用</p>
                        <div className="flex items-center gap-1 mt-1">
                            <Star className="w-3.5 h-3.5 text-accent" fill="#C9A84C" />
                            <span className="text-xs font-medium text-accent">信頼されたトレーダー</span>
                        </div>
                    </div>
                </div>

                {/* Trust Score */}
                <Card className="mt-5 p-4 border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                        {/* Circular Progress */}
                        <div className="relative w-20 h-20 flex-shrink-0">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                <circle
                                    cx="50" cy="50" r="42"
                                    fill="none"
                                    stroke="#e2e8f0"
                                    strokeWidth="8"
                                />
                                <circle
                                    cx="50" cy="50" r="42"
                                    fill="none"
                                    stroke="url(#trustGradient)"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    strokeDasharray={`${CURRENT_USER.trustScore * 2.64} ${264 - CURRENT_USER.trustScore * 2.64}`}
                                />
                                <defs>
                                    <linearGradient id="trustGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#1B2A4A" />
                                        <stop offset="100%" stopColor="#C9A84C" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl font-bold text-primary">{CURRENT_USER.trustScore}</span>
                            </div>
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Shield className="w-4 h-4 text-primary" />
                                <span className="text-sm font-semibold text-slate-800">信頼スコア</span>
                            </div>
                            <p className="text-[11px] text-muted-foreground leading-relaxed">
                                信頼スコアは取引実績、評価、アクティビティに基づいて算出されます。
                            </p>
                            <div className="flex items-center gap-1 mt-2">
                                <TrendingUp className="w-3 h-3 text-emerald-500" />
                                <span className="text-[10px] text-emerald-600 font-medium">今月 +5%</span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Stats */}
            <div className="px-5 py-3 flex gap-3">
                <div className="flex-1 bg-primary/5 rounded-2xl p-3 text-center">
                    <p className="text-xl font-bold text-primary">{matches.length}</p>
                    <p className="text-[10px] text-muted-foreground">マッチ</p>
                </div>
                <div className="flex-1 bg-emerald-50 rounded-2xl p-3 text-center">
                    <p className="text-xl font-bold text-emerald-600">{agreedMatches.length}</p>
                    <p className="text-[10px] text-muted-foreground">契約</p>
                </div>
                <div className="flex-1 bg-accent/10 rounded-2xl p-3 text-center">
                    <p className="text-xl font-bold text-accent">{MY_ITEMS.length}</p>
                    <p className="text-[10px] text-muted-foreground">出品中</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex-1 px-5 pb-3 overflow-hidden">
                <Tabs defaultValue="items" className="h-full flex flex-col">
                    <TabsList className="w-full bg-slate-100 rounded-xl p-1">
                        <TabsTrigger value="items" className="flex-1 rounded-lg text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">
                            <Package className="w-3.5 h-3.5 mr-1" />
                            アイテム
                        </TabsTrigger>
                        <TabsTrigger value="logs" className="flex-1 rounded-lg text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">
                            <Shield className="w-3.5 h-3.5 mr-1" />
                            契約ログ
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="items" className="flex-1 overflow-y-auto mt-3">
                        <div className="grid grid-cols-2 gap-3">
                            {MY_ITEMS.map((item) => (
                                <Card key={item.id} className="overflow-hidden border-0 shadow-sm">
                                    <div className="relative aspect-square">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                        <div className="absolute top-2 right-2">
                                            <Badge className={`${rankColors[item.rank]} text-[10px] px-2 py-0 font-bold shadow-sm`}>
                                                {item.rank}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <p className="font-semibold text-xs text-slate-800 truncate">{item.title}</p>
                                        <p className="text-[10px] text-muted-foreground mt-0.5">¥{item.estimatedPrice.toLocaleString()}</p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="logs" className="flex-1 overflow-y-auto mt-3">
                        {agreedMatches.length === 0 ? (
                            <div className="text-center py-12">
                                <Shield className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                                <p className="text-sm text-muted-foreground">まだ契約はありません</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {agreedMatches.map((m) => {
                                    const other = getUserById(m.user1Id === 'user-me' ? m.user2Id : m.user1Id);
                                    const item = getItemById(m.item2Id);
                                    return (
                                        <Card key={m.id} className="p-3 border-0 shadow-sm">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={other?.avatar}
                                                    alt={other?.name}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-semibold text-slate-800">{other?.name}</p>
                                                    <p className="text-[10px] text-muted-foreground truncate">{item?.title}</p>
                                                </div>
                                                <div className="text-right">
                                                    <Badge className="bg-emerald-100 text-emerald-700 border-0 text-[10px]">
                                                        ¥{(m.contractDeposit ?? 2000).toLocaleString()}
                                                    </Badge>
                                                    <p className="text-[9px] text-muted-foreground mt-1">
                                                        {new Date(m.createdAt).toLocaleDateString('ja-JP')}
                                                    </p>
                                                </div>
                                            </div>
                                        </Card>
                                    );
                                })}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
