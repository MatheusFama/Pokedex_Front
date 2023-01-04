import styled from 'styled-components'
import { IEvolutionTreeLevel } from '../../models/Pokemons/IEvolution'
import { EvolutionTreeItems } from './EvoltionTreeItems'

const Tree = styled.ul<{displayMode:string}>`
  
  list-style: none;
  display: flex;
  flex-direction: ${({displayMode}) => displayMode === 'horizontal'? 'row' : 'column'};
  @media (max-width: 720px) {
    row-gap: 60px;
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
  displayMode
}: {
  levels: IEvolutionTreeLevel[],
  displayMode: string
}) => {
  return (
    <Tree displayMode={displayMode}>
      {levels
        .filter((a) => a.items.length > 0)
        .map((item, index) => (
          <Item key={index}>
            <EvolutionTreeItems  displayMode={displayMode==='horizontal'? 'vertical' : 'horizontal'}
              items={item.items}
            />
          </Item>
        ))}
    </Tree>
  )
}
