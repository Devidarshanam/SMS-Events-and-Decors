import React, { useState } from 'react';
import { Palette, Edit3, X, Check, Crown } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { DecorationStyleItem } from '../../types';

export const AdminStylesPage: React.FC = () => {
  const { styles, updateStyle } = useStore();
  const [editingStyle, setEditingStyle] = useState<DecorationStyleItem | null>(null);
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState('');

  const handleEdit = (st: DecorationStyleItem) => {
    setEditingStyle(st);
    setDesc(st.description);
    setTags(st.tags.join(', '));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStyle) return;

    await updateStyle(editingStyle.id, {
      description: desc,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    });

    setEditingStyle(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      <div>
        <h1 className="font-serif text-3xl font-bold text-ivory-50">
          Decor Styles Explorer CMS
        </h1>
        <p className="text-xs text-charcoal-400 mt-1">
          Manage descriptions and defining tags for the 9 signature aesthetics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {styles.map((st) => (
          <div key={st.id} className="bg-charcoal-950 rounded-3xl p-6 border border-charcoal-800 space-y-4 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif text-xl font-bold text-ivory-50">{st.name}</h3>
                <button
                  onClick={() => handleEdit(st)}
                  className="p-1.5 rounded-lg bg-charcoal-900 text-gold-400 hover:bg-gold-500 hover:text-charcoal-950 transition-colors"
                  title="Edit Style"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-charcoal-300 leading-relaxed mb-4">{st.description}</p>
            </div>

            <div className="flex flex-wrap gap-1 pt-2 border-t border-charcoal-800">
              {st.tags.map(t => (
                <span key={t} className="text-[10px] bg-charcoal-900 text-gold-400 px-2 py-0.5 rounded-md border border-charcoal-700">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {editingStyle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-charcoal-950 w-full max-w-lg rounded-3xl border border-charcoal-700 p-6 space-y-4 text-ivory-100">
            <div className="flex justify-between items-center border-b border-charcoal-800 pb-3">
              <h3 className="font-serif text-xl font-bold text-ivory-50">
                Edit {editingStyle.name} Style
              </h3>
              <button onClick={() => setEditingStyle(null)} className="p-1 text-charcoal-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-charcoal-700 bg-charcoal-900 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-charcoal-800">
                <button
                  type="button"
                  onClick={() => setEditingStyle(null)}
                  className="px-5 py-2.5 rounded-xl border border-charcoal-700 text-charcoal-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow"
                >
                  Save Style
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
