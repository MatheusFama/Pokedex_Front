import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { IItemCard } from '../models/Items/IItemCard'
import PokemonService from '../services/pokemon.api'
import BackgroundImage from '../assets/container_bg.png'
import { Subtitle, Title } from '../GlobalStyles'

const Wrapper = styled.div`
  background: #fff;
  background-image: url(${BackgroundImage});
  height: 100%;
  width: 100%;
`

const TitleWrapper = styled.div`
  text-align: center;
  padding: 40px;
`

const Details = styled.div`
  display: flex;
  justify-content: space-evenly;
  column-gap: 30px;

  @media (max-width:720px) {
    flex-direction: column;
  }
`


const ItemImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  width: 100%;
  img {
    padding: 0;
    border: 0;
    min-height: 130px;
    min-width: 130px;
  }
  @media (max-width:720px) {
    align-items: flex-start;
  }

`

const Text = styled.section`
  color: #737373;
  max-width: 500px;
`

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 10px 10px;
`

const Attributes = styled.ul`
 padding-left: 40px;
 li{
    margin: 5px;
 }
`

const Image = styled.img`
  display: block;
  margin-right: auto;
  margin-left: auto;
`
const EffectsAttributesWrapper = styled.div`
  width: 100%;

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
      <TitleWrapper>
        <Title value={itemDescription?.name}/>
      </TitleWrapper>
      <Details>
        <ItemImage>
          <Image src={itemDescription?.sprites.default} alt="Item" />
          <DescriptionWrapper>
            <Subtitle value='Description'/>
            <Text>
              {
                itemDescription?.flavor_text_entries.find(
                  (d) => d.language.name === 'en'
                )?.text
              }
            </Text>
          </DescriptionWrapper>
        </ItemImage>
        <EffectsAttributesWrapper>
          <DescriptionWrapper>
            <Subtitle value='Effects'/>
            <Text>
              {
                itemDescription?.effect_entries.find(
                  (d) => d.language.name === 'en'
                )?.effect
              }
            </Text>
            <Subtitle value='Attributes'/>
            <Attributes>
              {itemDescription?.attributes.map((item, index) => (
                <li key={index}>
                  <Text key={index}>{item.name}</Text>
                </li>
              ))}
            </Attributes>
          </DescriptionWrapper>
        </EffectsAttributesWrapper>
      </Details>
    </Wrapper>
  )
}
