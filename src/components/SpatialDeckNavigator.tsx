import {
  ChevronLeft,
  ChevronRight,
  Sliders,
} from 'lucide-react';

interface SpatialDeckNavigatorProps {
  currentIndex: number;
  totalSections: number;
  sectionNames: { id: string; label: string; icon?: React.ReactNode }[];
  onNavigate: (index: number) => void;
  isSpatialMode: boolean;
  onToggleMode: () => void;
}

export const SpatialDeckNavigator: React.FC<SpatialDeckNavigatorProps> = ({
  currentIndex,
  totalSections,
  sectionNames,
  onNavigate,
  isSpatialMode,
  onToggleMode,
}) => {
  const currentSection = sectionNames[currentIndex] || { label: 'Section', id: '' };

  return (
    <>
      {/* Floating Left/Right Spatial Deck Navigation Controls (Desktop & Large Screens) */}
      {isSpatialMode && (
        <>
          {/* Previous Section Button */}
          {currentIndex > 0 && (
            <button
              type="button"
              onClick={() => onNavigate(currentIndex - 1)}
              className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 p-3 rounded-2xl glass-panel border-cyan-500/30 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 hover:scale-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,229,255,0.15)] group items-center gap-2"
              aria-label="Previous section (enter from left)"
              title="Previous section (Arrow Left / Scroll Up)"
            >
              <ChevronLeft className="w-5 h-5 text-cyan-400 transition-transform group-hover:-translate-x-1" />
              <div className="hidden xl:flex flex-col text-left pr-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-none">
                  Previous
                </span>
                <span className="text-xs font-semibold text-slate-200 truncate max-w-[100px]">
                  {sectionNames[currentIndex - 1]?.label}
                </span>
              </div>
            </button>
          )}

          {/* Next Section Button */}
          {currentIndex < totalSections - 1 && (
            <button
              type="button"
              onClick={() => onNavigate(currentIndex + 1)}
              className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 p-3 rounded-2xl glass-panel border-cyan-500/30 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 hover:scale-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,229,255,0.15)] group items-center gap-2"
              aria-label="Next section (enter from right)"
              title="Next section (Arrow Right / Scroll Down)"
            >
              <div className="hidden xl:flex flex-col text-right pl-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-none">
                  Next
                </span>
                <span className="text-xs font-semibold text-slate-200 truncate max-w-[100px]">
                  {sectionNames[currentIndex + 1]?.label}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-cyan-400 transition-transform group-hover:translate-x-1" />
            </button>
          )}
        </>
      )}

      {/* Floating Bottom Section HUD & Mode Switcher */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[94vw] flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-2xl glass-panel border-cyan-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
        {/* Mode Toggle Button */}
        <button
          type="button"
          onClick={onToggleMode}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-mono border transition-all text-slate-300 hover:text-white"
          style={{
            borderColor: isSpatialMode ? 'rgba(0, 229, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
            backgroundColor: isSpatialMode ? 'rgba(0, 229, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)',
          }}
          title={isSpatialMode ? 'Switch to Classic Vertical Scroll' : 'Switch to Side-Enter Spatial Deck'}
        >
          <Sliders className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">
            {isSpatialMode ? '3D Blast Mode' : 'Continuous Scroll'}
          </span>
          <span className="sm:hidden text-[10px]">
            {isSpatialMode ? '3D Blast' : 'Scroll'}
          </span>
        </button>

        {/* Section Counter & Title Pill */}
        <div className="flex items-center gap-2 px-2 sm:px-3 py-1 rounded-xl bg-slate-900/60 border border-slate-700/50 text-xs font-mono">
          <span className="text-cyan-400 font-bold">
            0{currentIndex + 1}
            <span className="text-slate-500 font-normal"> / 0{totalSections}</span>
          </span>
          <span className="hidden md:inline text-slate-600">•</span>
          <span className="hidden md:inline text-slate-200 font-semibold uppercase tracking-wider truncate max-w-[140px]">
            {currentSection.label}
          </span>
        </div>

        {/* Dot Pagination Track */}
        <div className="hidden sm:flex items-center gap-1.5 px-2">
          {sectionNames.map((sec, idx) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => onNavigate(idx)}
              aria-label={`Jump to ${sec.label}`}
              title={`${idx + 1}. ${sec.label}`}
              className={`transition-all rounded-full ${
                currentIndex === idx
                  ? 'w-6 h-2 bg-gradient-to-r from-cyan-400 to-sky-400 shadow-[0_0_8px_rgba(0,229,255,0.8)]'
                  : 'w-2 h-2 bg-slate-700 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        {/* Quick Prev / Next Buttons for Mobile & All Devices */}
        {isSpatialMode && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => onNavigate(currentIndex - 1)}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-400 disabled:opacity-30 disabled:hover:text-slate-300 transition-colors"
              aria-label="Previous section"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={currentIndex === totalSections - 1}
              onClick={() => onNavigate(currentIndex + 1)}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-400 disabled:opacity-30 disabled:hover:text-slate-300 transition-colors"
              aria-label="Next section"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};
