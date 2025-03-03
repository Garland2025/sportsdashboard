import * as React from 'react';
import type { Game } from '@/types';

interface GameCardProps {
  game: Game;
  isDarkMode: boolean;
}

export function GameCard({ game, isDarkMode }: GameCardProps) {
  return (
    <div
      className={`rounded-lg shadow-md p-6 transition-all duration-300 transform hover:scale-102 ${
        isDarkMode 
          ? 'bg-gray-800 text-white' 
          : 'bg-white text-gray-900'
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className={`text-sm font-semibold ${
          isDarkMode ? 'text-blue-400' : 'text-blue-600'
        }`}>
          {game.league}
        </div>
        <div className={`text-sm px-2 py-1 rounded ${
          game.status === 'Live' 
            ? 'bg-red-500 text-white animate-pulse' 
            : isDarkMode 
              ? 'bg-gray-700 text-gray-300' 
              : 'bg-gray-200 text-gray-700'
        }`}>
          {game.status}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-lg font-medium">{game.home}</div>
          <div className="text-2xl font-bold">{game.homeScore}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-lg font-medium">{game.away}</div>
          <div className="text-2xl font-bold">{game.awayScore}</div>
        </div>
      </div>

      <div className={`mt-4 text-center text-sm ${
        isDarkMode ? 'text-gray-400' : 'text-gray-500'
      }`}>
        {game.time}
      </div>
    </div>
  );
} 