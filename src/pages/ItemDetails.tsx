import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { IItemCard } from '../models/Items/IItemCard'
import PokemonService from '../services/pokemon.api'
import BackgroundImage from '../assets/container_bg.png'

const Wrapper = styled.div`
  background: #fff;
  background-image: url(${BackgroundImage});
  height: 100%;
`
const Details = styled.div`
  display: flex;
  flex-wrap: unset;
  justify-content: space-evenly;
  margin-left: 20px;
`

const Title = styled.h1`
  text-align: center;
  margin-bottom: 40px;
`

const ItemImage = styled.section`
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  flex-basis: 100%;
  font: inherit;
  img {
    padding: 0;
    border: 0;
    min-height: 130px;
    min-width: 130px;
  }
`

const Text = styled.span`
  color: #737373;
`

const Attributes = styled.li`
  list-style: none;
`

const Image = styled.img`
  display: block;
  margin-right: auto;
  margin-left: auto;
`
const EffectsAttributes = styled.div`
  flex-basis: 100%;
`

export const ItemDetails = () => {
  const { id } = useParams()
  const [itemDescription, setItemDescription] = useState<IItemCard>()

  useEffect(() => {
    PokemonService.getItemById(Number(id ?? 0)).then((response) => {
      setItemDescription(response)
    })
  })

  return (
    <Wrapper>
      <Title>{itemDescription?.name}</Title>
      <Details>
        <ItemImage>
          <Image src={itemDescription?.sprites.default} alt="Item" />
          <h2>Description</h2>
          <Text>
            {
              itemDescription?.flavor_text_entries.find(
                (d) => d.language.name === 'en'
              )?.text
            }
          </Text>
        </ItemImage>
        <EffectsAttributes>
          <h2>Effects</h2>
          <Text>
            {
              itemDescription?.effect_entries.find(
                (d) => d.language.name === 'en'
              )?.effect
            }
          </Text>
          <h2>Attributes</h2>
          <Attributes>
            {itemDescription?.attributes.map((item, index) => (
              <ul key={index}>
                <Text key={index}>{item.name}</Text>
              </ul>
            ))}
          </Attributes>
        </EffectsAttributes>
      </Details>
    </Wrapper>
  )
}
