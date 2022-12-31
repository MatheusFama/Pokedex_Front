import { useEffect, useRef, useState } from 'react'
import PokemonService from '../services/pokemon.api'
import { PokemonList } from '../components/PokemonList/PokemonList'
import { IPokemon } from '../models/Pokemons/IPokemon'
import { PokemonItem } from '../components/PokemonList/PokemonItem'
import styled from 'styled-components'
import { IconContext } from 'react-icons/lib'
import BackgroundImage from '../assets/container_bg.png'
import PokemonTitle from '../assets/pokemonListTitle.png'
import { SearchBar } from '../components/SearchBar/SearchBar'
import { ISearchData } from '../models/IPaginacao'

const Wrapper = styled.div`
  text-align: center;
  display: block;
  flex-wrap: wrap;
  background: #fff;
  background-image: url(${BackgroundImage});
  padding: 40px 0;
`

const TitleWrapper = styled.div`
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;
`

const Title = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const WrapperBar = styled.div`
  justify-content: center;
  display: flex;
  margin: 40px 0;
  min-width: 300px;
  max-width: 30%;
  margin-left: auto;
  margin-right: auto;
`

const ListWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
`

const Sentinel = styled.div`
  min-height: 10px;
  background: transparent;
`

const LIMIT_POKEMON_NUMBER = Number(process.env.REACT_APP_LIMIT_POKEMON)

export const Pokedex = () => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([])
  const [actualPage, setActualPage] = useState<number>(-LIMIT_POKEMON_NUMBER)
  const [names, setNames] = useState<ISearchData[]>([])
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)
  const [enableInfiniteScroll, setEnableInfiniteScroll] =
    useState<boolean>(true)
  const sentinel = useRef<HTMLDivElement | null>(null)

  //Set Pokemons
  useEffect(() => {
    setPokemon(actualPage)
  }, [actualPage])

  //Observer
  useEffect(() => {
    const intersectObserver = new IntersectionObserver((elements) => {
      if (elements[0].isIntersecting && hasNextPage && enableInfiniteScroll) {
        setActualPage((previousPage) => previousPage + LIMIT_POKEMON_NUMBER)
      }
    })

    if (sentinel?.current) intersectObserver.observe(sentinel?.current)

    return () => intersectObserver.disconnect()
  }, [hasNextPage, enableInfiniteScroll])

  const setPokemon = (page: number) => {
    if (actualPage < 0) return

    PokemonService.getAllPokemons(page)
      .then((response) => {
        setPokemons((previousPokemons) => [
          ...previousPokemons,
          ...response.results,
        ])
        setHasNextPage(response.nextPage ? true : false)
      })
      .catch((erro) => {
        console.log(erro)
      })
  }

  //SearchBox Data
  useEffect(() => {
    PokemonService.getAllPokemonNames()
      .then((response) => {
        setNames(response)
      })
      .catch((error) => console.log(error))
  }, [])

  const handleSearchSubmit = (searchValue: string) => {
    if (searchValue === '') {
      setPokemons([])
      setPokemon(0)
      setEnableInfiniteScroll(true)
    } else {
      setEnableInfiniteScroll(false)
      PokemonService.getPokemonByName(searchValue)
        .then((response) => {
          setPokemons([response])
        })
        .catch((erro) => {
          console.log(erro)
          setPokemons([])
        })
    }
  }

  return (
    <Wrapper>
      <IconContext.Provider value={{ color: 'black' }}>
        <TitleWrapper>
          <Title src={PokemonTitle} alt="Title" />
        </TitleWrapper>
        <WrapperBar>
          <SearchBar handleSearch={handleSearchSubmit} searchData={names} />
        </WrapperBar>
        <ListWrapper>
          <PokemonList>
            {pokemons.map((item) => (
              <PokemonItem key={item.id} pokemon={item} />
            ))}
          </PokemonList>
        </ListWrapper>
        <Sentinel ref={sentinel} />
      </IconContext.Provider>
    </Wrapper>
  )
}
