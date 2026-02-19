import { NavLink, Outlet } from 'react-router-dom';
import { Home, MessageSquare, PlusCircle, User, Settings } from 'lucide-react';

const navItems = [
    { to: '/', icon: Home, label: 'ホーム', center: false },
    { to: '/chat', icon: MessageSquare, label: 'チャット', center: false },
    { to: '/listing', icon: PlusCircle, label: '出品', center: true },
    { to: '/profile', icon: User, label: 'プロフィール', center: false },
    { to: '/settings', icon: Settings, label: '設定', center: false },
];

export default function Layout() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 flex items-center justify-center">
            {/* Desktop blur background image */}
            <div className="fixed inset-0 hidden md:block pointer-events-none">
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(40px)',
                    }}
                />
            </div>

            {/* Phone container */}
            <div className="relative w-full max-w-[430px] h-dvh md:h-[85vh] md:rounded-3xl md:shadow-2xl md:border md:border-white/30 bg-white overflow-hidden flex flex-col">
                {/* Page content */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
                    <Outlet />
                </main>

                {/* Bottom navigation */}
                <nav className="flex-shrink-0 border-t border-slate-100 bg-white/80 backdrop-blur-lg px-1 py-1 safe-area-bottom">
                    <div className="flex justify-around items-end">
                        {navItems.map(({ to, icon: Icon, label, center }) =>
                            center ? (
                                <NavLink
                                    key={to}
                                    to={to}
                                    className={({ isActive }) =>
                                        `flex flex-col items-center -mt-4 transition-all duration-200 ${isActive ? 'scale-105' : ''}`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${isActive
                                                    ? 'bg-primary text-white shadow-primary/30'
                                                    : 'bg-gradient-to-br from-primary to-primary/80 text-white hover:shadow-primary/40'
                                                }`}>
                                                <Icon className="w-6 h-6" strokeWidth={2} />
                                            </div>
                                            <span className={`text-[9px] font-medium mt-0.5 ${isActive ? 'text-primary font-semibold' : 'text-slate-400'}`}>
                                                {label}
                                            </span>
                                        </>
                                    )}
                                </NavLink>
                            ) : (
                                <NavLink
                                    key={to}
                                    to={to}
                                    end={to === '/'}
                                    className={({ isActive }) =>
                                        `flex flex-col items-center gap-0.5 py-1.5 px-2 rounded-xl transition-all duration-200 ${isActive ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <div className={`p-1 rounded-xl transition-all duration-200 ${isActive ? 'bg-primary/10' : ''}`}>
                                                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.8} />
                                            </div>
                                            <span className={`text-[9px] font-medium ${isActive ? 'font-semibold' : ''}`}>{label}</span>
                                        </>
                                    )}
                                </NavLink>
                            )
                        )}
                    </div>
                </nav>
            </div>
        </div>
    );
}
