import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { CURRENT_USER, MY_ITEMS, getUserById, getItemById } from '@/data/mock';
import { Shield, Package } from 'lucide-react';

export default function Profile() {
    const { matches } = useApp();
    const navigate = useNavigate();

    const agreedMatches = matches.filter((m) => m.status === 'agreed' || m.status === 'fulfilled');

    return (
        <div className="h-full flex flex-col">
            {/* Header: Avatar + Name + Trust Score ring */}
            <div className="px-5 pt-5 pb-3">
                <div className="flex items-center gap-3">
                    <img
                        src={CURRENT_USER.avatar}
                        alt={CURRENT_USER.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-accent/30 shadow-md"
                    />
                    <div className="flex-1 min-w-0">
                        <h1 className="text-base font-bold text-slate-800 truncate">{CURRENT_USER.name}</h1>
                        <p className="text-[10px] text-muted-foreground">2025年から利用</p>
                    </div>
                    {/* Trust Score Mini Ring */}
                    <div className="relative w-12 h-12 flex-shrink-0">
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
                            <span className="text-xs font-bold text-primary">{CURRENT_USER.trustScore}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats row */}
            <div className="px-5 pb-2 flex gap-2">
                <div className="flex-1 bg-primary/5 rounded-xl py-2 text-center">
                    <p className="text-base font-bold text-primary">{matches.length}</p>
                    <p className="text-[9px] text-muted-foreground">マッチ</p>
                </div>
                <div className="flex-1 bg-emerald-50 rounded-xl py-2 text-center">
                    <p className="text-base font-bold text-emerald-600">{agreedMatches.length}</p>
                    <p className="text-[9px] text-muted-foreground">契約</p>
                </div>
                <div className="flex-1 bg-accent/10 rounded-xl py-2 text-center">
                    <p className="text-base font-bold text-accent">{MY_ITEMS.length}</p>
                    <p className="text-[9px] text-muted-foreground">出品中</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex-1 px-5 pb-2 overflow-hidden">
                <Tabs defaultValue="items" className="h-full flex flex-col">
                    <TabsList className="w-full bg-slate-100 rounded-lg p-0.5">
                        <TabsTrigger value="items" className="flex-1 rounded-md text-[11px] py-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                            <Package className="w-3 h-3 mr-1" />
                            アイテム
                        </TabsTrigger>
                        <TabsTrigger value="logs" className="flex-1 rounded-md text-[11px] py-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                            <Shield className="w-3 h-3 mr-1" />
                            契約ログ
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="items" className="flex-1 overflow-y-auto mt-2">
                        {/* Instagram-style 3 column grid */}
                        <div className="grid grid-cols-3 gap-0.5">
                            {MY_ITEMS.map((item) => (
                                <div
                                    key={item.id}
                                    className="relative aspect-square cursor-pointer hover:opacity-90 transition-opacity"
                                    onClick={() => navigate(`/item/${item.id}`)}
                                >
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                    <div className="absolute top-1 right-1">
                                        <Badge className="bg-black/50 text-white border-0 text-[8px] px-1 py-0 font-bold backdrop-blur-sm">
                                            {item.rank}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="logs" className="flex-1 overflow-y-auto mt-2">
                        {agreedMatches.length === 0 ? (
                            <div className="text-center py-10">
                                <Shield className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                                <p className="text-xs text-muted-foreground">まだ契約はありません</p>
                            </div>
                        ) : (
                            <div className="space-y-1.5">
                                {agreedMatches.map((m) => {
                                    const other = getUserById(m.user1Id === 'user-me' ? m.user2Id : m.user1Id);
                                    const item = getItemById(m.item2Id);
                                    return (
                                        <div key={m.id} className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50">
                                            <img
                                                src={other?.avatar}
                                                alt={other?.name}
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[11px] font-semibold text-slate-800 truncate">{other?.name}</p>
                                                <p className="text-[9px] text-muted-foreground truncate">{item?.title}</p>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <Badge className="bg-emerald-100 text-emerald-700 border-0 text-[9px] px-1.5 py-0">
                                                    ¥{(m.contractDeposit ?? 2000).toLocaleString()}
                                                </Badge>
                                                <p className="text-[8px] text-muted-foreground mt-0.5">
                                                    {new Date(m.createdAt).toLocaleDateString('ja-JP')}
                                                </p>
                                            </div>
                                        </div>
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
