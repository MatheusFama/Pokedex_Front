import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { IEvolutionTreeItems } from '../../models/Pokemons/IEvolution'

const CardWrapper = styled.div`

`


const PokemonImage = styled.img`
    box-shadow: 0 4px 4px 0px #212121;
    background-color: #616161;
    border: 5px solid #fff;
    border-radius: 50%;
    display: block;
    margin: 0 auto;
    max-width: 150px;
    width: 100%;

    @media (max-width: 720px){
      max-width: 100px;
      width: 100%;
    }
`

const LisItem = styled.ul`
  list-style: none;
  display: block;

  @media (max-width: 720px){
    display: flex;
    padding: 0;
    column-gap: 10px;
  }
  
`
const Item = styled.li`
  height: 100%;
  display: block;
  flex-direction: row;
  align-items: center;
  min-width: 130px;

`
const Card = styled.a<{ isFirstLevel: Boolean }>`
  text-decoration: none;
  position: relative;
  &:hover {
    cursor: pointer;
  }


  h3 {
    font-size: 125%;
    line-height: 125%;
    text-align: center;
    color: white;
  }
  ::before {
    color: white;
    content: '${({ isFirstLevel }) => (isFirstLevel ? '' : '>')}';
    font-size: 300%;
    position: absolute;
    top: 32%;
    left: -150%;
    height: 30px;
  }

  @media (max-width: 720px) {
      ::before {
      color: white;
      content: '';
      font-size: 300%;
      position: absolute;
      top: -150%;
      left: 32%;
      height: 20px;
      width:  20px;
    }

  }
`

export const EvolutionTreeItems = ({
  items,
  isLastLevel,
}: {
  items: IEvolutionTreeItems[]
  isLastLevel: Boolean
}) => {
  const navigate = useNavigate()

  const onClick = (id: number) => {
    navigate(`/pokemon/details/${id}`, {
      state: {
        id: id,
      },
    })
  }

  return items.length > 1 ? (
    <LisItem>
      {items.map((item, index) => (
        <Item key={item.id}>
          <Card
            isFirstLevel={isLastLevel}
            key={index}
            onClick={() => onClick(item.id)}
          >
            <PokemonImage src={item.default_image} alt="pokemon" />
            <h3>{item.name}</h3>
          </Card>
        </Item>
      ))}
    </LisItem>
  ) : (
    <CardWrapper>
      <Card isFirstLevel={isLastLevel} onClick={() => onClick(items[0].id)}>
        <PokemonImage src={items[0].default_image} alt="pokemon" />
        <h3>{items[0].name}</h3>
      </Card>
    </CardWrapper>
  )
}
