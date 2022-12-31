import styled from 'styled-components'
import * as IoIcons from 'react-icons/io'
import BackgroundImage from '../assets/container_bg.png'
import { IItem } from '../models/Items/IItem'
import { useEffect, useState } from 'react'
import PokemonService from '../services/pokemon.api'
import { IconContext } from 'react-icons'
import { ItemList } from '../components/ItemList/ItemList'
import { ItemItem } from '../components/ItemList/ItemItem'
import ItemsTitle from '../assets/itemsTitle.png'
import { SearchBar } from '../components/SearchBar/SearchBar'
import { ISearchData } from '../models/IPaginacao'

const Wrapper = styled.div`
  text-align: center;
  display: block;
  flex-wrap: wrap;
  background: #fff;
  background-image: url(${BackgroundImage});
  padding: 40px;
`

const ButtonFoward = styled(IoIcons.IoIosArrowForward)`
  float: right;
  position: absolute;
  left: 98%;
  top: 50%;
  height: 100%;
  border: none;
  background: none;
  cursor: pointer;
  margin-right: 10px;
  transform: scale(2);
  :hover {
    transform: scale(3.5);
  }
`

const ButtonBackFoward = styled(IoIcons.IoIosArrowBack)`
  float: right;
  position: absolute;
  left: 0%;
  top: 50%;
  height: 100%;
  border: none;
  background: none;
  cursor: pointer;
  margin-right: 10px;
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
  min-width: 300px;
  max-width: 30%;
  margin-left: auto;
  margin-right: auto;
`

export const Items = () => {
  const [items, setItems] = useState<IItem[]>([])
  const [previosPage, setPreviosPage] = useState<number>(0)
  const [actualPage, setActualPage] = useState<number>(0)
  const [nextPage, setNextPage] = useState<number>(20)
  const [names, setNames] = useState<ISearchData[]>([])

  const setItem = (page: number) => {
    PokemonService.getAllItems(page)
      .then((response) => {
        setItems(response.results)
        setNextPage(response.nextPage)
        setPreviosPage(response.previousPage)
      })
      .catch((erro) => {
        console.log(erro)
      })
  }

  useEffect(() => {
    setItem(actualPage)
    PokemonService.getAllItemNames()
      .then((response) => setNames(response))
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
      setItem(0)
    } else {
      PokemonService.getItemByName(searchValue)
        .then((response) => {
          setItems([response])
        })
        .catch((erro) => {
          console.log(erro)
          setItems([])
        })
    }
  }

  return (
    <Wrapper>
      <IconContext.Provider value={{ color: 'black' }}>
        <TitleWrapper>
          <Title src={ItemsTitle} alt="Title" />
        </TitleWrapper>
        <WrapperBar>
          <SearchBar handleSearch={handleSearchSubmit} searchData={names} />
        </WrapperBar>
        <ButtonFoward onClick={next} />
        <ButtonBackFoward onClick={previous} />
        <ItemList>
          {items.map((item) => (
            <ItemItem key={item.id} item={item} />
          ))}
        </ItemList>
      </IconContext.Provider>
    </Wrapper>
  )
}
