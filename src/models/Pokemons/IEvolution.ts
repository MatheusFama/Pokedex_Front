export interface Trigger {
  name: string
  url: string
}

export interface EvolutionDetail {
  gender?: any
  held_item?: any
  item?: any
  known_move?: any
  known_move_type?: any
  location?: any
  min_affection?: any
  min_beauty?: any
  min_happiness?: any
  min_level: number
  needs_overworld_rain: boolean
  party_species?: any
  party_type?: any
  relative_physical_stats?: any
  time_of_day: string
  trade_species?: any
  trigger: Trigger
  turn_upside_down: boolean
}

export interface Species {
  name: string
  url: string
}

export interface EvolvesTo {
  evolution_details?: EvolutionDetail[]
  evolves_to: EvolvesTo[]
  is_baby: boolean
  species: Species
}

export interface Chain {
  evolution_details?: EvolutionDetail[]
  evolves_to: EvolvesTo[]
  is_baby: boolean
  species: Species
}

export interface IEvoltuion {
  baby_trigger_item?: any
  chain: Chain
  id: number
}

export interface IEvolutionCard {
  id: number
  name: string
  default_image: string
  evolvesTo?: IEvolutionCard[]
}

export interface IEvolutionTreeLevel {
  items: IEvolutionTreeItems[]
  level: number
}

export interface IEvolutionTreeItems {
  id: number
  name: string
  default_image: string
}
