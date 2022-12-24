import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { IItem } from '../../models/Items/IItem'
import { IItemCard } from '../../models/Items/IItemCard'
import PokemonService from '../../services/pokemon.api'

const Wrapper = styled.section`
  background-color: rgb(231, 231, 231);
  position: relative;
  margin-right: 15px;
  margin-bottom: 15px;
  border-radius: 10%;
  width: 241px;
  height: 200px;
`

const Item = styled.li`
  input {
    min-width: 130px;
    max-width: 130px;
    min-height: 130px;
    max-height: 130px;
  }

  h3 {
    font-weight: normal;
    text-align: center;
  }
`

export const ItemItem = ({ item }: { item: IItem }) => {
  const navigate = useNavigate()
  const [itemCard, setItemCard] = useState<IItemCard>()

  useEffect(() => {
    PokemonService.getItemById(item.id).then((response) => {
      setItemCard(response)
    })
  }, [item.id])

  const onClick = (id: number) => {
    navigate(`/item/details/${id}`, {
      state: {
        id: id,
      },
    })
  }

  return (
    <Wrapper>
      <Item>
        <h3>{item.name}</h3>
        <input
          type="image"
          src={itemCard?.sprites.default}
          alt="item image"
          onClick={() => onClick(item.id)}
        />
      </Item>
    </Wrapper>
  )
}
