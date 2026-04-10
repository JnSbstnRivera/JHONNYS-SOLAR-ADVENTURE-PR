
export enum GameState {
  INTRO = 'INTRO',
  CHARACTER_SELECT = 'CHARACTER_SELECT',
  PLAYING = 'PLAYING',
  GAMEOVER = 'GAMEOVER',
  WIN = 'WIN'
}

export interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Character {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  available: boolean;
  accentColor: string;
}

export const CITIES = [
  "San Juan (Metro)",
  "Mayagüez (Oeste)",
  "Ponce (Sur)",
  "Arecibo (Norte)",
  "Fajardo (Este)",
  "Vieques (Isla)",
  "Culebra (Paraíso)"
];
