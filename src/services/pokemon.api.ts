import axios from 'axios'
import { IPaginacao, ISearchData } from '../models/IPaginacao'
import { IPokemonSpecie } from '../models/Pokemons/IPokemonSpecie'
import { IItem } from '../models/Items/IItem'
import { IItemCard } from '../models/Items/IItemCard'
import { ITypeDescription } from '../models/Pokemons/ITypeDescription'
import { IPokemon } from '../models/Pokemons/IPokemon'
import { IPokemonCard } from '../models/Pokemons/IPokemonCard'
import { IPokemonDescription } from '../models/Pokemons/IPokemonDescription'
import {
  EvolvesTo,
  IEvoltuion,
  IEvolutionCard,
} from '../models/Pokemons/IEvolution'

const http = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URI })

class PokemonService {
  getAllPokemonNames(): Promise<ISearchData[]> {
    console.log('URI', process.env.REACT_APP_API_BASE_URI)
    return http
      .get<IPaginacao<IPokemon>>('/pokemon', {
        params: { offset: 0, limit: process.env.REACT_APP_LIMIT_ALL_NAMES },
      })
      .then((response) => {
        return response.data.results.map((item) => {
          return {
            id: Number(item.url.split('/').reverse()[1]),
            title: (item.name =
              item.name.charAt(0).toUpperCase() + item.name.slice(1)),
          }
        })
      })
  }

  getAllPokemons(offset: number): Promise<IPaginacao<IPokemon>> {
    return http
      .get<IPaginacao<IPokemon>>('/pokemon', {
        params: { offset: offset, limit: process.env.REACT_APP_LIMIT_POKEMON },
      })
      .then((response) => {
        const result: IPaginacao<IPokemon> = {
          count: response.data.count,
          next: response.data.next,
          previous: response.data.previous,
          nextPage: response.data.next
            ? offset + Number(process.env.REACT_APP_LIMIT_POKEMON)
            : 0,
          previousPage: response.data.previous
            ? offset - Number(process.env.REACT_APP_LIMIT_POKEMON)
            : 0,
          results: response.data.results.map((item) => {
            return {
              id: Number(item.url.split('/').reverse()[1]),
              name: (item.name =
                item.name.charAt(0).toUpperCase() + item.name.slice(1)),
              url: item.url,
            }
          }),
        }

        return result
      })
  }

  getPokemonByName(name: string): Promise<IPokemon> {
    return http
      .get<IPokemonCard>(`/pokemon/${name.toLocaleLowerCase()}`)
      .then((response) => {
        const result: IPokemon = {
          id: response.data?.id,
          name:
            response.data?.name.charAt(0).toUpperCase() +
            response.data?.name.slice(1),
          url: `https://pokeapi.co/api/v2/pokemon/${response.data?.id}`,
        }
        return result
      })
  }

  getPokemonById(id: number): Promise<IPokemonCard> {
    return http.get<IPokemonCard>(`/pokemon/${id}`).then((response) => {
      const result: IPokemonCard = {
        id: response.data?.id,
        name: response.data?.name,
        order: response.data?.order,
        sprites: response.data?.sprites,
        types: response.data?.types.map((item) => {
          return {
            slot: item.slot,
            type: {
              name:
                item.type.name.charAt(0).toUpperCase() +
                item.type.name.slice(1),
              url: item.type.url,
            },
          }
        }),
      }
      return result
    })
  }

  getPokemonDescriptionById(id: number): Promise<IPokemonDescription> {
    return http.get<IPokemonDescription>(`/pokemon/${id}`).then((response) => {
      const result: IPokemonDescription = {
        abilities: response.data.abilities,
        base_experience: response.data.base_experience,
        forms: response.data.forms,
        height: response.data.height / 10,
        held_items: response.data.held_items,
        id: response.data.id,
        is_default: response.data.is_default,
        location_area_encounters: response.data.location_area_encounters,
        moves: response.data.moves,
        name:
          response.data.name.charAt(0).toUpperCase() +
          response.data.name.slice(1),
        order: response.data.order,
        past_types: response.data.past_types,
        species: {
          name: response.data.species.name,
          url: response.data.species.url,
          id: Number(response.data.species.url.split('/').reverse()[1]),
        },
        sprites: response.data.sprites,
        stats: response.data.stats,
        types: response.data?.types.map((item) => {
          return {
            slot: item.slot,
            type: {
              name:
                item.type.name.charAt(0).toUpperCase() +
                item.type.name.slice(1),
              url: item.type.url,
            },
          }
        }),
        weight: response.data.weight / 10,
      }
      return result
    })
  }

  getAllItemNames(): Promise<ISearchData[]> {
    return http
      .get<IPaginacao<IItem>>('/item', {
        params: { offset: 0, limit: process.env.REACT_APP_LIMIT_ALL_NAMES },
      })
      .then((response) => {
        return response.data.results.map((item) => {
          return {
            id: Number(item.url.split('/').reverse()[1]),
            title: (item.name =
              item.name.charAt(0).toUpperCase() + item.name.slice(1)),
          }
        })
      })
  }

  getAllItems(offset: number): Promise<IPaginacao<IItem>> {
    return http
      .get<IPaginacao<IItem>>('/item', {
        params: { offset: offset, limit: process.env.REACT_APP_LIMIT_ITEM },
      })
      .then((response) => {
        const result: IPaginacao<IItem> = {
          count: response.data.count,
          next: response.data.next,
          previous: response.data.previous,
          nextPage: response.data.next
            ? offset + Number(process.env.REACT_APP_LIMIT_ITEM)
            : 0,
          previousPage: response.data.previous
            ? offset - Number(process.env.REACT_APP_LIMIT_ITEM)
            : 0,
          results: response.data.results.map((item) => {
            return {
              id: Number(item.url.split('/').reverse()[1]),
              name: (item.name =
                item.name.charAt(0).toUpperCase() + item.name.slice(1)),
              url: item.url,
            }
          }),
        }

        return result
      })
  }

  getItemById(id: number): Promise<IItemCard> {
    return http.get<IItemCard>(`/item/${id}`).then((response) => {
      const result: IItemCard = {
        id: response.data.id,
        category: response.data.category,
        cost: response.data.cost,
        effect_entries: response.data.effect_entries,
        flavor_text_entries: response.data.flavor_text_entries,
        name:
          response.data.name.charAt(0).toUpperCase() +
          response.data.name.slice(1),
        sprites: response.data.sprites,
        attributes: response.data.attributes,
        baby_trigger_for: response.data.baby_trigger_for,
        fling_effect: response.data.fling_effect,
        fling_power: response.data.fling_power,
        game_indices: response.data.game_indices,
        held_by_pokemon: response.data.held_by_pokemon,
        machines: response.data.machines,
        names: response.data.names,
      }

      return result
    })
  }

  getItemByName(name: string): Promise<IItem> {
    return http
      .get<IItemCard>(`/item/${name.toLocaleLowerCase()}`)
      .then((response) => {
        const result: IItem = {
          id: response.data?.id,
          name: response.data?.name,
          url: `https://pokeapi.co/api/v2/pokemon/${response.data?.id}`,
        }
        return result
      })
  }

  getSpecieById(id: number): Promise<IPokemonSpecie> {
    return http
      .get<IPokemonSpecie>(`/pokemon-species/${id}`)
      .then((response) => {
        const result: IPokemonSpecie = {
          base_happiness: response.data.base_happiness,
          capture_rate: response.data.capture_rate,
          color: response.data.color,
          egg_groups: response.data.egg_groups,
          evolution_chain: {
            url: response.data.evolution_chain.url,
            id: Number(
              response.data.evolution_chain.url.split('/').reverse()[1]
            ),
          },
          evolves_from_species: response.data.evolves_from_species,
          flavor_text_entries: response.data.flavor_text_entries,
          form_descriptions: response.data.form_descriptions,
          forms_switchable: response.data.forms_switchable,
          gender_rate: response.data.gender_rate,
          genera: response.data.genera,
          generation: response.data.generation,
          growth_rate: response.data.growth_rate,
          habitat: response.data.habitat,
          has_gender_differences: response.data.has_gender_differences,
          hatch_counter: response.data.hatch_counter,
          id: response.data.id,
          is_baby: response.data.is_baby,
          is_legendary: response.data.is_legendary,
          is_mythical: response.data.is_mythical,
          name: response.data.name,
          names: response.data.names,
          order: response.data.order,
          pal_park_encounters: response.data.pal_park_encounters,
          pokedex_numbers: response.data.pokedex_numbers,
          shape: response.data.shape,
          varieties: response.data.varieties,
        }

        return result
      })
  }

  getTypeDetails(name: string): Promise<ITypeDescription> {
    return http.get<ITypeDescription>(`/type/${name}`).then((response) => {
      const result: ITypeDescription = {
        id: response.data.id,
        damage_relations: {
          double_damage_from:
            response.data.damage_relations.double_damage_from.map((item) => ({
              name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
              url: item.url,
            })),
          double_damage_to: response.data.damage_relations.double_damage_to,
          half_damage_from: response.data.damage_relations.half_damage_from,
          half_damage_to: response.data.damage_relations.half_damage_to,
          no_damage_from: response.data.damage_relations.no_damage_from,
          no_damage_to: response.data.damage_relations.no_damage_to,
        },
      }

      return result
    })
  }

  getPokemonEvolutionChain(id: number): Promise<IEvolutionCard | undefined> {
    return http.get<IEvoltuion>(`/evolution-chain/${id}`).then((response) => {
      return setTree(response.data)
    })
  }
}

//Tree Functions
function setTree(chain: IEvoltuion | undefined): IEvolutionCard | undefined {
  if (chain) {
    var tree: IEvolutionCard = {
      name: chain.chain.species.name,
      id: Number(chain.chain.species.url.split('/').reverse()[1]),
      default_image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${Number(
        chain.chain.species.url.split('/').reverse()[1]
      )}.png`,
    }
    createNodes(tree, chain?.chain.evolves_to ?? [])
    return tree
  }
}

function createNodes(
  atual: IEvolutionCard,
  atualChain: EvolvesTo[] | undefined
) {
  atual.evolvesTo = atualChain?.map((item) => ({
    name: item.species.name,
    id: Number(item.species.url.split('/').reverse()[1]),
    default_image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${Number(
      item.species.url.split('/').reverse()[1]
    )}.png`,
  }))

  if (!atual.evolvesTo) return

  if (atualChain)
    for (var i = 0; i < atualChain.length; i++) {
      createNodes(atual.evolvesTo[i], atualChain[i].evolves_to)
    }
}

export default new PokemonService()
