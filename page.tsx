'use client';

import * as React from 'react';
import { fetchLiveScores } from '@/services/api';
import type { Game } from '@/types';
import { GameCard } from '@/components/GameCard';

interface FilterState {
  league: string;
}

const LEAGUES = ["All", "NBA", "NFL", "Premier League"];

export default function Home() {
  const [scores, setScores] = React.useState<Game[]>([]);
  const [filter, setFilter] = React.useState<FilterState>({ league: "All" });
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  // Function to fetch live scores
  const fetchScores = React.useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchLiveScores();
      setScores(data);
    } catch (error) {
      console.error('Error fetching scores:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  React.useEffect(() => {
    fetchScores();
  }, [fetchScores]);

  // Periodic updates
  React.useEffect(() => {
    const interval = setInterval(() => {
      fetchScores();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [fetchScores]);

  const filteredScores = React.useMemo(() => {
    return filter.league === "All"
      ? scores
      : scores.filter(game => game.league === filter.league);
  }, [scores, filter.league]);

  return (
    <main className={`min-h-screen p-8 transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-4xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Live Sports Scores
          </h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`px-4 py-2 rounded-lg ${
              isDarkMode 
                ? 'bg-gray-700 text-white hover:bg-gray-600' 
                : 'bg-white text-gray-800 hover:bg-gray-100'
            } transition-colors duration-300`}
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
          {LEAGUES.map(league => (
            <button
              key={league}
              onClick={() => setFilter({ league })}
              className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                filter.league === league
                  ? isDarkMode 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-500 text-white'
                  : isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {league}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full text-center py-8">
              <div className={`animate-pulse text-xl ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Loading scores...
              </div>
            </div>
          ) : filteredScores.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <div className={`text-xl ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                No games found for {filter.league}
              </div>
            </div>
          ) : (
            filteredScores.map((game) => (
              <GameCard key={game.id} game={game} isDarkMode={isDarkMode} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
