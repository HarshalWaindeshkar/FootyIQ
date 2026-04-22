import players1Data from "@/data/players1.json";
import players2Data from "@/data/players2.json";
import players3Data from "@/data/players3.json";
import players4Data from "@/data/players4.json";

export type Player = {
  id: number;
  name: string;
  nationality: string;
  position: string;
  clubs: string[];
  age: number;
  goals: number;
  market_value: number;
  image: string;
  hints: string[];
};

const playersData = [
  ...players1Data,
  ...players2Data,
  ...players3Data,
  ...players4Data,
];

export const players: Player[] = playersData as Player[];

export function getRandomPlayer(): Player {
  return players[Math.floor(Math.random() * players.length)];
}

export function getRandomPlayers(count: number): Player[] {
  const shuffled = [...players].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getTwoRandomPlayers(): [Player, Player] {
  const shuffled = [...players].sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1]];
}

// All unique clubs across all players
export const ALL_CLUBS = Array.from(
  new Set(players.flatMap((p) => p.clubs)),
).sort();

// All unique nationalities
export const ALL_NATIONALITIES = Array.from(
  new Set(players.map((p) => p.nationality)),
).sort();
