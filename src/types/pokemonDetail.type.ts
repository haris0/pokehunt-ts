export interface StatClass {
  name: string;
}
export interface MoveElement {
  move: StatClass;
}

export interface Sprites {
  back_default: string;
  front_default: string;
}

export interface Stat {
  stat: StatClass;
  effort: number;
  base_stat: number;
}

export interface Type {
  type: StatClass;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: Sprites;
  moves: MoveElement[];
  types: Type[];
  stats: Stat[];
}

export interface Data {
  pokemon: Pokemon;
}

export interface IPokemonDetRes {
  data: Data;
}
