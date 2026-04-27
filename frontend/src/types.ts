export interface Trophy {
  game: string;
  tournament: string;
}

export interface Player {
  id: string;
  nickname: string;
  level: number;
  trophies?: Trophy[];
}
