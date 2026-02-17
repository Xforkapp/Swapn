import { NavLink, Outlet } from 'react-router-dom';
import { Home, MessageSquare, User } from 'lucide-react';

const navItems = [
    { to: '/', icon: Home, label: 'ホーム' },
    { to: '/chat', icon: MessageSquare, label: 'チャット' },
    { to: '/profile', icon: User, label: 'プロフィール' },
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
            <div className="relative w-full max-w-[430px] min-h-screen md:min-h-0 md:h-[85vh] md:rounded-3xl md:shadow-2xl md:border md:border-white/30 bg-white overflow-hidden flex flex-col">
                {/* Page content */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden">
                    <Outlet />
                </main>

                {/* Bottom navigation */}
                <nav className="flex-shrink-0 border-t border-slate-100 bg-white/80 backdrop-blur-lg px-2 py-1 safe-area-bottom">
                    <div className="flex justify-around items-center">
                        {navItems.map(({ to, icon: Icon, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === '/'}
                                className={({ isActive }) =>
                                    `flex flex-col items-center gap-0.5 py-2 px-4 rounded-xl transition-all duration-200 ${isActive
                                        ? 'text-primary'
                                        : 'text-slate-400 hover:text-slate-600'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <div className={`p-1.5 rounded-xl transition-all duration-200 ${isActive ? 'bg-primary/10' : ''}`}>
                                            <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.8} />
                                        </div>
                                        <span className={`text-[10px] font-medium ${isActive ? 'font-semibold' : ''}`}>{label}</span>
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>
                </nav>
            </div>
        </div>
    );
}
