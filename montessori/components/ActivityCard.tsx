
import React, { useState } from 'react';
import { Activity } from '../types';
import GeminiIllustration from './GeminiIllustration';
import { 
  Check, 
  Package,
  Calendar
} from 'lucide-react';

interface ActivityCardProps {
  activity: Activity;
  onClick: (activity: Activity) => void;
}

const getAgeTagStyle = (age: string) => {
  if (age.includes('0-3')) return 'bg-blue-50 text-blue-600 border-blue-100'; 
  if (age.includes('3-6')) return 'bg-sky-50 text-sky-600 border-sky-100'; 
  if (age.includes('6-12')) return 'bg-indigo-50 text-indigo-600 border-indigo-100'; 
  if (age.includes('12-18')) return 'bg-violet-50 text-violet-600 border-violet-100'; 
  if (age.includes('18-24')) return 'bg-slate-50 text-slate-600 border-slate-200';
  if (age.includes('24+')) return 'bg-slate-100 text-slate-700 border-slate-300';
  return 'bg-blue-50 text-blue-600 border-blue-100';
};

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onClick }) => {
  const [isComplete, setIsComplete] = useState(false);
  
  const itemsText = activity.items_required && activity.items_required.length > 0
    ? activity.items_required.join(", ")
    : "No items needed";

  const ageStyle = getAgeTagStyle(activity.filter_tag);

  const handleCompleteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsComplete(!isComplete);
  };

  return (
    <div
      onClick={() => onClick(activity)}
      className="bg-white rounded-2xl flex flex-row items-center cursor-pointer group transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-50 mb-4 mx-1"
    >
         <div className="p-4 shrink-0">
  <img
    src="/montessori4/images/Munari_Mobile.png"
    alt="proof"
    style={{ width: 120, height: 120, border: "3px solid red" }}
  />
</div>


      {/* Content Area */}
      <div className="flex flex-col flex-grow min-w-0 py-4 pr-2">
        <div className="flex items-center gap-2 mb-1.5">
           <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider border ${ageStyle}`}>
             {activity.filter_tag}
           </span>
           <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{activity.category}</span>
        </div>

        <h3 className="text-[17px] font-display font-bold text-slate-800 leading-tight mb-1 group-hover:text-[#007AFF] transition-colors">
          {activity.title}
        </h3>
        
        <p className="text-slate-400 text-xs line-clamp-1 pr-4 leading-relaxed font-medium">
          {activity.what_is_it}
        </p>

        <div className="flex items-center gap-2 mt-2">
           <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1">
             <Package size={10} />
             {itemsText}
           </span>
        </div>
      </div>

      {/* Complete Checkbox Area (Kinedu Style) */}
      <div 
        onClick={handleCompleteToggle}
        className="flex flex-col items-center justify-center px-6 border-l border-slate-50 min-h-[112px] hover:bg-slate-50/50 transition-colors rounded-r-2xl"
      >
        <span className={`text-[10px] font-bold uppercase tracking-wider mb-2 transition-colors ${isComplete ? 'text-[#007AFF]' : 'text-slate-300'}`}>
          Complete
        </span>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${isComplete ? 'bg-[#007AFF] border-[#007AFF] text-white' : 'border-slate-100 text-slate-200'}`}>
          <Check size={20} strokeWidth={3} className={isComplete ? 'scale-100' : 'scale-0'} />
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
