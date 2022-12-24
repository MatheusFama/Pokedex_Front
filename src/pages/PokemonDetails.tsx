import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { TypeItem } from '../components/PokemonList/TypeList/TypeItem'
import { IPokemonSpecie } from '../models/Pokemons/IPokemonSpecie'
import { ITypeDescription } from '../models/Pokemons/ITypeDescription'
import {
  IPokemonDescription,
  Status,
} from '../models/Pokemons/IPokemonDescription'
import PokemonService from '../services/pokemon.api'
import { useParams } from 'react-router-dom'
import BackgroundImage from '../assets/container_bg.png'
import {
  IEvolutionCard,
  IEvolutionTreeItems,
  IEvolutionTreeLevel,
} from '../models/Pokemons/IEvolution'
import { EvolutionLevel } from '../components/EvolutionLevels/EvolutionLevel'
import { StatusChart } from '../components/StatusChart/StatusChart'

const PokemonImage = styled.section`
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  img {
    margin: 0;
    padding: 0;
    border: 0;
  }
`

const Title = styled.h1`
  text-align: center;
  margin-bottom: 40px;
`
const Wrapper = styled.div`
  background: #fff;
  background-image: url(${BackgroundImage});
  height: 100%;
`
const Details = styled.div`
  display: flex;
  flex-wrap: unset;
  margin-left: 20%;
  margin-right: 20%;
  justify-content: space-evenly;
`
const Statistics = styled.div`
  border-radius: 3px;
  padding-right: 10%;
`
const Column = styled.th`
  color: white;
  font-weight: normal;
`
const Data = styled.td``

const Row = styled.tr``

const Description = styled.div``

const Table = styled.table`
  padding-top: 10px;
  background: #30a7d7;
  border-radius: 3px;
  text-align: center;
  width: 100%;
`

const TypeAndWeakTypeList = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: start;
  text-align: center;
  margin: auto;
`

const Abilities = styled.h6`
  font-weight: normal;
  margin: 0 0 5px 0;
`
const Evolutions = styled.div`
  color: white;
  background: #424242
    url(https://assets.pokemon.com/static2/_ui/img/chrome/body_bg.png);
  align-content: center;
`

const PokemonImageStatus = styled.div`
  padding-right: 20%;
`

export const PokemonDetails = () => {
  const { id } = useParams()
  const [pokemonDescription, setPokemonDescription] =
    useState<IPokemonDescription>()
  const [pokemonSpecie, setPokemonSpecie] = useState<IPokemonSpecie>()
  const [weakTypes, setWeakTypes] = useState<ITypeDescription[]>([])
  const [tree, setTree] = useState<IEvolutionCard[]>()
  const [treeLevels, setTreeLevels] = useState<IEvolutionTreeLevel[]>()
  const [stats, setStats] = useState<Status[]>([])

  function iniTreeLevels(card: IEvolutionCard) {
    const tree: IEvolutionTreeLevel[] = []

    createLevels(tree, [card], 1)

    var newTree: IEvolutionTreeLevel[] = []

    for (let pos = 0; pos < tree.length; pos++) {
      var lvl = tree.filter((l) => l.level === pos + 1)

      var items: IEvolutionTreeItems[] = []
      for (var j = 0; j < lvl.length; j++) {
        items = [...items, ...lvl[j].items]
      }

      newTree.push({ level: pos + 1, items: items })
    }

    setTreeLevels(
      newTree.sort((l) => l.level).filter((l) => l.items.length > 0)
    )
  }

  function createLevels(
    treeLevels: IEvolutionTreeLevel[],
    actualLevel: IEvolutionCard[] | undefined,
    level: number
  ) {
    if (actualLevel) {
      var items: IEvolutionTreeItems[] = actualLevel?.map((item) => ({
        id: item.id,
        default_image: item.default_image,
        name: item.name,
      }))

      treeLevels.push({ level: level, items: items })

      for (var i = 0; i < actualLevel.length; i++) {
        createLevels(treeLevels, actualLevel[i].evolvesTo, level + 1)
      }
    }
  }

  //Pokemon Description
  useEffect(() => {
    PokemonService.getPokemonDescriptionById(Number(id ?? 0)).then(
      (response) => {
        setStats(
          response.stats.map((s) => {
            const stat: Status = {
              name: s.stat.name,
              base_stat: s.base_stat / 10,
            }
            return stat
          })
        )

        setPokemonDescription(response)
      }
    )
  }, [id])

  //Weak Types
  useEffect(() => {
    const promisesWeakTypes = pokemonDescription?.types.map((desc) => {
      return PokemonService.getTypeDetails(
        desc.type.name.toLocaleLowerCase()
      ).then((type) => {
        return type
      })
    })
    if (promisesWeakTypes)
      Promise.all(promisesWeakTypes).then((weaktype) => {
        setWeakTypes(weaktype)
      })
  }, [pokemonDescription?.types])

  //Specie
  useEffect(() => {
    if (pokemonDescription?.species?.id)
      PokemonService.getSpecieById(pokemonDescription?.species?.id).then(
        (response) => {
          setPokemonSpecie(response)
        }
      )
  }, [pokemonDescription?.species?.id])

  //Evolution Chain
  useEffect(() => {
    if (pokemonSpecie?.evolution_chain)
      PokemonService.getPokemonEvolutionChain(
        pokemonSpecie?.evolution_chain.id
      ).then((response) => {
        if (response) setTree([response])
      })
  }, [pokemonSpecie?.evolution_chain])

  //Levels of the tree
  useEffect(() => {
    if (tree) iniTreeLevels(tree[0])
  }, [tree])

  return (
    <Wrapper>
      <Title>{pokemonDescription?.name}</Title>
      <Details>
        <PokemonImageStatus>
          <PokemonImage>
            <img
              src={
                pokemonDescription?.sprites.other['official-artwork']
                  .front_default
              }
              alt="Pokemon"
            />
          </PokemonImage>
          <StatusChart status={stats} />
        </PokemonImageStatus>
        <Description>
          <div>
            <h4>
              {pokemonSpecie?.flavor_text_entries
                .filter((flavor) => flavor.language.name === 'en')[0]
                .flavor_text.replace('\f', ' ')}
            </h4>
          </div>
          <Statistics>
            <Table>
              <tbody>
                <Row>
                  <Column>Height</Column>
                  <Column>Weight</Column>
                  <Column>Abilities</Column>
                </Row>
                <Row>
                  <Data>{pokemonDescription?.height} m</Data>
                  <Data>{pokemonDescription?.weight} kg</Data>
                  <Data>
                    {pokemonDescription?.abilities.map((item, index) => (
                      <Abilities key={index}>{item.ability.name}</Abilities>
                    ))}
                  </Data>
                </Row>
              </tbody>
            </Table>
          </Statistics>
          <h2>Types</h2>
          <TypeAndWeakTypeList>
            {pokemonDescription?.types.map((item, index) => (
              <TypeItem key={index + item.type.name + 'type'} type={item} />
            ))}
          </TypeAndWeakTypeList>
          <h2>Weak Against</h2>
          {weakTypes?.map((item, index) => (
            <TypeAndWeakTypeList key={index}>
              {item?.damage_relations.double_damage_from.map((type) => (
                <TypeItem
                  key={index + type.name + 'damage_relations'}
                  type={{ slot: 0, type: type }}
                />
              ))}
            </TypeAndWeakTypeList>
          ))}
        </Description>
      </Details>
      <Evolutions>
        <h2>Evoluções</h2>
        <EvolutionLevel levels={treeLevels ?? []} />
      </Evolutions>
    </Wrapper>
  )
}
