import { Vector3 } from 'three';

export interface GameState {
  currentLevel: number;
  strokes: number;
  ballPosition: Vector3;
  isAiming: boolean;
  power: number;
}

export interface Level {
  id: number;
  name: string;
  par: number;
  startPosition: Vector3;
  holePosition: Vector3;
}