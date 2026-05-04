import React, { useState } from 'react';
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

const PricingManager = () => {
  const [packages, setPackages] = useState([
    { id: 1, title: 'Bireysel', price: '3.000 - 4.500 ₺', popular: false },
    { id: 2, title: 'Yerel İşletme', price: '5.500 - 8.500 ₺', popular: true },
    { id: 3, title: 'Esnaf Çözümleri', price: '9.000 - 15.000 ₺', popular: false },
    { id: 4, title: 'Kurumsal Vizyon', price: '25.000 - 40.000 ₺', popular: false },
    { id: 5, title: 'Premium Marka', price: '50.000 ₺+', popular: false },
  ]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);

  const handleEditClick = (pkg) => {
    setEditingId(pkg.id);
    setEditForm({ ...pkg });
  };

  const handleSave = (id) => {
    setPackages(packages.map(p => p.id === id ? editForm : p));
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Fiyat Paketleri</h2>
        <p className="text-gray-400">Hizmet bedellerini ve paket özelliklerini yapılandırın.</p>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <div key={pkg.id} className={`relative bg-black/40 backdrop-blur-md border ${pkg.popular ? 'border-[#00FF9D]/50 shadow-[0_0_30px_rgba(0,255,157,0.1)]' : 'border-white/10'} rounded-2xl p-6 transition-all`}>
            
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#00FF9D] to-[#00CC7E] text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                Popüler
              </div>
            )}

            {editingId === pkg.id ? (
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Paket Adı</label>
                  <input 
                    type="text" 
                    value={editForm.title}
                    onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                    className="w-full bg-black/50 border border-white/20 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00FF9D]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Fiyat Aralığı</label>
                  <input 
                    type="text" 
                    value={editForm.price}
                    onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                    className="w-full bg-black/50 border border-white/20 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00FF9D]"
                  />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input 
                    type="checkbox" 
                    checked={editForm.popular}
                    onChange={(e) => setEditForm({...editForm, popular: e.target.checked})}
                    className="accent-[#00FF9D] w-4 h-4 cursor-pointer"
                  />
                  <label className="text-sm text-gray-400 cursor-pointer" onClick={() => setEditForm({...editForm, popular: !editForm.popular})}>Popüler Etiketi</label>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <button onClick={() => handleSave(pkg.id)} className="flex-1 bg-[#00FF9D]/20 text-[#00FF9D] hover:bg-[#00FF9D] hover:text-black py-2 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2">
                    <FaCheck /> Kaydet
                  </button>
                  <button onClick={handleCancel} className="flex-1 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white py-2 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2">
                    <FaTimes /> İptal
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{pkg.title}</h3>
                  <button onClick={() => handleEditClick(pkg)} className="text-gray-500 hover:text-[#00FF9D] transition-colors p-2">
                    <FaEdit />
                  </button>
                </div>
                <div className="text-2xl font-black text-[#00FF9D] mb-6 tracking-tight">
                  {pkg.price}
                </div>
                
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4"></div>
                <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-widest font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#00FF9D]/50 animate-pulse"></span>
                  SİSTEMDE AKTİF
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingManager;
