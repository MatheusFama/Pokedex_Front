import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { IEvolutionTreeItems } from '../../models/Pokemons/IEvolution'

const LisItem = styled.ul`
  list-style: none;
`
const Item = styled.li`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`
const Card = styled.a<{ isFirstLevel: Boolean }>`
  text-decoration: none;
  position: relative;
  img {
    min-width: 130px;
    box-shadow: 0 4px 4px 0px #212121;
    background-color: #616161;
    border: 5px solid #fff;
    border-radius: 50%;
    display: block;
    margin: 0 auto;
    max-width: 150px;
    width: 100%;
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
            <img src={item.default_image} alt="pokemon" />
            <h3>{item.name}</h3>
          </Card>
        </Item>
      ))}
    </LisItem>
  ) : (
    <>
      <Card isFirstLevel={isLastLevel} href={`/pokemon/details/${items[0].id}`}>
        <img src={items[0].default_image} alt="pokemon" />
        <h3>{items[0].name}</h3>
      </Card>
    </>
  )
}
