import React, { useState } from 'react';
import { FaEnvelopeOpen, FaTrash, FaReply } from 'react-icons/fa';

const InboxManager = () => {
  const [messages, setMessages] = useState([
    { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@example.com', text: 'Yeni bir web projesi için fiyat teklifi almak istiyorum.', date: '2026-05-01', read: false },
    { id: 2, name: 'Ayşe Kaya', email: 'ayse@example.com', text: 'Mevcut e-ticaret sitemizin hız optimizasyonu.', date: '2026-04-28', read: true },
    { id: 3, name: 'Startup A.Ş.', email: 'info@startup.com', text: 'Mobil uygulama ve landing page entegrasyonu hakkında.', date: '2026-04-25', read: true },
  ]);

  const markAsRead = (id) => {
    setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const handleDelete = (id) => {
    if(window.confirm('Mesajı kalıcı olarak silmek istiyor musunuz?')) {
      setMessages(messages.filter(m => m.id !== id));
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Gelen Kutusu</h2>
        <p className="text-gray-400">İletişim formundan gelen müşteri taleplerini inceleyin.</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-black/40 border-b border-white/5 text-sm uppercase tracking-widest text-gray-400">
                <th className="p-5 font-semibold w-12">Durum</th>
                <th className="p-5 font-semibold w-1/5">Gönderen</th>
                <th className="p-5 font-semibold w-1/4">E-Posta</th>
                <th className="p-5 font-semibold w-1/3">Mesaj</th>
                <th className="p-5 font-semibold w-32">Tarih</th>
                <th className="p-5 font-semibold text-right">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} className={`border-b border-white/5 hover:bg-white/5 transition-colors group ${!msg.read ? 'bg-[#00FF9D]/5' : ''}`}>
                  <td className="p-5 text-center">
                    <div className={`w-3 h-3 rounded-full mx-auto ${msg.read ? 'bg-gray-600' : 'bg-[#00FF9D] shadow-[0_0_10px_rgba(0,255,157,0.8)] animate-pulse'}`}></div>
                  </td>
                  <td className={`p-5 ${!msg.read ? 'text-white font-bold' : 'text-gray-300'}`}>{msg.name}</td>
                  <td className="p-5 text-gray-400 font-mono text-sm">{msg.email}</td>
                  <td className="p-5 text-gray-400">
                    <p className="truncate max-w-[300px]">{msg.text}</p>
                  </td>
                  <td className="p-5 text-gray-500 font-mono text-xs">
                    {msg.date}
                  </td>
                  <td className="p-5 text-right flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    {!msg.read && (
                      <button onClick={() => markAsRead(msg.id)} title="Okundu İşaretle" className="p-2 bg-[#00FF9D]/10 text-[#00FF9D] hover:bg-[#00FF9D] hover:text-black rounded-lg transition-colors">
                        <FaEnvelopeOpen />
                      </button>
                    )}
                    <a href={`mailto:${msg.email}`} title="Yanıtla" className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg transition-colors inline-flex">
                      <FaReply />
                    </a>
                    <button onClick={() => handleDelete(msg.id)} title="Sil" className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InboxManager;
