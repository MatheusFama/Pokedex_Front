import styled from 'styled-components'
import * as IoIcons from 'react-icons/io'
import BackgroundImage from '../assets/container_bg.png'
import { IItem } from '../models/Items/IItem'
import { useEffect, useRef, useState } from 'react'
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
const Sentinel = styled.div`
  min-height: 10px;
  background: transparent;
`

const LIMIT_ITEM_NUMBER = Number(process.env.REACT_APP_LIMIT_ITEM)

export const Items = () => {
  const [items, setItems] = useState<IItem[]>([])
  const [actualPage, setActualPage] = useState<number>(-LIMIT_ITEM_NUMBER)
  const [names, setNames] = useState<ISearchData[]>([])
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)
  const [enableInfiniteScroll, setEnableInfiniteScroll] =
    useState<boolean>(true)
  const sentinel = useRef<HTMLDivElement | null>(null)


  const setItem = (page: number) => {

    if (actualPage < 0) return

    PokemonService.getAllItems(page)
      .then((response) => {
        setItems((previousItems) => [...previousItems,...response.results])
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


  //Observer
  useEffect(() => {
    const intersectObserver = new IntersectionObserver((elements) => {
      if (elements[0].isIntersecting && hasNextPage && enableInfiniteScroll) {
        setActualPage((previousPage) => previousPage + LIMIT_ITEM_NUMBER)
      }
    })

    if (sentinel?.current) intersectObserver.observe(sentinel?.current)

    return () => intersectObserver.disconnect()
  }, [hasNextPage, enableInfiniteScroll])


  const handleSearchSubmit = (searchValue: string) => {
    if (searchValue === '') {
      setItems([])
      setItem(0)
      setEnableInfiniteScroll(true)
    } else {
      setEnableInfiniteScroll(false)
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
        <ItemList>
          {items.map((item) => (
            <ItemItem key={item.id} item={item} />
          ))}
        </ItemList>
        <Sentinel ref={sentinel} />
      </IconContext.Provider>
    </Wrapper>
  )
}
