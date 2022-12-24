export interface AbilityInfo {
  name: string
  url: string
}

export interface Ability {
  ability: AbilityInfo
  is_hidden: boolean
  slot: number
}

export interface Form {
  name: string
  url: string
}

export interface MoveInfo {
  name: string
  url: string
}

export interface VersionGroup {
  name: string
  url: string
}

export interface Move {
  move: MoveInfo
}

export interface Species {
  name: string
  url: string
  id: number
}

export interface OfficialArtwork {
  front_default: string
}

export interface Other {
  'official-artwork': OfficialArtwork
}

export interface Animated {
  back_default: string
  back_female?: any
  back_shiny: string
  back_shiny_female?: any
  front_default: string
  front_female?: any
  front_shiny: string
  front_shiny_female?: any
}

export interface OmegarubyAlphasapphire {
  front_default: string
  front_female?: any
  front_shiny: string
  front_shiny_female?: any
}

export interface XY {
  front_default: string
  front_female?: any
  front_shiny: string
  front_shiny_female?: any
}

export interface Icons {
  front_default: string
  front_female?: any
}

export interface Icons2 {
  front_default: string
  front_female?: any
}

export interface GenerationViii {
  icons: Icons2
}

export interface Sprites {
  back_default: string
  back_female?: any
  back_shiny: string
  back_shiny_female?: any
  front_default: string
  front_female?: any
  front_shiny: string
  front_shiny_female?: any
  other: Other
}

export interface StatInfo {
  name: string
  url: string
}

export interface Stat {
  base_stat: number
  effort: number
  stat: StatInfo
}

export interface Status {
  base_stat: number
  name: string
}

export interface TypeInfo {
  name: string
  url: string
}

export interface Type {
  slot: number
  type: TypeInfo
}

export interface IPokemonDescription {
  abilities: Ability[]
  base_experience: number
  forms: Form[]
  height: number
  held_items: any[]
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: Move[]
  name: string
  order: number
  past_types: any[]
  species: Species
  sprites: Sprites
  stats: Stat[]
  types: Type[]
  weight: number
}
