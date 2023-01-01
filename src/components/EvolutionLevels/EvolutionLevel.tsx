import styled from 'styled-components'
import { IEvolutionTreeLevel } from '../../models/Pokemons/IEvolution'
import { EvolutionTreeItems } from './EvoltionTreeItems'

const Tree = styled.ul`
  list-style: none;
  display: flex;
  @media (max-width: 720px) {
    display: grid;
  }
`
const Item = styled.li`
  margin: 0 auto;
  display: flex;
  align-items: center;
  position: relative;

`

export const EvolutionLevel = ({
  levels,
}: {
  levels: IEvolutionTreeLevel[]
}) => {
  return (
    <Tree>
      {levels
        .filter((a) => a.items.length > 0)
        .map((item, index) => (
          <Item key={index}>
            <EvolutionTreeItems
              items={item.items}
              isLastLevel={item.level === 1}
            />
          </Item>
        ))}
    </Tree>
  )
}
