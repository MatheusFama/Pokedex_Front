export interface IPokemonCard {
  id: number
  name: string
  order: number
  sprites: ISprites
  types: IType[]
}

export interface IType {
  slot: number
  type: ITypeDetails
}

interface ITypeDetails {
  name: string
  url: string
}
export interface OfficialArtwork {
  front_default: string
}

export interface Other {
  'official-artwork': OfficialArtwork
}

interface ISprites {
  front_default: string
  other: Other
}
