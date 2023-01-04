import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { CardTitle } from '../../GlobalStyles'
import { IEvolutionTreeItems } from '../../models/Pokemons/IEvolution'

const CardWrapper = styled.div``

const PokemonImage = styled.img`
  box-shadow: 0 4px 4px 0px #212121;
  background-color: #616161;
  border: 5px solid #fff;
  border-radius: 50%;
  display: block;
  margin: 0 auto;
  max-width: 150px;
  width: 100%;

  @media (max-width: 720px) {
    max-width: 100px;
    width: 100%;
  }
`

const LisItem = styled.ul<{displayMode:string}>`
  list-style: none;
  display: flex;
  flex-direction: ${({displayMode}) => displayMode ==='horizontal'? 'row' : 'column'};
  column-gap : 60px;
  row-gap: 60px;

`
const Item = styled.li`
  height: 100%;
  min-width: 130px;
  align-items: center;
`

// const cssListVertical = css<{isFirstLevel: Boolean }>`
//     ::before {
//       color: white;
//       content: '${({ isFirstLevel }) => (isFirstLevel ? '' : '>')}';
//       font-size: 150%;
//       position: absolute;
//       top: -50%;
//       left: 41%;
//       height: 20px;
//       width: 20px;
//     }
// `
// const cssListHorizontal = css<{isFirstLevel: Boolean }>`
//    row-gap: 50px;

//    ::before {
//     color: white;
//     content: '${({ isFirstLevel }) => (isFirstLevel ? '' : 'V')}';
//     font-size: 300%;
//     position: absolute;
//     top: 32%;
//     left: -150%;
//     height: 30px;
//   }
// `

const Card = styled.a`
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
`

export const EvolutionTreeItems = ({
  items,
  displayMode
}: {
  items: IEvolutionTreeItems[],
  displayMode:string
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
    <LisItem displayMode={displayMode}>
      {items.map((item, index) => (
        <Item key={item.id}>
          <Card
            key={index}
            onClick={() => onClick(item.id)}
          >
            <PokemonImage src={item.default_image} alt="pokemon" />
            <CardTitle value={item.name}/>
          </Card>
        </Item>
      ))}
    </LisItem>
  ) : (
    <CardWrapper>
      <Card onClick={() => onClick(items[0].id)}>
        <PokemonImage src={items[0].default_image} alt="pokemon" />
        <CardTitle value={items[0].name}/>
      </Card>
    </CardWrapper>
  )
}
