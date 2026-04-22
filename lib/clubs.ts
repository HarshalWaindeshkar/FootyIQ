export type Club = {
  id: number
  name: string
  aliases: string[] // accepted alternate spellings
  badge: string     // badge image URL
  country: string
  tier: 'easy' | 'medium' | 'hard'
}

export const clubs: Club[] = [
  // ── EASY (top, globally recognisable clubs) ──────────────────────────────
  {
    id: 1,
    name: 'Real Madrid',
    aliases: ['real madrid cf', 'madrid'],
    badge: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
    country: 'Spain',
    tier: 'easy',
  },
  {
    id: 2,
    name: 'FC Barcelona',
    aliases: ['barcelona', 'barca', 'barça', 'fc barcelona'],
    badge: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
    country: 'Spain',
    tier: 'easy',
  },
  {
    id: 3,
    name: 'Manchester United',
    aliases: ['man united', 'man utd', 'mufc', 'united'],
    badge: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg',
    country: 'England',
    tier: 'easy',
  },
  {
    id: 4,
    name: 'Manchester City',
    aliases: ['man city', 'mcfc', 'city'],
    badge: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
    country: 'England',
    tier: 'easy',
  },
  {
    id: 5,
    name: 'Liverpool',
    aliases: ['liverpool fc', 'lfc'],
    badge: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
    country: 'England',
    tier: 'easy',
  },
  {
    id: 6,
    name: 'Chelsea',
    aliases: ['chelsea fc', 'cfc', 'the blues'],
    badge: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg',
    country: 'England',
    tier: 'easy',
  },
  {
    id: 7,
    name: 'Arsenal',
    aliases: ['arsenal fc', 'afc', 'the gunners'],
    badge: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
    country: 'England',
    tier: 'easy',
  },
  {
    id: 8,
    name: 'Bayern Munich',
    aliases: ['fc bayern münchen', 'fc bayern munich', 'bayern', 'fcb'],
    badge: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/FC_Bayern_M%C3%BCnchen_logo_%282002%E2%80%932017%29.svg',
    country: 'Germany',
    tier: 'easy',
  },
  {
    id: 9,
    name: 'Juventus',
    aliases: ['juventus fc', 'juve'],
    badge: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Juventus_FC_2017_logo.svg',
    country: 'Italy',
    tier: 'easy',
  },
  {
    id: 10,
    name: 'Paris Saint-Germain',
    aliases: ['psg', 'paris saint germain', 'paris sg'],
    badge: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg',
    country: 'France',
    tier: 'easy',
  },

  // ── MEDIUM ────────────────────────────────────────────────────────────────
  {
    id: 11,
    name: 'Atletico Madrid',
    aliases: ['atlético madrid', 'atletico de madrid', 'atm', 'atletico'],
    badge: 'https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg',
    country: 'Spain',
    tier: 'medium',
  },
  {
    id: 12,
    name: 'Borussia Dortmund',
    aliases: ['bvb', 'dortmund', 'bvb 09'],
    badge: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg',
    country: 'Germany',
    tier: 'medium',
  },
  {
    id: 13,
    name: 'AC Milan',
    aliases: ['milan', 'acm'],
    badge: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg',
    country: 'Italy',
    tier: 'medium',
  },
  {
    id: 14,
    name: 'Inter Milan',
    aliases: ['inter', 'internazionale', 'fc internazionale'],
    badge: 'https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg',
    country: 'Italy',
    tier: 'medium',
  },
  {
    id: 15,
    name: 'Tottenham Hotspur',
    aliases: ['spurs', 'tottenham', 'thfc'],
    badge: 'https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg',
    country: 'England',
    tier: 'medium',
  },
  {
    id: 16,
    name: 'Ajax',
    aliases: ['afc ajax', 'ajax amsterdam'],
    badge: 'https://upload.wikimedia.org/wikipedia/en/7/79/Ajax_Amsterdam.svg',
    country: 'Netherlands',
    tier: 'medium',
  },
  {
    id: 17,
    name: 'Porto',
    aliases: ['fc porto'],
    badge: 'https://upload.wikimedia.org/wikipedia/en/f/f1/FC_Porto.svg',
    country: 'Portugal',
    tier: 'medium',
  },
  {
    id: 18,
    name: 'Benfica',
    aliases: ['sl benfica', 'sport lisboa e benfica'],
    badge: 'https://upload.wikimedia.org/wikipedia/en/a/a2/SL_Benfica_logo.svg',
    country: 'Portugal',
    tier: 'medium',
  },
  {
    id: 19,
    name: 'Napoli',
    aliases: ['ssc napoli'],
    badge: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/SSC_Napoli.svg',
    country: 'Italy',
    tier: 'medium',
  },
  {
    id: 20,
    name: 'AS Roma',
    aliases: ['roma', 'asr'],
    badge: 'https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma_logo_%282013%29.svg',
    country: 'Italy',
    tier: 'medium',
  },

  // ── HARD ─────────────────────────────────────────────────────────────────
  {
    id: 21,
    name: 'Bayer Leverkusen',
    aliases: ['leverkusen', 'bayer 04'],
    badge: 'https://upload.wikimedia.org/wikipedia/en/5/59/Bayer_04_Leverkusen_logo.svg',
    country: 'Germany',
    tier: 'hard',
  },
  {
    id: 22,
    name: 'RB Leipzig',
    aliases: ['rb leipzig', 'rasenballsport'],
    badge: 'https://upload.wikimedia.org/wikipedia/en/0/04/RB_Leipzig_2014_logo.svg',
    country: 'Germany',
    tier: 'hard',
  },
  {
    id: 23,
    name: 'Feyenoord',
    aliases: ['feyenoord rotterdam'],
    badge: 'https://upload.wikimedia.org/wikipedia/en/f/f1/Feyenoord_logo.svg',
    country: 'Netherlands',
    tier: 'hard',
  },
  {
    id: 24,
    name: 'Sevilla',
    aliases: ['sevilla fc'],
    badge: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Sevilla_FC_logo.svg',
    country: 'Spain',
    tier: 'hard',
  },
  {
    id: 25,
    name: 'Lazio',
    aliases: ['ss lazio'],
    badge: 'https://upload.wikimedia.org/wikipedia/en/7/72/SS_Lazio_Badge.svg',
    country: 'Italy',
    tier: 'hard',
  },
]

export type Difficulty = 'easy' | 'medium' | 'hard'

export const DIFFICULTY_CONFIG: Record<Difficulty, { blur: number; label: string; pointsBase: number; color: string }> = {
  easy:   { blur: 4,  label: 'EASY',   pointsBase: 5,  color: '#00ff88' },
  medium: { blur: 12, label: 'MEDIUM', pointsBase: 10, color: '#ffaa00' },
  hard:   { blur: 24, label: 'HARD',   pointsBase: 20, color: '#ff3355' },
}

export function getClubsByDifficulty(diff: Difficulty): Club[] {
  return clubs.filter((c) => c.tier === diff)
}

export function shuffleClubs(arr: Club[]): Club[] {
  return [...arr].sort(() => Math.random() - 0.5)
}
