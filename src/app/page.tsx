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
  const games = [
    { id: 1, league: "NBA", home: "Lakers", away: "Warriors", score: "102-98" },
    { id: 2, league: "NFL", home: "49ers", away: "Chiefs", score: "27-24" },
    { id: 3, league: "Premier League", home: "Man City", away: "Liverpool", score: "2-1" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold mb-6">🏀⚽ Live Sports Scores 🏈⚾</h1>
      <div className="space-y-4 w-full max-w-lg">
        {games.map((game) => (
          <div key={game.id} className="p-4 border border-gray-700 rounded-lg bg-gray-800">
            <h2 className="text-xl font-semibold">{game.league}</h2>
            <p>{game.home} vs {game.away}</p>
            <p className="text-green-400 font-bold text-lg">{game.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 