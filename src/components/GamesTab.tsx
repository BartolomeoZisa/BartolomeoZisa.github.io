import React, { useState, useMemo } from 'react';
import { games } from '../data';
import { Game } from '../types';
import { 
  Gamepad2, 
  Tv, 
  Search, 
  Filter, 
  ExternalLink,
  Layers,
  Heart
} from 'lucide-react';

export default function GamesTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'All' | 'Game' | 'Asset Pack'>('All');
  const [selectedPlatform, setSelectedPlatform] = useState<'All' | 'Itch.io' | 'Newgrounds'>('All');

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesSearch = 
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesType = 
        selectedType === 'All' || game.type === selectedType;

      const matchesPlatform = 
        selectedPlatform === 'All' || game.platform === selectedPlatform;

      return matchesSearch && matchesType && matchesPlatform;
    });
  }, [searchTerm, selectedType, selectedPlatform]);

  return (
    <div className="flex flex-col gap-6 animate-fade-in" id="games-tab">
      {/* Header & Bio */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Gamepad2 className="w-6 h-6 text-teal-600 animate-pulse" />
          Games & Pixel Art
        </h3>
        <p className="text-sm text-slate-500 mt-2 leading-relaxed">
          Some of my games.  Click to play them directly in your web browser! 
        </p>
      </div>

      {/* Multi-Filters Grid */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col lg:flex-row gap-4 justify-between items-center" id="games-filters-bar">
        {/* Search */}
        <div className="relative w-full lg:w-72">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-slate-400" />
          </span>
          <input
            type="text"
            placeholder="Search games or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto" id="filter-options-group">
          {/* Type Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">Type:</span>
            {(['All', 'Game', 'Asset Pack'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  selectedType === type
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {type === 'All' ? 'All Types' : type}
              </button>
            ))}
          </div>

          {/* Platform Filter */}
          <div className="flex items-center gap-1.5 flex-wrap border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-4">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">Platform:</span>
            {(['All', 'Itch.io', 'Newgrounds'] as const).map((platform) => (
              <button
                key={platform}
                onClick={() => setSelectedPlatform(platform)}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  selectedPlatform === platform
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {platform === 'All' ? 'All Sites' : platform}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Content */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="games-grid">
          {filteredGames.map((game) => (
            <div 
              key={game.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col group transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-slate-300 relative"
              id={`game-card-${game.id}`}
            >
              {/* Media Card Preview */}
              <div className="relative h-44 bg-slate-950 overflow-hidden">
                {game.videoUrl ? (
                  <video 
                    src={game.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : game.imageUrl ? (
                  <img 
                    src={game.imageUrl} 
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  /* High-Fidelity Retro Scanlines Scan-Grid Placeholder */
                  <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-4 text-center select-none relative overflow-hidden font-mono">
                    <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] [background-size:100%_4px,6px_100%]"></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/10 via-transparent to-amber-500/10"></div>
                    
                    <div className="z-10 flex flex-col items-center gap-2">
                      <Gamepad2 className="w-10 h-10 text-rose-500 animate-pulse" />
                      <span className="text-rose-400 font-bold text-xs tracking-wider uppercase">Insert Media</span>
                      <span className="text-[10px] text-slate-500">Configure custom preview image / video</span>
                    </div>
                    
                    <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-slate-700"></div>
                    <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-slate-700"></div>
                    <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-slate-700"></div>
                    <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-slate-700"></div>
                  </div>
                )}
                
                {/* Format/Platform stickers */}
                <div className="absolute bottom-3 left-3 flex gap-1.5 z-10">
                  <span className="bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm flex items-center gap-1 shadow-sm">
                    {game.type === 'Game' ? <Gamepad2 className="w-3 h-3 text-teal-400" /> : <Layers className="w-3 h-3 text-emerald-400" />}
                    {game.type}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm flex items-center gap-1 shadow-sm ${
                    game.platform === 'Itch.io' 
                      ? 'bg-rose-600/90 text-white' 
                      : 'bg-amber-500/90 text-slate-900'
                  }`}>
                    {game.platform === 'Itch.io' ? <Gamepad2 className="w-3 h-3" /> : <Tv className="w-3 h-3" />}
                    {game.platform}
                  </span>
                </div>

              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col gap-3">
                <div>
                  <h4 className="font-bold text-slate-900 text-base group-hover:text-teal-600 transition-colors flex items-center justify-between">
                    {game.title}
                    <Heart className="w-4 h-4 text-slate-300 hover:text-rose-500 transition-colors" />
                  </h4>
                </div>

                <p className="text-slate-600 text-xs leading-relaxed flex-1">
                  {game.description}
                </p>

                {/* Game specific tag lists */}
                <div className="flex flex-wrap gap-1 mt-1">
                  {game.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="bg-slate-50 text-slate-500 border border-slate-100 text-[10px] px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action button */}
                <div className="border-t border-slate-100 pt-3 mt-1 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">@bartholomheow</span>
                  <a
                    href={game.platformUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      game.platform === 'Itch.io'
                        ? 'bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white'
                        : 'bg-amber-50 text-amber-700 hover:bg-amber-500 hover:text-slate-900'
                    }`}
                  >
                    Play / Download
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center bg-white border border-slate-200 rounded-2xl py-12 p-6 shadow-sm">
          <p className="text-slate-500 font-medium">No game or assets found matching selection filters.</p>
          <button 
            onClick={() => { setSearchTerm(''); setSelectedType('All'); setSelectedPlatform('All'); }}
            className="text-teal-600 hover:text-teal-700 font-semibold text-sm mt-2 hover:underline cursor-pointer"
          >
            Reset Search Filters
          </button>
        </div>
      )}

      {/* Media Configuration Modal Overlay */}
    </div>
  );
}
