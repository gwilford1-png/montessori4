import {
  ArrowLeft,
  Baby,
  ChevronDown,
  Filter,
  Info,
  LayoutGrid,
  List,
  Menu,
  Search,
  Shapes,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  X,
  Brain,
  CheckCircle2
} from "lucide-react";

import React, { useEffect, useMemo, useRef, useState } from "react";
import ActivityCard from "./components/ActivityCard";
import ActivityDetail from "./components/ActivityDetail";
import ActivityRow from "./components/ActivityRow";
import SafetyModal from "./components/SafetyModal";
import ShoppingList from "./components/ShoppingList";
import BundleView from "./components/BundleView";
import ExecutiveFunctionInfo from "./components/ExecutiveFunctionInfo";
import { AGE_FILTERS, INITIAL_ACTIVITIES, ACTIVITY_BUNDLES } from "./constants";
import { Activity, SectionType, ViewMode } from "./types";

const App: React.FC = () => {
  const [activities] = useState<Activity[]>(INITIAL_ACTIVITIES);
  const [viewMode, setViewMode] = useState<ViewMode>('LIST');
  const [displayStyle, setDisplayStyle] = useState<'GRID' | 'ROWS'>('GRID');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAgeFilterOpen, setIsAgeFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAge, setSelectedAge] = useState('All');
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const filteredItems = useMemo(() => {
    return activities.filter(activity => {
      const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            activity.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesAge = selectedAge === 'All' || activity.filter_tag === selectedAge;
      return matchesSearch && matchesAge;
    });
  }, [activities, searchQuery, selectedAge]);

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity);
    setViewMode('DETAIL');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedActivity(null);
    setViewMode('LIST');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans pb-16 transition-colors duration-500">
      <img
  src={`${import.meta.env.BASE_URL}images/melodic_anchoring.png`}
  alt="test"
  style={{ width: 200, border: "2px solid red", marginBottom: 16 }}
/>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {/* Side Navigation Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div 
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="relative w-72 h-full bg-white border-r border-slate-200 shadow-2xl p-6 flex flex-col animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#007AFF] rounded-lg text-white">
                  <Baby size={20} />
                </div>
                <h3 className="text-xl font-display font-bold text-[#1E293B]">TinySteps</h3>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg">
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            <nav className="flex-1 space-y-2">
              <button 
                onClick={() => { setViewMode('LIST'); setIsMenuOpen(false); }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all ${viewMode === 'LIST' ? 'bg-[#007AFF] text-white shadow-lg shadow-blue-200' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <Shapes size={18} />
                Activities
              </button>
              <button 
                onClick={() => { setViewMode('BUNDLES'); setIsMenuOpen(false); }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all ${viewMode === 'BUNDLES' ? 'bg-[#00C2FF] text-white shadow-lg shadow-cyan-100' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <Sparkles size={18} />
                Bundles
              </button>
              <button 
                onClick={() => { setViewMode('SCIENCE'); setIsMenuOpen(false); }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all ${viewMode === 'SCIENCE' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <Brain size={18} />
                Science
              </button>
              <div className="h-px bg-slate-100 my-4 mx-4"></div>
              <button 
                onClick={() => { setViewMode('SHOPPING'); setIsMenuOpen(false); }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all ${viewMode === 'SHOPPING' ? 'bg-[#6366F1] text-white shadow-lg shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <ShoppingBag size={18} />
                Buy Items
              </button>
            </nav>
          </div>
        </div>
      )}

      {viewMode === 'SHOPPING' && (
        <ShoppingList activities={activities} selectedAge={selectedAge} onAgeChange={setSelectedAge} onBack={handleBackToList} />
      )}

      {viewMode === 'BUNDLES' && (
        <BundleView bundles={ACTIVITY_BUNDLES} activities={activities} onActivityClick={handleActivityClick} onBack={handleBackToList} />
      )}

      {viewMode === 'SCIENCE' && (
        <ExecutiveFunctionInfo onBack={handleBackToList} />
      )}

      {viewMode === 'LIST' && (
        <>
          <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 h-16 mb-6">
            <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
              <button onClick={() => setIsMenuOpen(true)} className="p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-50 transition-all">
                <Menu size={24} strokeWidth={2.5} />
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsAgeFilterOpen(!isAgeFilterOpen)}
                  className="flex items-center gap-3 px-4 py-2 bg-white border border-slate-200 rounded-2xl shadow-sm text-[11px] font-bold uppercase tracking-widest text-slate-600 hover:border-[#007AFF] transition-all"
                >
                  <Filter size={14} className="text-[#007AFF]" />
                  {selectedAge === 'All' ? 'All Ages' : selectedAge}
                  <ChevronDown size={14} className={`transition-transform duration-200 ${isAgeFilterOpen ? 'rotate-180' : ''}`} />
                </button>

                {isAgeFilterOpen && (
                  <>
                    <div className="fixed inset-0 z-20" onClick={() => setIsAgeFilterOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-30 py-3 animate-in fade-in zoom-in-95 duration-200">
                      {AGE_FILTERS.map((age) => (
                        <button
                          key={age}
                          onClick={() => {
                            setSelectedAge(age);
                            setIsAgeFilterOpen(false);
                          }}
                          className={`w-full text-left px-5 py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-colors ${
                            selectedAge === age ? 'text-[#007AFF] bg-blue-50/50' : 'text-slate-600'
                          }`}
                        >
                          {age === 'All' ? 'All Ages' : age}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </header>

          <main className="max-w-4xl mx-auto px-4 pb-24">
            {filteredItems.length > 0 ? (
              <div className="flex flex-col">
                <div className="bg-[#D8F3DC]/30 py-3 px-6 rounded-xl mb-6 text-center">
                  <h2 className="text-[#2D6A4F] font-display font-bold text-lg">Developmental Activities</h2>
                </div>
                
                {filteredItems.map(activity => (
                  <ActivityCard 
                    key={activity.id} 
                    activity={activity} 
                    onClick={handleActivityClick}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 mx-2 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
                <Search className="w-12 h-12 mx-auto mb-4 text-slate-200" />
                <h3 className="text-xl font-display font-bold text-slate-800 mb-2">No activities found</h3>
                <p className="text-slate-400 text-sm mb-8">Try selecting a different age group or search term.</p>
                <button 
                  onClick={() => {setSelectedAge('All'); setSearchQuery('');}}
                  className="px-8 py-3 bg-[#007AFF] text-white rounded-2xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </>
      )}

      {viewMode === 'DETAIL' && selectedActivity && (
        <ActivityDetail activity={selectedActivity} onBack={handleBackToList} />
      )}
      
      <SafetyModal isOpen={isSafetyModalOpen} onClose={() => setIsSafetyModalOpen(false)} />
    </div>
  );
};

export default App;
