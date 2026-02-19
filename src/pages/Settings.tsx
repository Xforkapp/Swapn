import { ChevronRight, User, Bell, Shield, HelpCircle, LogOut, Moon, Globe } from 'lucide-react';
import { CURRENT_USER } from '@/data/mock';

interface SettingItem {
    icon: React.ElementType;
    label: string;
    desc?: string;
    color: string;
    danger?: boolean;
}

const settingGroups: { title: string; items: SettingItem[] }[] = [
    {
        title: 'アカウント',
        items: [
            { icon: User, label: 'プロフィール編集', desc: '名前・アバター・自己紹介', color: 'bg-blue-50 text-blue-500' },
            { icon: Shield, label: 'セキュリティ', desc: 'パスワード・二段階認証', color: 'bg-emerald-50 text-emerald-500' },
        ],
    },
    {
        title: 'アプリ設定',
        items: [
            { icon: Bell, label: '通知設定', desc: 'プッシュ通知・メール通知', color: 'bg-amber-50 text-amber-500' },
            { icon: Moon, label: 'ダークモード', desc: '準備中', color: 'bg-purple-50 text-purple-500' },
            { icon: Globe, label: '言語', desc: '日本語', color: 'bg-sky-50 text-sky-500' },
        ],
    },
    {
        title: 'サポート',
        items: [
            { icon: HelpCircle, label: 'ヘルプ・お問い合わせ', color: 'bg-slate-100 text-slate-500' },
            { icon: LogOut, label: 'ログアウト', color: 'bg-red-50 text-red-500', danger: true },
        ],
    },
];

export default function Settings() {
    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="px-5 pt-5 pb-3 flex-shrink-0">
                <h1 className="text-lg font-bold text-slate-800">設定</h1>
            </div>

            {/* User card */}
            <div className="px-5 pb-3 flex-shrink-0">
                <div className="flex items-center gap-3 bg-slate-50 rounded-2xl p-3">
                    <img
                        src={CURRENT_USER.avatar}
                        alt={CURRENT_USER.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-800 truncate">{CURRENT_USER.name}</p>
                        <p className="text-[10px] text-muted-foreground">信頼スコア {CURRENT_USER.trustScore}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
                </div>
            </div>

            {/* Setting groups */}
            <div className="flex-1 overflow-y-auto px-5 pb-6">
                {settingGroups.map((group) => (
                    <div key={group.title} className="mb-4">
                        <p className="text-[10px] font-semibold text-muted-foreground mb-1.5 px-1 uppercase tracking-wider">
                            {group.title}
                        </p>
                        <div className="bg-slate-50 rounded-2xl overflow-hidden">
                            {group.items.map((item, idx) => (
                                <button
                                    key={item.label}
                                    className={`w-full flex items-center gap-3 px-3.5 py-3 hover:bg-slate-100 transition-colors text-left ${idx < group.items.length - 1 ? 'border-b border-slate-100' : ''
                                        }`}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}>
                                        <item.icon className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-[13px] font-medium ${item.danger ? 'text-red-500' : 'text-slate-700'}`}>
                                            {item.label}
                                        </p>
                                        {item.desc && (
                                            <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                                        )}
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                {/* App version */}
                <p className="text-center text-[10px] text-muted-foreground mt-4">TrustBarter v0.1.0</p>
            </div>
        </div>
    );
}
