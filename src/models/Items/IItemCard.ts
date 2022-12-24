export interface IItemCard {
  category: Category
  cost: number
  effect_entries: EffectEntry[]
  flavor_text_entries: FlavorTextEntry[]
  id: number
  name: string
  sprites: Sprites
  attributes: Attribute[]
  baby_trigger_for?: any
  fling_effect?: string
  fling_power?: any
  game_indices: GameIndice[]
  held_by_pokemon: any[]
  machines: any[]
  names: Name[]
}

export interface Language {
  name: string
  url: string
}

export interface Name {
  language: Language
  name: string
}

export interface Generation {
  name: string
  url: string
}

export interface GameIndice {
  game_index: number
  generation: Generation
}

export interface Attribute {
  name: string
  url: string
}

export interface Category {
  name: string
  url: string
}

export interface EffectEntry {
  effect: string
  language: Language
  short_effect: string
}

export interface VersionGroup {
  name: string
  url: string
}

export interface FlavorTextEntry {
  language: Language
  text: string
  version_group: VersionGroup
}

export interface Sprites {
  default: string
}
