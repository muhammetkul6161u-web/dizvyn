import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { FaLaptopCode, FaTags, FaInbox, FaSignOutAlt, FaRocket } from 'react-icons/fa';
import ParticleBackground from '../../components/ParticleBackground';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('kma_admin_auth');
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin/portfolio', icon: <FaLaptopCode />, label: 'Portfolyo Yönetimi' },
    { path: '/admin/pricing', icon: <FaTags />, label: 'Fiyat Paketleri' },
    { path: '/admin/inbox', icon: <FaInbox />, label: 'Gelen Kutusu' }
  ];

  return (
    <div className="flex h-screen bg-[#020503] text-white overflow-hidden font-sans">
      <ParticleBackground variant="admin" />
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(0, 255, 157, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 157, 0.1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}></div>

      <aside className="relative z-10 w-72 h-full bg-black/40 backdrop-blur-xl border-r border-white/5 flex flex-col shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
        <div className="p-8 border-b border-white/5">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-[#00FF9D]/10 flex items-center justify-center border border-[#00FF9D]/30 shadow-[0_0_15px_rgba(0,255,157,0.2)] group-hover:bg-[#00FF9D] transition-all">
              <FaRocket className="text-[#00FF9D] group-hover:text-black transition-all" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00FF9D]">KMA</h1>
              <p className="text-[10px] text-[#00FF9D] tracking-[0.2em]">ADMIN TERMINAL</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 py-8 px-4 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname.includes(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#00FF9D]/10 text-[#00FF9D] border border-[#00FF9D]/20 shadow-[inset_0_0_20px_rgba(0,255,157,0.05)]' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className={`text-lg ${isActive ? 'text-[#00FF9D]' : ''}`}>{item.icon}</span>
                <span className="font-medium tracking-wide">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
          >
            <FaSignOutAlt />
            <span className="font-medium tracking-wide">Sistemden Çıkış</span>
          </button>
        </div>
      </aside>

      <main className="relative z-10 flex-1 h-full overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 255, 157, 0.2); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0, 255, 157, 0.4); }
      `}} />
    </div>
  );
};

export default AdminLayout;
