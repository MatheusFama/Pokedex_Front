import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { CardTitle } from '../../GlobalStyles'
import { IItem } from '../../models/Items/IItem'
import { IItemCard } from '../../models/Items/IItemCard'
import PokemonService from '../../services/pokemon.api'

const Wrapper = styled.section`
  background-color: rgb(231, 231, 231);
  border-radius: 10%;
  margin-right: 15px;
  margin-bottom: 15px;
  position: relative;
  width: 241px;
  height: 200px;
`

const Item = styled.li`
  input {
    max-width: 130px;
    max-height: 130px;
    min-width: 130px;
    min-height: 130px;
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
        <CardTitle value={item.name} />
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
