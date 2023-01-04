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
import {
  PokemonTableColumn,
  PokemonTableInfo,
} from '../components/PokemonTableInfo/PokemonTableInfo'
import { Subtitle, Title } from '../GlobalStyles'

const Wrapper = styled.div`
  background: #fff;
  background-image: url(${BackgroundImage});
  margin: 10px;
  width: 100%;
  @media (max-width: 720px) {
    max-width: 720px;
  }
`

const TitleWrapper = styled.div`
  text-align: center;
`

const Details = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 40px 0;
  @media (max-width: 720px) {
    flex-direction: column;
  }
`

const PokemonImage = styled.img`
  max-width: 350px;
`

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 720px) {
    text-align: center;
  } 
`

const StatusChartWrapper = styled.div`
  max-width: 400px;
`

const TableWrapper = styled.div`
  width: 450px;
  @media (max-width: 720px) {
    width: 340px;
  } 
`

const Description = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 100%;
`

const TypeAndWeakTypeList = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: start;
  text-align: center;

  @media (max-width: 720px) {
    flex-wrap: wrap;
  }
`

const Abilities = styled.h5`
  font-weight: normal;
  margin: 0 0 5px 0;
`

const Evolutions = styled.div`
  color: white;
  background: #424242
    url(https://assets.pokemon.com/static2/_ui/img/chrome/body_bg.png);
  align-content: center;
  width: 100%;
  @media (max-width: 720px) {
    min-width: 410px;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (max-width: 720px) {
    width: 420px;
  } 
`

const FlavorText = styled.section`  
word-wrap: break-word;      
max-width: 500px;
width: 100%;

`

const DisplayMode = (levels : IEvolutionTreeLevel[]) => {
  
  const treeLevelsLength = levels.length > 0 ? levels.map(l => l.items.length) : [1]
  const maxLevelLength = Math.max(...treeLevelsLength)

  //mobile
  if(window.screen.width <= 720)
    return maxLevelLength >= 3? 'horizontal' : 'vertical'
  else
    return maxLevelLength >= 3? 'vertical' : 'horizontal'

}

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

  //Pokemon table Info columns
  const Columns = (
    pokemonDescription: IPokemonDescription | undefined
  ): PokemonTableColumn[] => {
    const height: PokemonTableColumn = {
      title: 'Height',
      data: `${pokemonDescription?.height} m`,
    }

    const weight: PokemonTableColumn = {
      title: 'Weight',
      data: `${pokemonDescription?.weight} kg`,
    }

    const abilities: PokemonTableColumn = {
      title: 'Abilities',
      data: pokemonDescription?.abilities.map((item, index) => (
        <Abilities key={index}>{item.ability.name}</Abilities>
      )),
    }

    return [height, weight, abilities]
  }

  return (
    <>
    <Wrapper>
      <TitleWrapper>
        <Title value={pokemonDescription?.name} />
      </TitleWrapper>
      <Details>
        <Container>
          <ImageWrapper>
            <PokemonImage
              src={
                pokemonDescription?.sprites.other['official-artwork']
                  .front_default
              }
              alt="Pokemon"
            />
          </ImageWrapper>
          <StatusChartWrapper>
            <StatusChart status={stats} />
          </StatusChartWrapper>
        </Container>
        <Description>
          <Subtitle value="Description" />
          <FlavorText>
            {pokemonSpecie?.flavor_text_entries
              .filter((flavor) => flavor.language.name === 'en')[0]
              .flavor_text.replace('\f', ' ')}
          </FlavorText>
          <TableWrapper>
            <PokemonTableInfo columns={Columns(pokemonDescription)} />
          </TableWrapper>
          <div>
            <Subtitle value="Types" />
            <TypeAndWeakTypeList>
              {pokemonDescription?.types.map((item, index) => (
                <TypeItem key={index + item.type.name + 'type'} type={item} />
              ))}
            </TypeAndWeakTypeList>
            <Subtitle value="Weak Against" />
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
          </div>
        </Description>
      </Details>
      <Evolutions>
        <Subtitle value='Evolutions'/>
        <EvolutionLevel levels={treeLevels ?? []} displayMode={DisplayMode(treeLevels??[])}/>
      </Evolutions>
    </Wrapper>
    </>

  )
}
