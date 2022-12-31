import { useEffect, useState } from 'react'
import PokemonService from '../services/pokemon.api'
import { PokemonList } from '../components/PokemonList/PokemonList'
import { IPokemon } from '../models/Pokemons/IPokemon'
import { PokemonItem } from '../components/PokemonList/PokemonItem'
import styled from 'styled-components'
import { IconContext } from 'react-icons/lib'
import * as IoIcons from 'react-icons/io'
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
const ButtonFoward = styled(IoIcons.IoIosArrowForward)`
  border: none;
  background: none;
  cursor: pointer;
  transform: scale(2);
  :hover {
    transform: scale(3.5);
  }
`
const ButtonBackFoward = styled(IoIcons.IoIosArrowBack)`
  border: none;
  background: none;
  cursor: pointer;
  transform: scale(2);
  :hover {
    transform: scale(3.5);
  }
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
  min-width: 300px ;
  max-width: 30%;
  margin-left: auto;
  margin-right: auto;
`

const ListWrapper =styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
`

const ButtonWrapper =styled.div`
  position: relative;
  height: 100%;
`

export const Pokedex = () => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([])
  const [previosPage, setPreviosPage] = useState<number>(0)
  const [actualPage, setActualPage] = useState<number>(0)
  const [nextPage, setNextPage] = useState<number>(20)
  const [names, setNames] = useState<ISearchData[]>([])

  const setPokemon = (page: number) => {
    PokemonService.getAllPokemons(page)
      .then((response) => {
        setPokemons(response.results)
        setNextPage(response.nextPage)
        setPreviosPage(response.previousPage)
      })
      .catch((erro) => {
        console.log(erro)
      })
  }

  useEffect(() => {
    setPokemon(actualPage)
    PokemonService.getAllPokemonNames()
      .then((response) => {
        setNames(response)
      })
      .catch((error) => console.log(error))
  }, [actualPage])

  const next = () => {
    const next = nextPage
    setActualPage(next)
  }

  const previous = () => {
    const previous = previosPage
    setActualPage(previous)
  }

  const handleSearchSubmit = (searchValue: string) => {
    if (searchValue === '') {
      setPokemon(0)
    } else {
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
          <ButtonWrapper>
            <ButtonBackFoward onClick={previous} />
          </ButtonWrapper>
          <PokemonList>
            {pokemons.map((item) => (
              <PokemonItem key={item.id} pokemon={item} />
            ))}
          </PokemonList>
          <ButtonWrapper>
            <ButtonFoward onClick={next} />
          </ButtonWrapper>
        </ListWrapper>
      </IconContext.Provider>
    </Wrapper>
  )
}
