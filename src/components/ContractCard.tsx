import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Check, FileText, Shield } from 'lucide-react';
import type { ContractStatus } from '@/types';

interface ContractCardProps {
    deposit: number;
    terms: string;
    isMine: boolean;
    matchStatus: ContractStatus;
    onAgree: () => void;
}

export default function ContractCard({ deposit, terms, isMine, matchStatus, onAgree }: ContractCardProps) {
    const isAgreed = matchStatus === 'agreed';

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-[280px]"
        >
            <div className={`rounded-2xl overflow-hidden shadow-lg border ${isAgreed ? 'border-emerald-200 bg-emerald-50' : 'border-accent/30 bg-gradient-to-br from-white to-amber-50'}`}>
                {/* Header */}
                <div className={`px-4 py-3 flex items-center gap-2 ${isAgreed ? 'bg-emerald-100' : 'bg-gradient-to-r from-primary/10 to-accent/10'}`}>
                    {isAgreed ? (
                        <Shield className="w-4 h-4 text-emerald-600" />
                    ) : (
                        <FileText className="w-4 h-4 text-primary" />
                    )}
                    <span className={`text-xs font-bold ${isAgreed ? 'text-emerald-700' : 'text-primary'}`}>
                        {isAgreed ? '契約成立 ✓' : 'スマートコントラクト'}
                    </span>
                </div>

                {/* Body */}
                <div className="p-4 space-y-3">
                    <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-1">デポジット</p>
                        <p className="text-lg font-bold text-primary">¥{deposit.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-1">交換条件</p>
                        <p className="text-sm text-slate-700">{terms}</p>
                    </div>

                    {isAgreed ? (
                        <Badge className="bg-emerald-100 text-emerald-700 border-0 w-full justify-center py-1.5 text-xs">
                            <Check className="w-3 h-3 mr-1" /> 双方が合意しました
                        </Badge>
                    ) : !isMine ? (
                        <Button
                            onClick={onAgree}
                            className="w-full bg-gradient-to-r from-accent to-amber-500 hover:from-accent/90 hover:to-amber-500/90 text-primary font-bold rounded-xl shadow-md shadow-accent/30 py-5"
                        >
                            <Check className="w-4 h-4 mr-2" />
                            合意する
                        </Button>
                    ) : (
                        <Badge className="bg-amber-100 text-amber-700 border-0 w-full justify-center py-1.5 text-xs">
                            相手の合意を待っています...
                        </Badge>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
