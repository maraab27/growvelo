import { useCms } from "./CmsProvider";
import { Check, Sparkles } from "lucide-react";

export function SaveBar() {
  const { isEditing, hasChanges, isSaving, saveChanges } = useCms();

  if (!isEditing) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#0d0f18]/90 border border-purple-500/30 text-white shadow-2xl backdrop-blur-md transition-all group">
      {/* অ্যাক্টিভ স্ট্যাটাস ডট */}
      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
      
      <span className="text-xs font-semibold text-purple-200 flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
        Admin Mode
      </span>

      {hasChanges ? (
        <button
          onClick={saveChanges}
          disabled={isSaving}
          className="ml-1 px-3 py-1 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-bold flex items-center gap-1 transition-all disabled:opacity-50 shadow-md"
        >
          <Check className="w-3 h-3" />
          <span>{isSaving ? "সেভ হচ্ছে..." : "Save Changes"}</span>
        </button>
      ) : (
        <span className="hidden group-hover:inline-block text-[11px] text-slate-400 border-l border-white/10 pl-2">
          টেক্সট এডিট করে বাইরে ক্লিক করলেই সেভ হবে
        </span>
      )}
    </div>
  );
}
