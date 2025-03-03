import { Game } from '../types';

const API_KEY = process.env.NEXT_PUBLIC_SPORTS_API_KEY;
const BASE_URL = 'https://api.api-sports.io';

export async function fetchLiveScores(): Promise<Game[]> {
  if (!API_KEY) {
    console.warn('API key not found, using mock data');
    return mockData();
  }

  try {
    const responses = await Promise.all([
      fetchNBAScores(),
      fetchNFLScores(),
      fetchSoccerScores()
    ]);

    return responses.flat();
  } catch (error) {
    console.error('Error fetching scores:', error);
    return mockData();
  }
}

async function fetchNBAScores(): Promise<Game[]> {
  const response = await fetch(`${BASE_URL}/basketball/games/live`, {
    headers: {
      'x-rapidapi-key': API_KEY!,
      'x-rapidapi-host': 'api-sports.io'
    }
  });

  const data = await response.json();
  return transformNBAData(data);
}

async function fetchNFLScores(): Promise<Game[]> {
  const response = await fetch(`${BASE_URL}/american-football/games/live`, {
    headers: {
      'x-rapidapi-key': API_KEY!,
      'x-rapidapi-host': 'api-sports.io'
    }
  });

  const data = await response.json();
  return transformNFLData(data);
}

async function fetchSoccerScores(): Promise<Game[]> {
  const response = await fetch(`${BASE_URL}/football/fixtures/live`, {
    headers: {
      'x-rapidapi-key': API_KEY!,
      'x-rapidapi-host': 'api-sports.io'
    }
  });

  const data = await response.json();
  return transformSoccerData(data);
}

function transformNBAData(data: any): Game[] {
  return data.response?.map((game: any) => ({
    id: game.id,
    league: 'NBA',
    home: game.teams.home.name,
    away: game.teams.away.name,
    score: `${game.scores.home.total}-${game.scores.away.total}`,
    status: 'Live',
    time: `Q${game.periods.current} ${game.status.clock || ''}`,
    homeScore: game.scores.home.total,
    awayScore: game.scores.away.total,
    date: game.date
  })) || [];
}

function transformNFLData(data: any): Game[] {
  return data.response?.map((game: any) => ({
    id: game.id,
    league: 'NFL',
    home: game.teams.home.name,
    away: game.teams.away.name,
    score: `${game.scores.home}-${game.scores.away}`,
    status: 'Live',
    time: `Q${game.quarter} ${game.time || ''}`,
    homeScore: parseInt(game.scores.home),
    awayScore: parseInt(game.scores.away),
    date: game.date
  })) || [];
}

function transformSoccerData(data: any): Game[] {
  return data.response?.map((game: any) => ({
    id: game.fixture.id,
    league: 'Premier League',
    home: game.teams.home.name,
    away: game.teams.away.name,
    score: `${game.goals.home}-${game.goals.away}`,
    status: 'Live',
    time: `${game.fixture.status.elapsed}'`,
    homeScore: game.goals.home,
    awayScore: game.goals.away,
    date: game.fixture.date
  })) || [];
}

function mockData(): Game[] {
  return [
    { 
      id: 1, 
      league: "NBA", 
      home: "Lakers", 
      away: "Warriors", 
      score: "102-98",
      status: "Live",
      time: "Q4 2:30",
      homeScore: 102,
      awayScore: 98,
      date: new Date().toISOString()
    },
    { 
      id: 2, 
      league: "NFL", 
      home: "49ers", 
      away: "Chiefs", 
      score: "27-24",
      status: "Final",
      time: "Final",
      homeScore: 27,
      awayScore: 24,
      date: new Date().toISOString()
    },
    { 
      id: 3, 
      league: "Premier League", 
      home: "Man City", 
      away: "Liverpool", 
      score: "2-1",
      status: "Live",
      time: "75'",
      homeScore: 2,
      awayScore: 1,
      date: new Date().toISOString()
    },
  ];
} 